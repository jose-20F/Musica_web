const express = require("express");
const sql = require("mssql");
const bcrypt = require("bcrypt");
const { poolPromise } = require('./server.cjs');

const router = express.Router();

const SECRET_KEY = "tu_clave_secreta"; // Debe ser igual que en server.cjs

// Login de administrador
router.post("/registro-admin", async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const pool = await poolPromise;
        await pool.request()
            .input("CorreoElectronico", sql.NVarChar(50), email)
            .input("Contrasena", sql.VarChar(100), hashedPassword)
            .query("INSERT INTO Administrador (CorreoElectronico, Contrasena) VALUES (@CorreoElectronico, @Contrasena)");
        res.json({ message: "Administrador registrado correctamente" });
    } catch (error) {
        console.error("Error en /api/admin/registro-admin:", error);
        res.status(500).json({ error: "Error al registrar el administrador", detalle: error.message });
    }
});

module.exports = router;