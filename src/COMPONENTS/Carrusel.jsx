// src/COMPONENTS/Carousel.jsx
import { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Carousel = () => {
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
  );
};

export default Carousel;
