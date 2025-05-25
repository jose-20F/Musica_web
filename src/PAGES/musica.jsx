import { useState, useRef, useEffect } from 'react';
import Layout from '../COMPONENTS/Layout';
import '../CSS/estilo.css';
import { FaPlay, FaPause, FaForward, FaBackward, FaChevronLeft, FaChevronRight, FaVolumeUp, FaVolumeDown } from 'react-icons/fa';

const Musica = () => {
  const [cancionActual, setCancionActual] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [progreso, setProgreso] = useState(0);
  const [volumen, setVolumen] = useState(1);
  const audioRef = useRef(null);

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

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    }
  }, [cancionActual]);

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

  const playPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const siguienteCancion = () => {
    setCancionActual((prev) => (prev + 1) % songs.length);
    setVisibleIndex((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
  };

  const cancionAnterior = () => {
    setCancionActual((prev) => (prev - 1 + songs.length) % songs.length);
    setVisibleIndex((prev) => (prev - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  const siguienteCard = () => {
    setVisibleIndex((prev) => (prev + 1) % songs.length);
  };

  const anteriorCard = () => {
    setVisibleIndex((prev) => (prev - 1 + songs.length) % songs.length);
  };

  const seleccionarCancion = (index) => {
    setVisibleIndex(index);
    setCancionActual(index);
    setIsPlaying(true);
  };

  const cambiarProgreso = (e) => {
    const nuevoTiempo = (e.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = nuevoTiempo;
    setProgreso(e.target.value);
  };

  const cambiarVolumen = (nuevoValor) => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = nuevoValor;
      setVolumen(nuevoValor);
    }
  };

  return (
    <Layout>
      <div className="musica-page">
        <div className="musica-header">
          <h2>Reproductor de Música</h2>
        </div>
        <div className="song-carousel">
          <button className="carousel-btn left" onClick={anteriorCard}>
            <FaChevronLeft />
          </button>
          <div className="song-grid">
            {songs.map((song, index) => {
              let className = "song-card";
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
                  <img src={song.image} alt={song.name} className="song-image" />
                  <div className="song-info">{song.name}</div>
                </div>
              );
            })}
          </div>
          <button className="carousel-btn right" onClick={siguienteCard}>
            <FaChevronRight />
          </button>
        </div>

        <div className="reproductor-fijo">
          <audio ref={audioRef} src={songs[cancionActual].file} className="audio-player" />
          <img src={songs[cancionActual].image} alt={songs[cancionActual].name} className="song-image" style={{ width: 70, height: 70, marginRight: 16 }} />
          <div style={{ flex: 1, margin: '0 1rem' }}>
            <div className="song-info">{songs[cancionActual].name}</div>
            <input
              type="range"
              className="barra-progreso"
              min="0"
              max="100"
              value={progreso}
              onChange={cambiarProgreso}
            />
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
    </Layout>
  );
};

export default Musica;