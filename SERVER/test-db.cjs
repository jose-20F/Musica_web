const sql = require("mssql");

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

async function testConnection() {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query("SELECT * FROM dbo.Usuario");
        console.log("✅ Conexión exitosa. Resultados:");
        console.table(result.recordset);
        pool.close();
    } catch (error) {
        console.error("❌ Error de conexión:", error);
    }
}

testConnection();
