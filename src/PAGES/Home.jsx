// src/pages/Home.jsx
import '../CSS/estilo.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Carousel from '../COMPONENTS/Carrusel';


function Home() {
  return (
    <div className="page-container dynamic-bg">
      <header className="head">
        <div className='logo'>
          <img src='/public/IMG/logo.png' alt="Logo Opcion MG"></img>
        </div>
        
        <nav className="navbar">
          <a href="/">Inicio</a>
          <a href="/musica">Música</a>
          <a href="/nosotros">Paquetes</a>
          <a href="/galeria">Galería</a>
          <a href="/contacto">Contacto</a>
        </nav>
      </header>
      
      <main className="content header">
        <div className="welcome-title">
          <h1 className="title">Bienvenidos</h1>
        </div>
        <img src="/IMG/logo.jpg" alt="Logo Opción MG" className="responsive-logo" />
        
      </main>



    <div className="bloque-intro-opcionmg fade-in-bottom">
  <div className="linea-decorativa"></div>
  <h2 className="title grupo-title">Grupo Opción MG</h2>

  <p className="grupo-text">
    En Grupo Opción MG nos especializamos en llevar la mejor música y ambiente a cualquier tipo de evento,
    ya sea bodas, quinceañeras, graduaciones, cumpleaños, congresos o reuniones empresariales.
    Nos encargamos de que cada detalle sonoro y lumínico sea perfecto para que tú y tus invitados vivan momentos únicos.
    Confía en Grupo Opción MG para transformar tu evento en una experiencia llena de ritmo, estilo y momentos memorables.
  </p>

  <div className="carousel-wrapper">
    <Carousel />
  </div>

  <div className="linea-decorativa"></div>
</div>
      

      <div className="content about">
        <div className="box-container-wrapper">
        <h2 className="title paquetes-title">Paquetes</h2>
        <p className='paquete-text'>Tenemos una gama paquetes que se adaptan a tu evento, tu presupuesto y gusto  </p>
        <div className="box-container">
          <div className="box">
            <i className="bi bi-stars icono-paquete"></i>
            <h3>Plus</h3>
            <p>(10 Elementos)</p>
            <p>Camara de humo</p> 
            <p>Audio profesional</p>
            <p>Pantalla led</p> 
            <p>Pista</p>
            <a href="/nosotros" className="btn">Saber más</a>
          </div>

          <div className="box">
            <i class="bi bi-music-note-beamed"></i>
            <h3>Max</h3>
            <p>(12 Elementos)</p>
            <p>Camara de humo</p> 
            <p>Audio profesional</p>
            <p>Pantalla de Proyeccion</p> 
            <p>Pista</p>
            <a href="/nosotros" className="btn">Saber más</a>
          </div>

          <div className="box">
            <i className="bi bi-disc"></i>
            <h3>Mega</h3>
            <p>(15 Elementos)</p>
            <p>Camara de humo</p> 
            <p>Audio profesional</p>
            <p>Pantalla led</p> 
            <p>Pista</p>
            <a href="/nosotros" className="btn">Saber más</a>
          </div>
        </div>
      </div>

      <div className='Contacto-home'> 
        <h2 className='title-contacto'>¿Estas interesado?</h2>
        <p className='contacto-text'>Registrate para reservar</p>
        <a href='/contacto' className='btn'>Registrar</a>
      </div>
      </div>

      <footer className="footer">
        <div className="divider"></div>
        <p>Síguenos en:</p>
        <div className="social-links">
          <a href="https://www.facebook.com/profile.php?id=61563383490654"><i className="bi bi-facebook"></i></a>
          <a href="https://x.com/OpcionMGrupo"><i className="bi bi-twitter-x"></i></a>
          <a href="https://www.instagram.com/opcionmgrupo/"><i className="bi bi-instagram"></i></a>
          <a href="https://www.youtube.com/channel/UCcHAjeHZ9JRY1vi2g2C6blA"><i className="bi bi-youtube"></i></a>
        </div>
      </footer>
    </div>
  );
}

export default Home;