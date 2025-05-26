// Página de galería de imágenes y videos del grupo musical.
// Incluye un carrusel de imágenes con animación y sección para videos futuros.

import '../CSS/estilo.css';
import { useState } from 'react';

function Galeria() {
  // Array de rutas de las imágenes de la galería
  const images = [
    '/IMG/imagen1.jpg',
    '/IMG/imagen2.jpg',
    '/IMG/imagen3.jpg',
    '/IMG/imagen4.jpg',
    '/IMG/imagen5.jpg',
  ];

  // Estado: índice de la imagen actual mostrada en el carrusel
  const [index, setIndex] = useState(0);

  // Estado: controla la animación de aparición/desaparición de la imagen
  const [show, setShow] = useState(true);

  /**
   * Avanza a la siguiente imagen del carrusel.
   * Oculta la imagen actual, cambia el índice y vuelve a mostrar la nueva imagen tras una breve pausa.
   */
  const nextImage = () => {
    setShow(false);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % images.length);
      setShow(true);
    }, 300);
  };

  /**
   * Retrocede a la imagen anterior del carrusel.
   * Oculta la imagen actual, cambia el índice y vuelve a mostrar la nueva imagen tras una breve pausa.
   */
  const prevImage = () => {
    setShow(false);
    setTimeout(() => {
      setIndex((prev) => (prev - 1 + images.length) % images.length);
      setShow(true);
    }, 300);
  };

  return (
    <>
      {/* Encabezado con el logo grande */}
      <section className="content header">
        <img src="/IMG/logo.jpg" alt="Logo Opción MG" className="logo-principal" />
      </section>

      {/* Sección de galería de imágenes */}
      <section className="about">
        <h2 className="title">Imágenes</h2>

        <div className="custom-gallery">
          {/* Botón para imagen anterior */}
          <button className="gallery-btn left" onClick={prevImage}>
            <i className="bi bi-chevron-left"></i>
          </button>

          {/* Imagen actual del carrusel con animación */}
          <img
            src={images[index]}
            alt={`Imagen ${index + 1}`}
            className={`gallery-image ${show ? 'show' : ''}`}
          />

          {/* Botón para imagen siguiente */}
          <button className="gallery-btn right" onClick={nextImage}>
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </section>

      {/* Sección de videos (placeholder) */}
      <section className="videos">
        <h2 className="title">Videos</h2>
        <p>Próximamente agregaremos contenido de video.</p>
      </section>
    </>
  );
}

export default Galeria;
