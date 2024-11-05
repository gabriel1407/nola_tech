const jwt = require("jsonwebtoken");

// Middleware de autenticación
const authMiddleware = (req, res, next) => {
  // Obtener el token del encabezado de autorización
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "No autorizado. Token no proporcionado" });
  }

  // Extraer el token
  const token = authHeader.split(" ")[1];

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Guardar los datos decodificados (por ejemplo, userId y role) en la solicitud
    req.user = decoded;

    // Pasar al siguiente middleware o controlador
    next();
  } catch (error) {
    res.status(401).json({ message: "No autorizado. Token inválido" });
  }
};

// Middleware para verificar rol
const veryfyRole = (requiredRole) => {
  return (req, res, next) => {
      if (!req.user || req.user.role !== requiredRole) {
          return res.status(403).json({ message: "Access denied. Insufficient permissions." });
      }
      next();
  };
};

// Middleware para verificar múltiples roles
const verifyRoles = (allowedRoles) => {
  return (req, res, next) => {
      if (!req.user || !allowedRoles.includes(req.user.role)) {
          return res.status(403).json({ message: "Access denied. Insufficient permissions." });
      }
      next();
  };
};

module.exports = {authMiddleware, veryfyRole, verifyRoles};
