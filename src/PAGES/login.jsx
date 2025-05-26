import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/login.css";
import "../CSS/estilo.css";

/**
 * Página de login para administradores.
 * Permite ingresar con correo y contraseña, valida contra el backend y guarda el token JWT en localStorage.
 */
const Login = () => {
  // Estados para los campos del formulario y mensajes de feedback
  const [email, setEmail] = useState("");         // Email del usuario
  const [password, setPassword] = useState("");   // Contraseña del usuario
  const [mensaje, setMensaje] = useState("");     // Mensaje de error o éxito
  const [loading, setLoading] = useState(false);  // Estado de carga para el botón
  const navigate = useNavigate();                 // Hook para redireccionar

  /**
   * Maneja el envío del formulario de login.
   * Realiza una petición POST al backend para autenticar al usuario.
   * Si es exitoso, guarda el token y el rol en localStorage y redirige al panel de admin.
   * Si falla, muestra un mensaje de error.
   */
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje("");
    try {
      // Realiza la petición al endpoint de login del backend
      const res = await fetch("http://localhost:3000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      // Si la autenticación es exitosa y el usuario es admin
      if (res.ok && data.token && data.rol === "admin") {
        // Guarda el token y el rol en localStorage para futuras peticiones protegidas
        localStorage.setItem("token", data.token);
        localStorage.setItem("rol", data.rol);
        // Redirige al panel de administración
        navigate("/homeadmin");
      } else {
        // Muestra mensaje de error si las credenciales son incorrectas
        setMensaje(data.error || "Credenciales incorrectas");
      }
    } catch (error) {
      // Muestra mensaje de error si hay un problema de conexión
      setMensaje("Error de conexión");
    }
    setLoading(false);
  };

  return (
    <div className="login-bg">
      <div className="login-container admin-login">
        {/* Logo del sistema */}
        <div className="login-logo">
          <img src="/IMG/logo.jpg" alt="Logo Opción MG" />
        </div>
        <h2>Panel de Administración</h2>
        {/* Formulario de login */}
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
        {/* Mensaje de error o éxito */}
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