import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/login.css";
import "../CSS/estilo.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje("");
    try {
      const res = await fetch("http://localhost:3000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.token && data.rol === "admin") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("rol", data.rol);
        navigate("/homeadmin");
      } else {
        setMensaje(data.error || "Credenciales incorrectas");
      }
    } catch (error) {
      setMensaje("Error de conexión");
    }
    setLoading(false);
  };

  return (
    <div className="login-bg">
      <div className="login-container admin-login">
        <div className="login-logo">
          <img src="/IMG/logo.jpg" alt="Logo Opción MG" />
        </div>
        <h2>Panel de Administración</h2>
        <form onSubmit={handleLogin}>
          <label>Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
        {mensaje && (
          <div className={`mensaje ${mensaje.includes("exitoso") ? "success" : "error"}`}>
            {mensaje}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;