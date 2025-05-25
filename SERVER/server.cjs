// server.cjs
const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const transporter = require('./nodemailerConfig.js'); // Si tienes nodemailer configurado

const app = express();
const PORT = 3000;
const SECRET_KEY = "tu_clave_secreta"; // Mejor poner en .env para mayor seguridad

// Configuración de la base de datos SQL Server
const dbConfig = {
  user: "sa",
  password: "123",
  server: "JOSEFIGUERO",
  database: "Musica",
  port: 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

// 1. Configura y define poolPromise
const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then(pool => {
    console.log('Conectado a la base de datos');
    return pool;
  })
  .catch(err => console.log('Error de conexión a la base de datos:', err));

// 2. Exporta poolPromise ANTES de requerir rutas
module.exports.poolPromise = poolPromise;

// Middlewares
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para proteger rutas por rol
const autenticarRol = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Token requerido" });
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      if (roles.length && !roles.includes(decoded.rol)) {
        return res.status(403).json({ error: "Acceso denegado" });
      }
      req.usuario = decoded;
      next();
    } catch {
      res.status(401).json({ error: "Token inválido" });
    }
  };
};

// 3. Rutas de administración de usuarios
const adminAuth = require('./adminAuth.cjs');
app.use('/api/admin', adminAuth);

// 4. Rutas para agenda de eventos (CRUD) - Importadas modularmente
const eventosRoutes = require('./eventosRoutes.cjs')(poolPromise, autenticarRol);
app.use('/api/eventos', eventosRoutes);

// 5. Ruta para recibir datos del formulario de contacto
app.post('/api/usuarios', async (req, res) => {
  try {
    console.log("Datos recibidos:", req.body); // <-- Log para ver los datos recibidos
    const { nombre, apellido, email, telefono, mensaje } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input('Nombre', sql.VarChar(30), nombre)
      .input('Apellido', sql.VarChar(30), apellido)
      .input('CorreoElectronico', sql.NVarChar(50), email)
      .input('Telefono', sql.VarChar(15), telefono)
      .input('Mensaje', sql.VarChar(80), mensaje)
      .query('INSERT INTO Usuario (Nombre, Apellido, CorreoElectronico, Telefono, Mensaje) VALUES (@Nombre, @Apellido, @CorreoElectronico, @Telefono, @Mensaje)');
    console.log("Insert en BD exitoso"); // <-- Log después de guardar en BD

    console.log("EMAIL_USER:", process.env.EMAIL_USER);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'Nuevo registro de contacto',
      text: `Nombre: ${nombre}\nApellido: ${apellido}\nEmail: ${email}\nTeléfono: ${telefono}\nMensaje: ${mensaje}`
    });
    console.log("Correo enviado"); // <-- Log después de enviar el correo

    res.json({ message: 'Formulario recibido correctamente' });
  } catch (error) {
    console.error("Error en /api/usuarios:", error); // <-- Log de error
    res.status(500).json({ error: 'Error al procesar el formulario', detalle: error.message });
  }
});

// Ruta para login del administrador
app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('CorreoElectronico', sql.NVarChar(50), email)
      .query('SELECT * FROM Administrador WHERE CorreoElectronico = @CorreoElectronico');
    
    const usuario = result.recordset[0];
    
    if (!usuario) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    const passwordMatch = await bcrypt.compare(password, usuario.Contrasena);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Generar token
    const token = jwt.sign(
      { id: usuario.Id, rol: 'admin' },
      SECRET_KEY,
      { expiresIn: '2h' }
    );

    res.json({ message: 'Login exitoso', token, rol: 'admin' });

  } catch (error) {
    console.error('Error en login', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://127.0.0.1:${PORT}`);
});

module.exports = { poolPromise };
