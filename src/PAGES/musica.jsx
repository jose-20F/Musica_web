// src/PAGES/musica.jsx
import { useState } from 'react';
import Layout from '../COMPONENTS/Layout';
import '../CSS/estilo.css';

function Musica() {
  const [categoria, setCategoria] = useState('');

  const musicData = {
    rock: ['Bohemian Rhapsody - Queen', 'Smells Like Teen Spirit - Nirvana'],
    pop: ['Blinding Lights - The Weeknd', 'Levitating - Dua Lipa'],
    jazz: ['So What - Miles Davis', 'Take Five - Dave Brubeck'],
    classical: ['Canon in D - Pachelbel', 'Symphony No. 5 - Beethoven'],
    reggae: ['No Woman No Cry - Bob Marley', 'Sweat - Inner Circle'],
  };

  return (
    <Layout>
      <section className="content header">
        <h2 className="title">Repertorio de Música</h2>
      </section>

      <section className="about">
        <h3 className="subtitulo">Elige un tipo de música:</h3>
        <ul className="music-list">
          {Object.keys(musicData).map((key) => (
            <li key={key} onClick={() => setCategoria(key)} className="music-item">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </li>
          ))}
        </ul>

        {categoria && (
          <div className="music-category">
            <h4 className="categoria-title">{categoria.toUpperCase()}</h4>
            <ul>
              {musicData[categoria].map((track, index) => (
                <li key={index} className="song">{track}</li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Musica;
