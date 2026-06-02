const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {

  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }

  try {

    const verified = jwt.verify(
      token,
      "enterprise_secret_key"
    );

    req.user = verified;

    next();

  } catch {

    return res.status(401).json({
      message: "Invalid token"
    });

  }
}

module.exports = authMiddleware;
