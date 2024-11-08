const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo de 100 solicitudes por IP cada 15 minutos
  message:
    "Demasiadas solicitudes desde esta IP, por favor intente de nuevo después de 15 minutos",
});

module.exports = limiter;
