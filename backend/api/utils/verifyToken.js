const jwt = require("jsonwebtoken");
const { createError } = require("./error");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(createError(401, "Unauthenticated"));

  jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, user) => {
    if (err) return next(createError(401, "token not valid"));
    req.user = user;
    next();
  });
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(401, "Unauthenticated"));
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(401, "Unauthenticated"));
    }
  });
};

module.exports = { verifyToken, verifyUser, verifyAdmin };
