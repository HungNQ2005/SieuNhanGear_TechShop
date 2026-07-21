const jwt = require("../utils/jwt");
const { HttpError } = require("../errors/httpError");

function authenticate(req, res, next) {
  try {
    const header = req.headers.authorization || req.headers.Authorization || "";
    const parts = header.split(" ");
    if (parts.length !== 2) {
      throw new HttpError({
        code: "UNAUTHORIZED",
        statusCode: 401,
        message: "Missing or invalid Authorization header",
      });
    }

    const scheme = parts[0];
    const token = parts[1];

    if (!/^Bearer$/i.test(scheme) || !token) {
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

    req.user = { id: payload.id, email: payload.email, role: payload.role, _id: payload._id };
    next();
  } catch (e) {
    next(e);
  }
}

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
    const userRole = req.user.role;
    const isAllowed =
      !roles.length ||
      roles.some(
        (r) =>
          r === userRole ||
          (userRole === "admin" && r === "system_admin") ||
          (userRole === "system_admin" && r === "admin"),
      );
    if (!isAllowed) {
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

function optionalAuthenticate(req, res, next) {
  try {
    const header = req.headers.authorization || req.headers.Authorization || "";
    const parts = header.split(" ");
    if (parts.length === 2 && /^Bearer$/i.test(parts[0]) && parts[1]) {
      const payload = jwt.verify(parts[1]);
      if (payload) {
        req.user = { id: payload.id, email: payload.email, role: payload.role, _id: payload._id };
      }
    }
    next();
  } catch (e) {
    next();
  }
}

module.exports = {
  authenticate,
  optionalAuthenticate,
  authorize,
  authMiddleware: authenticate,
};
