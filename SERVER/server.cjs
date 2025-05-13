const express = require("express");
const sql = require("mssql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors({ origin: "*", methods: ["POST", "GET"], allowedHeaders: ["Content-Type"] }));
app.use(bodyParser.json());

// Configuración de la base de datos SQL Server
const dbConfig = {
    user: "sa",
    password: "123",
    server: "JOSEFIGUERO", // o usa la IP del servidor si necesario
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
        console.log("✅ Conexión a la base de datos establecida");
        return pool;
    })
    .catch(err => {
        console.error("❌ Error al conectar a la base de datos:", err);
    });

// Ruta para agregar usuarios
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

        res.json({ message: "✅ Usuario agregado correctamente" });
    } catch (error) {
        console.error("❌ Error al insertar datos:", error);
        res.status(500).json({ error: "Error interno al agregar usuario", detalle: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://127.0.0.1:${PORT}`);
});
