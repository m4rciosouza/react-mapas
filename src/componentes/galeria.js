import React, { useState } from 'react';
import './galeria.css';
import { PhotoSwipe } from 'react-photoswipe';

function Galeria(props) {

  const [exibirGaleria, setExibirGaleria] = useState(false);
  const [opcoesGaleria, setOpcoesGaleria] = useState({});

  function handleFecharGaleria() {
    setExibirGaleria(false);
  };

  function handleExibirGaleria(indice) {
    setOpcoesGaleria({ index: indice });
    setExibirGaleria(true);
  }

  return (
    <>
      <div className="container-fluid container-info-fotos">
        <div className="row">
          {props.imagens.map((imagem, i) => (
            <div className="col col-md-3 col-4" key={i}>
              <img
                src={imagem.src}
                alt={imagem.title}
                className="imgGallery"
                onClick={() => handleExibirGaleria(i)} />
            </div>
          ))}
        </div>
      </div>
      <PhotoSwipe
          isOpen={exibirGaleria}
          items={props.imagens}
          onClose={handleFecharGaleria}
          options={opcoesGaleria} />
    </>
  );
}

export default Galeria;
