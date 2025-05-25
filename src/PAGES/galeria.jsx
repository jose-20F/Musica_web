import { useState , useEffect} from 'react';
import Layout from '../COMPONENTS/Layout';
import '../CSS/estilo.css';

function Galeria() {
  const images = [
    '/IMG/imagen1.jpg',
    '/IMG/imagen2.jpg',
    '/IMG/imagen3.jpg',
    '/IMG/imagen4.jpg',
    '/IMG/imagen5.jpg',
    '/IMG/imagen6.jpg',
    '/IMG/imagen7.jpg',
    '/IMG/imagen8.jpg',
    '/IMG/imagen9.jpg',
    '/IMG/imagen10.jpg',
    '/IMG/imagen11.jpg',
    '/IMG/imagen12.jpg',
    '/IMG/imagen13.jpg',
    '/IMG/imagen14.jpg',
    '/IMG/imagen15.jpg',
    '/IMG/imagen16.jpg',
  ];

  const [modalImage, setModalImage] = useState(null);
  const [animate, setAnimate] = useState(false);

  
  useEffect(() => {
    setAnimate(true); // Activa la animación al montar el componente
  }, []);

  const openModal = (img) => {
    setModalImage(img);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <Layout>
      <section className="galeria-container">
        <h2 className="title-galeria">GALERÍA</h2>
        <div className="grid-galeria">
          {images.map((img, i) => (
            <div key={i} className="img-wrapper" onClick={() => openModal(img)} role="button" tabIndex={0} onKeyPress={(e) => { if(e.key === 'Enter') openModal(img); }}>
              <img src={img} alt={`Evento ${i + 1}`} />
            </div>
          ))}
        </div>
        <h3 className='subtitle-galeria'>
          Los mejores momentos de nuestros eventos
        </h3>

        <p className="texto-galeria">
          Aquí te mostramos cómo se viven nuestros eventos: llenos de energía, diversión y momentos inolvidables. ¡Conoce un poco más y contáctanos para que el próximo evento sea el tuyo!
        </p>

        <div className="btn-contact-container">
          <a href="/contacto" className="btn-contacto-galeria">¡Contáctanos!</a>
        </div>


        {modalImage && (
        <div className="modal-overlay" onClick={closeModal} role="dialog" aria-modal="true" tabIndex={-1}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal} aria-label="Cerrar modal">&times;</button>
            <img src={modalImage} alt="Imagen ampliada" />
          </div>
        </div>
      )}
      </section>

    </Layout>
  );
}

export default Galeria;


