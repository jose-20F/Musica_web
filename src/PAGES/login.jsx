import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensaje("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.rol === "admin") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("rol", data.rol);
        setMensaje("Login exitoso");
        setTimeout(() => navigate("/eventos-admin"), 800); // Redirige tras login
      } else {
        setMensaje(data.error || "Error al iniciar sesión");
      }
    } catch (err) {
      setMensaje("Error de conexión con el servidor");
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            required
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
      {mensaje && (
        <div className={`mensaje ${mensaje === "Login exitoso" ? "success" : "error"}`}>
          {mensaje}
        </div>
      )}
    </div>
  );
};

export default Login;