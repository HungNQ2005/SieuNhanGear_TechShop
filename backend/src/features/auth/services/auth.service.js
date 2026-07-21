const { accountRepository } = require("../../../repositories/account.repository");
const { HttpError } = require("../../../errors/httpError");
const { hashPassword, verifyPassword } = require("../../../utils/password");
const jwt = require("../../../utils/jwt");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

function buildToken(account) {
  return jwt.sign({ id: account.id, email: account.email, role: account.role });
}

function toSafeAccount(account) {
  const plain = typeof account.toJSON === "function" ? account.toJSON() : account;
  delete plain.passwordHash;
  return plain;
}

const authService = {
  // UC-01 Register: chỉ tạo tài khoản Customer (role "user")
  async register({ name, email, password, phone, gender, dateOfBirth, address, avatarURL }) {
    const errors = [];
    if (!name || !String(name).trim()) errors.push("name is required");
    if (!email || !EMAIL_REGEX.test(String(email).trim())) errors.push("a valid email is required");
    if (!password || String(password).length < MIN_PASSWORD_LENGTH) {
      errors.push(`password must be at least ${MIN_PASSWORD_LENGTH} characters`);
    }
    if (errors.length) {
      throw new HttpError({ code: "BAD_REQUEST", statusCode: 400, message: "Invalid registration data", details: errors });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const existing = await accountRepository.getByEmail(normalizedEmail);
    if (existing) {
      throw new HttpError({ code: "CONFLICT", statusCode: 409, message: `Email "${normalizedEmail}" is already registered` });
    }

    const account = await accountRepository.create({
      name: String(name).trim(),
      email: normalizedEmail,
      phone: phone ? String(phone).trim() : "",
      gender: gender || undefined,
      dateOfBirth: dateOfBirth || undefined,
      address: address ? String(address).trim() : "",
      avatarURL: avatarURL ? String(avatarURL).trim() : "",
      role: "user",
      passwordHash: hashPassword(String(password)),
    });

    const safeAccount = toSafeAccount(account);
    return { account: safeAccount, token: buildToken(safeAccount) };
  },

  // UC-02 Login: dùng chung cho mọi role (Customer, Sale Staff, Manager Product, System Admin)
  async login({ email, password }) {
    if (!email || !password) {
      throw new HttpError({ code: "BAD_REQUEST", statusCode: 400, message: "email and password are required" });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    let account = await accountRepository.getByEmail(normalizedEmail, { withPassword: true });

    // Auto-seed default admin credentials if missing in database
    if (!account) {
      const defaultAdmins = [
        { name: "System Admin", email: "systemadmin@gmail.com", role: "system_admin", password: "123456" },
        { name: "Admin", email: "admin@gmail.com", role: "system_admin", password: "123456" },
        { name: "System Administrator", email: "admin@sieunhangear.vn", role: "system_admin", password: "123456" },
      ];
      const matched = defaultAdmins.find((a) => a.email === normalizedEmail);
      if (matched) {
        const passwordHash = hashPassword(matched.password);
        await accountRepository.create({
          name: matched.name,
          email: matched.email,
          role: matched.role,
          passwordHash,
        });
        account = await accountRepository.getByEmail(normalizedEmail, { withPassword: true });
      }
    }

    const targetHash = account ? (account.passwordHash || account.password) : null;
    if (!account || !verifyPassword(String(password), targetHash)) {
      throw new HttpError({ code: "UNAUTHORIZED", statusCode: 401, message: "Invalid email or password" });
    }

    const safeAccount = toSafeAccount(account);
    return { account: safeAccount, token: buildToken(safeAccount) };
  },

  // GET /api/auth/me
  async getMe(userId) {
    const account = await accountRepository.getById(userId);
    if (!account) {
      throw new HttpError({ code: "NOT_FOUND", statusCode: 404, message: "Account not found" });
    }
    return toSafeAccount(account);
  },

  // UC-03 Manage Profile (CRU) - user tự cập nhật thông tin của mình, không được đổi role
  async updateProfile(userId, { name, phone, password, gender, dateOfBirth, address, avatarURL }) {
    const errors = [];
    if (name !== undefined && !String(name).trim()) errors.push("name cannot be empty");
    if (password !== undefined && String(password).length < MIN_PASSWORD_LENGTH) {
      errors.push(`password must be at least ${MIN_PASSWORD_LENGTH} characters`);
    }
    if (errors.length) {
      throw new HttpError({ code: "BAD_REQUEST", statusCode: 400, message: "Invalid profile data", details: errors });
    }

    const payload = {};
    if (name !== undefined) payload.name = String(name).trim();
    if (phone !== undefined) payload.phone = String(phone).trim();
    if (gender !== undefined) payload.gender = gender;
    if (dateOfBirth !== undefined) payload.dateOfBirth = dateOfBirth;
    if (address !== undefined) payload.address = String(address).trim();
    if (avatarURL !== undefined) payload.avatarURL = String(avatarURL).trim();
    if (password) payload.passwordHash = hashPassword(String(password));

    const account = await accountRepository.update(userId, payload);
    if (!account) {
      throw new HttpError({ code: "NOT_FOUND", statusCode: 404, message: "Account not found" });
    }
    return toSafeAccount(account);
  },
};

module.exports = { authService };
