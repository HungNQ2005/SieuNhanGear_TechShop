const jwt = require("../utils/jwt");
const { HttpError } = require("../errors/httpError");

// authenticate: đọc "Authorization: Bearer <token>", verify JWT, gắn req.user = { id, email, role }
function authenticate(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const [scheme, token] = header.split(" ");

    if (scheme !== "Bearer" || !token) {
      throw new HttpError({
        code: "UNAUTHORIZED",
        statusCode: 401,
        message: "Missing or invalid Authorization header",
      });
    }

    const payload = jwt.verify(token);
    if (!payload) {
      throw new HttpError({
        code: "UNAUTHORIZED",
        statusCode: 401,
        message: "Invalid or expired token",
      });
    }

    req.user = { id: payload.id, email: payload.email, role: payload.role };
    next();
  } catch (e) {
    next(e);
  }
}

// authorize(...roles): phân quyền theo role, dùng SAU authenticate
// Ví dụ: router.post('/', authenticate, authorize('system_admin'), controller.create)
function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return next(
        new HttpError({
          code: "UNAUTHORIZED",
          statusCode: 401,
          message: "Authentication required",
        }),
      );
    }
    if (roles.length && !roles.includes(req.user.role)) {
      return next(
        new HttpError({
          code: "FORBIDDEN",
          statusCode: 403,
          message: "You do not have permission to perform this action",
        }),
      );
    }
    next();
  };
}

// optionalAuthenticate: kiểm tra token nếu có thì gắn req.user, nếu không có token thì vẫn tiếp tục
function optionalAuthenticate(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const [scheme, token] = header.split(" ");

    if (scheme === "Bearer" && token) {
      const payload = jwt.verify(token);
      if (payload) {
        req.user = { id: payload.id, email: payload.email, role: payload.role };
      }
    }
    next();
  } catch (e) {
    next();
  }
}

module.exports = { authenticate, optionalAuthenticate, authorize };
