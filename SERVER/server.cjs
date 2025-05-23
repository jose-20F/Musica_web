const express = require("express");
const sql = require("mssql");
const cors = require("cors");
const bodyParser = require("body-parser");
const transporter = require("./nodemailerConfig.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const adminAuth = require("./adminAuth.cjs");

const app = express();
const PORT = 3000;
const SECRET_KEY = "tu_clave_secreta"; // Usa una clave fuerte y guárdala en .env

// Middleware
app.use(cors({ origin: "*", methods: ["POST", "GET"], allowedHeaders: ["Content-Type", "Authorization"] }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/admin", adminAuth);


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

// Conexión a SQL Server
const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log("Conexión a la base de datos establecida");
        return pool;
    })
    .catch(err => {
        console.error("Error al conectar a la base de datos:", err);
    });

// Ruta para agregar usuarios (registro de contacto)
app.post("/api/usuarios", async (req, res) => {
    try {
        const { nombre, apellido, telefono, email, mensaje } = req.body;

        if (!nombre || !apellido || !email || !mensaje) {
            return res.status(400).json({ error: "Todos los campos obligatorios deben llenarse" });
        }

        const pool = await poolPromise;
        await pool.request()
            .input("Nombre", sql.VarChar(30), nombre.trim())
            .input("Apellido", sql.VarChar(30), apellido.trim())
            .input("Telefono", sql.VarChar(15), telefono ? telefono.trim() : null)
            .input("CorreoElectronico", sql.NChar(50), email.trim())
            .input("Mensaje", sql.VarChar(80), mensaje.trim())
            .query("INSERT INTO dbo.Usuario (Nombre, Apellido, Telefono, CorreoElectronico, Mensaje) VALUES (@Nombre, @Apellido, @Telefono, @CorreoElectronico, @Mensaje)");

        // Configurar el correo
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: "Nuevo registro de contacto",
            text: `Se ha registrado un nuevo usuario:
Nombre: ${nombre}
Apellido: ${apellido}
Teléfono: ${telefono || "No proporcionado"}
Email: ${email}
Mensaje: ${mensaje}`
        };

        // Enviar el correo
        await transporter.sendMail(mailOptions);

        res.json({ message: "Usuario agregado correctamente y correo enviado al manager" });
    } catch (error) {
        console.error("Error al insertar datos o enviar correo:", error);
        res.status(500).json({ error: "Error interno al agregar usuario o enviar correo", detalle: error.message });
    }
});

// Ruta de registro de usuario con contraseña segura
app.post("/api/registro", async (req, res) => {
    try {
        const { nombre, apellido, email, password, esAdmin } = req.body;
        if (!nombre || !apellido || !email || !password) {
            return res.status(400).json({ error: "Todos los campos obligatorios deben llenarse" });
        }
        const hash = await bcrypt.hash(password, 10);
        const pool = await poolPromise;
        await pool.request()
            .input("Nombre", sql.VarChar(30), nombre.trim())
            .input("Apellido", sql.VarChar(30), apellido.trim())
            .input("CorreoElectronico", sql.NChar(50), email.trim())
            .input("Contraseña", sql.VarChar(100), hash)
            .input("EsAdmin", sql.Bit, esAdmin ? 1 : 0)
            .query("INSERT INTO dbo.Usuario (Nombre, Apellido, CorreoElectronico, Contraseña, EsAdmin) VALUES (@Nombre, @Apellido, @CorreoElectronico, @Contraseña, @EsAdmin)");
        res.json({ message: "Usuario registrado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al registrar usuario", detalle: error.message });
    }
});

// Ruta de login segura
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email y contraseña son obligatorios" });
    }
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input("CorreoElectronico", sql.NChar(50), email.trim())
            .query("SELECT * FROM Usuario WHERE CorreoElectronico = @CorreoElectronico");
        const usuario = result.recordset[0];
        if (!usuario) {
            return res.status(401).json({ error: "Usuario no encontrado" });
        }
        const passwordValida = await bcrypt.compare(password, usuario.Contraseña.trim());
        if (!passwordValida) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }
        const rol = usuario.EsAdmin === 1 ? "admin" : "usuario";
        const token = jwt.sign({ id: usuario.Id, rol }, SECRET_KEY, { expiresIn: "2h" });
        res.json({ message: "Login exitoso", token, rol });
    } catch (error) {
        res.status(500).json({ error: "Error en el login", detalle: error.message });
    }
});

// Middleware para proteger rutas según rol
function autenticarRol(roles = []) {
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
}

// Ejemplo de ruta protegida solo para admin
// app.get("/api/solo-admin", autenticarRol(["admin"]), (req, res) => {
//     res.json({ message: "Acceso permitido solo para administradores" });
// });

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://127.0.0.1:${PORT}`);
});
