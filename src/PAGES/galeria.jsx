// src/PAGES/galeria.jsx
import Layout from '../COMPONENTS/Layout';
import '../CSS/estilo.css';
import { useState, useEffect } from 'react';

function Galeria() {
  const images = [
    '/IMG/imagen1.jpg',
    '/IMG/imagen2.jpg',
    '/IMG/imagen3.jpg',
    '/IMG/imagen4.jpg',
    '/IMG/imagen5.jpg',
  ];

  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);

  const nextImage = () => {
    setShow(false);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % images.length);
      setShow(true);
    }, 300);
  };

  const prevImage = () => {
    setShow(false);
    setTimeout(() => {
      setIndex((prev) => (prev - 1 + images.length) % images.length);
      setShow(true);
    }, 300);
  };

  return (
    <Layout>
      <section className="content header">
        <img src="/IMG/logo.jpg" alt="Logo Opción MG" className="logo-principal" />
      </section>

      <section className="about">
        <h2 className="title">Imágenes</h2>

        <div className="custom-gallery">
          <button className="gallery-btn left" onClick={prevImage}>
            <i className="bi bi-chevron-left"></i>
          </button>

          <img
            src={images[index]}
            alt={`Imagen ${index + 1}`}
            className={`gallery-image ${show ? 'show' : ''}`}
          />

          <button className="gallery-btn right" onClick={nextImage}>
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </section>

      <section className="videos">
        <h2 className="title">Videos</h2>
        <p>Próximamente agregaremos contenido de video.</p>
      </section>
    </Layout>
  );
}

export default Galeria;
