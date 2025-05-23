const express = require("express");
const sql = require("mssql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const SECRET_KEY = "tu_clave_secreta"; // Debe ser igual que en server.cjs

// Importa poolPromise desde server.cjs
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
const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => pool)
    .catch(err => {
        console.error("Error al conectar a la base de datos (adminAuth):", err);
    });

// Login de administrador
router.post("/registro-admin", async (req, res) => {
    try {
        const { email, password } = req.body;
        const hash = await bcrypt.hash(password, 10);
        const pool = await poolPromise;
        await pool.request()
            .input("CorreoElectronico", sql.NChar(50), email.trim())
            .input("Contraseña", sql.VarChar(100), hash)
            .query("INSERT INTO Administrador (CorreoElectronico, Contraseña) VALUES (@CorreoElectronico, @Contraseña)");
        res.json({ message: "Administrador registrado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al registrar administrador", detalle: error.message });
    }
});

module.exports = router;