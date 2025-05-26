import { useState, useRef, useEffect } from 'react';
import '../CSS/estilo.css';
import { FaPlay, FaPause, FaForward, FaBackward, FaChevronLeft, FaChevronRight, FaVolumeUp, FaVolumeDown } from 'react-icons/fa';

/**
 * Página de música con reproductor y carrusel de canciones.
 * Permite reproducir, pausar, cambiar de canción y ajustar el volumen.
 */
const Musica = () => {
  // Estado: índice de la canción actualmente seleccionada para reproducir
  const [cancionActual, setCancionActual] = useState(0);
  // Estado: indica si la canción está en reproducción o en pausa
  const [isPlaying, setIsPlaying] = useState(false);
  // Estado: índice de la canción visible en el carrusel
  const [visibleIndex, setVisibleIndex] = useState(0);
  // Estado: progreso de la canción actual (porcentaje 0-100)
  const [progreso, setProgreso] = useState(0);
  // Estado: volumen del reproductor (0 a 1)
  const [volumen, setVolumen] = useState(1);
  // Referencia al elemento <audio> para controlar reproducción y volumen
  const audioRef = useRef(null);

  // Lista de canciones disponibles en el reproductor
  const songs = [
    { 
      name: 'Me estoy enamorando hoy de ti', 
      file: '/Music/Me%20estoy%20enamorando%20mp3.mp3',
      image: '/IMG/vinilo-aguja-cafe-web.jpg'
    },
    { 
      name: 'Fuerte no soy', 
      file: '/Music/Fuerte%20no%20soy.mp3',
      image: '/IMG/vinilo-aguja-cafe-web.jpg'
    },
    { 
      name: 'SUNBATHING', 
      file: '/Music/SUNBATHING.mp3',
      image: '/IMG/vinilo-aguja-cafe-web.jpg'
    },
    {name: 'STRANGERS',
      file: '/Music/STRANGERS.mp3',
      image: '/IMG/vinilo-aguja-cafe-web.jpg'
    },
  ];

  // Efecto: cuando cambia la canción actual y está en reproducción, inicia la reproducción automática
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    }
  }, [cancionActual]);

  // Efecto: actualiza el progreso de la canción conforme avanza el tiempo de reproducción
  useEffect(() => {
    const audio = audioRef.current;
    const actualizarProgreso = () => {
      if (audio.duration) {
        const porcentaje = (audio.currentTime / audio.duration) * 100;
        setProgreso(porcentaje);
      }
    };

    audio.addEventListener('timeupdate', actualizarProgreso);
    return () => audio.removeEventListener('timeupdate', actualizarProgreso);
  }, []);

  // Reproduce o pausa la canción actual
  const playPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Cambia a la siguiente canción en la lista y la muestra en el carrusel
  const siguienteCancion = () => {
    setCancionActual((prev) => (prev + 1) % songs.length);
    setVisibleIndex((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
  };

  // Cambia a la canción anterior en la lista y la muestra en el carrusel
  const cancionAnterior = () => {
    setCancionActual((prev) => (prev - 1 + songs.length) % songs.length);
    setVisibleIndex((prev) => (prev - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  // Muestra la siguiente tarjeta/canción en el carrusel (sin reproducir)
  const siguienteCard = () => {
    setVisibleIndex((prev) => (prev + 1) % songs.length);
  };

  // Muestra la tarjeta/canción anterior en el carrusel (sin reproducir)
  const anteriorCard = () => {
    setVisibleIndex((prev) => (prev - 1 + songs.length) % songs.length);
  };

  // Selecciona una canción del carrusel para reproducirla
  const seleccionarCancion = (index) => {
    setVisibleIndex(index);
    setCancionActual(index);
    setIsPlaying(true);
  };

  // Cambia el progreso de la canción cuando el usuario mueve la barra de progreso
  const cambiarProgreso = (e) => {
    const nuevoTiempo = (e.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = nuevoTiempo;
    setProgreso(e.target.value);
  };

  // Cambia el volumen del reproductor
  const cambiarVolumen = (nuevoValor) => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = nuevoValor;
      setVolumen(nuevoValor);
    }
  };

  return (
    <>
      <div className="musica-page">
        {/* Encabezado de la página */}
        <div className="musica-header">
          <h2>Reproductor de Música</h2>
        </div>
        {/* Carrusel de canciones */}
        <div className="song-carousel">
          <button className="carousel-btn left" onClick={anteriorCard}>
            <FaChevronLeft />
          </button>
          <div className="song-grid">
            {songs.map((song, index) => {
              let className = "song-card";
              // Determina la posición visual de cada tarjeta en el carrusel
              if (index === visibleIndex) className += " active";
              else if (index === (visibleIndex - 1 + songs.length) % songs.length) className += " left";
              else if (index === (visibleIndex + 1) % songs.length) className += " right";
              if (index === cancionActual) className += " actual";
              return (
                <div
                  key={index}
                  className={className}
                  onClick={() => seleccionarCancion(index)}
                >
                  {/* Imagen de la canción */}
                  <img src={song.image} alt={song.name} className="song-image" />
                  {/* Nombre de la canción */}
                  <div className="song-info">{song.name}</div>
                </div>
              );
            })}
          </div>
          <button className="carousel-btn right" onClick={siguienteCard}>
            <FaChevronRight />
          </button>
        </div>

        {/* Reproductor fijo en la parte inferior de la página */}
        <div className="reproductor-fijo">
          {/* Elemento de audio oculto, controlado por los botones */}
          <audio ref={audioRef} src={songs[cancionActual].file} className="audio-player" />
          {/* Imagen de la canción actual */}
          <img src={songs[cancionActual].image} alt={songs[cancionActual].name} className="song-image" style={{ width: 70, height: 70, marginRight: 16 }} />
          <div style={{ flex: 1, margin: '0 1rem' }}>
            {/* Nombre de la canción actual */}
            <div className="song-info">{songs[cancionActual].name}</div>
            {/* Barra de progreso de la canción */}
            <input
              type="range"
              className="barra-progreso"
              min="0"
              max="100"
              value={progreso}
              onChange={cambiarProgreso}
            />
            {/* Controles de reproducción */}
            <div className="controles">
              <button onClick={cancionAnterior} title="Anterior">
                <FaBackward />
              </button>
              <button onClick={playPause} title={isPlaying ? "Pausar" : "Reproducir"}>
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <button onClick={siguienteCancion} title="Siguiente">
                <FaForward />
              </button>
            </div>
          </div>
          {/* Controles de volumen */}
          <div className="volumen-control">
            <button onClick={() => cambiarVolumen(Math.max(0, volumen - 0.1))} title="Bajar volumen">
              <FaVolumeDown />
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volumen}
              className="barra-volumen"
              onChange={(e) => cambiarVolumen(parseFloat(e.target.value))}
            />
            <button onClick={() => cambiarVolumen(Math.min(1, volumen + 0.1))} title="Subir volumen">
              <FaVolumeUp />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Musica;