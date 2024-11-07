const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");


exports.register = async (req, res) => {
  try {
    // Desestructurar todos los campos requeridos de la solicitud
    const {
      username,
      password,
      role,
      position,
      departament,
      gender,
      age,
      first_name,
      last_name,
      phone,
      email,
    } = req.body;

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario con todos los campos requeridos
    const user = new User({
      username,
      password: hashedPassword,
      role,
      position,
      departament,
      gender,
      age,
      first_name,
      last_name,
      phone,
      email,
    });

    // Guardar el usuario en la base de datos
    await user.save();

    res.status(201).json({ message: "Usuario registrado exitosamente", user });
  } catch (error) {
    res.status(500).json({ message: "Error en el registro", error });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.log("Credenciales incorrectas");
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión", error });
  }
};
