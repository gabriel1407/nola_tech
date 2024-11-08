const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (roles = []) => (req, res, next) => {
  // Asegura que roles sea un array (en caso de que se pase un solo rol como string)
  if (typeof roles === 'string') {
    roles = [roles];
  }

  const token = req.header("Authorization")?.replace("Bearer ", "");
  
  if (!token) {
    return res.status(401).json({ error: "Token de autorización no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Verifica si el rol del usuario está en el array de roles permitidos
    if (roles.length && !roles.includes(decoded.role)) {
      return res.status(403).json({ error: "Acceso denegado" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Autenticación fallida, token inválido o expirado" });
  }
};

module.exports = auth;
