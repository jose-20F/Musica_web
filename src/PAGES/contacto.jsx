import { useState } from 'react';
import Layout from '../COMPONENTS/Layout';
import '../CSS/estilo.css';

function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
      
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setFormData({ nombre: '', apellido: '', email: '', telefono: '', mensaje: '' });
      } else {
        alert('Error: ' + (data.error || 'No se pudo enviar el formulario'));
      }
    } catch (error) {
      alert('Error al enviar el formulario. Verifica si el servidor está activo.');
      console.error('Error de red:', error);
    }
  };

  return (
    <Layout>
      <section className="content header">
        <h2 className="title">Contacto</h2>
      </section>

      <section className="about">
        <h3 className="subtitulo">ESCRÍBENOS:</h3>
        <form onSubmit={handleSubmit} className="formulario-contacto">
          <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
          <input type="text" name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="tel" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} />
          <textarea name="mensaje" placeholder="Déjanos un mensaje ..." value={formData.mensaje} onChange={handleChange} required />
          <button type="submit">Enviar</button>
        </form>

        <div className="manager">
          <h4>MÁNAGER</h4>
          <p><strong>MARÍA GÓMEZ</strong></p>
          <p><a href="mailto:info@misitio.com">info@misitio.com</a></p>
          <p>Tel: <a href="tel:914123456">914-123-456</a></p>
        </div>
      </section>
    </Layout>
  );
}

export default Contacto;
