import { useState } from 'react';
import '../CSS/estilo.css';

/**
 * Página de contacto.
 * Incluye un formulario con validación para que los usuarios envíen sus datos y mensaje.
 * Al enviar, los datos se validan y se mandan al backend para ser almacenados y notificados por correo.
 */
function Contacto() {
  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    mensaje: ''
  });

  /**
   * Maneja los cambios en los campos del formulario.
   * Actualiza el estado 'formData' con el valor del input correspondiente.
   */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  /**
   * Maneja el envío del formulario.
   * Realiza validaciones de los campos antes de enviar los datos al backend.
   * Si la validación es exitosa, envía los datos al endpoint y muestra un mensaje de éxito o error.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Expresiones regulares para validaciones
    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    const soloNumeros = /^[0-9]+$/;
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validación de nombre
    if (!soloLetras.test(formData.nombre)) {
      alert('El nombre solo debe contener letras.');
      return;
    }
    // Validación de apellido
    if (!soloLetras.test(formData.apellido)) {
      alert('El apellido solo debe contener letras.');
      return;
    }
    // Validación de email
    if (!emailValido.test(formData.email)) {
      alert('El correo electrónico no es válido.');
      return;
    }
    // Validación de teléfono (si se ingresó)
    if (formData.telefono && !soloNumeros.test(formData.telefono)) {
      alert('El teléfono solo debe contener números.');
      return;
    }
    if (formData.telefono && formData.telefono.length !== 10) {
      alert('El teléfono debe tener exactamente 10 números.');
      return;
    }

    try {
      // Envía los datos al backend
      const response = await fetch('http://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        // Si el envío fue exitoso, limpia el formulario y muestra mensaje
        alert(data.message);
        setFormData({ nombre: '', apellido: '', email: '', telefono: '', mensaje: '' });
      } else {
        alert('Error: ' + (data.error || 'No se pudo enviar el formulario'));
      }
    } catch (error) {
      // Error de red o servidor no disponible
      alert('Error al enviar el formulario. Verifica si el servidor está activo.');
      console.error('Error de red:', error);
    }
  };

  return (
    <>
      {/* Encabezado de la página */}
      <section className="content header">
        <h2 className="title">Contacto</h2>
      </section>

      {/* Sección principal con formulario y datos del mánager */}
      <section className="about">
        <h3 className="subtitulo">ESCRÍBENOS:</h3>
        {/* Formulario de contacto */}
        <form onSubmit={handleSubmit} className="formulario-contacto">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="telefono"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={handleChange}
          />
          <textarea
            name="mensaje"
            placeholder="Déjanos un mensaje ..."
            value={formData.mensaje}
            onChange={handleChange}
            required
          />
          <button type="submit">Enviar</button>
        </form>

        {/* Información de contacto del mánager */}
        <div className="manager">
          <h4>MÁNAGER</h4>
          <p><strong>MARÍA GÓMEZ</strong></p>
          <p><a href="mailto:info@misitio.com">info@misitio.com</a></p>
          <p>Tel: <a href="tel:914123456">914-123-456</a></p>
        </div>
      </section>
    </>
  );
}

export default Contacto;
