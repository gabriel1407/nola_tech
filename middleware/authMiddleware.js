const jwt = require("jsonwebtoken");

// Middleware de autenticación
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "No autorizado. Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "No autorizado. Token inválido" });
  }
};

// Middleware para verificar un rol específico
const verifyRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
      return res
        .status(403)
        .json({ message: "Acceso denegado. Permisos insuficientes." });
    }
    next();
  };
};

// Middleware para verificar múltiples roles
const verifyRoles = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Acceso denegado. Permisos insuficientes." });
    }
    next();
  };
};

module.exports = { verifyToken, verifyRole, verifyRoles };
