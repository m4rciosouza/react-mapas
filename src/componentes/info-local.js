import React, { useState, useEffect } from 'react';
import './info-local.css';
import MapaLocal from './mapa-local';
import { navigate } from 'hookrouter';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import config from './config';
import ModalDescricaoLocal from './modal-descricao-local';
import Galeria from './galeria';

function InfoLocal(props) {

  const [dadosLocal, setDadosLocal] = useState();

  useEffect(() => {
    async function obterDadosLocal() {
      try {
        const dados = await axios.get(
          `${config.API_URL_BASE}info-local/${props.latlng}?apiKey=${config.API_KEY}`);
        setDadosLocal(dados.data);
      } catch(error) {
        alert('Erro obtendo dados.');
        navigate('/');
      }
    }

    if (!dadosLocal) {
      obterDadosLocal();
    }

  }, [dadosLocal, props.latlng]);

  return (
    <>
      <div className="div-botao-voltar">
        <Button
          variant="secondary"
          onClick={() => navigate('/')}>
          <span className="oi oi-arrow-thick-left"></span>
        </Button>
      </div>
      {dadosLocal && <MapaLocal latlng={props.latlng} nome={dadosLocal.nome} />}
      {dadosLocal && <ModalDescricaoLocal
                        nome={dadosLocal.nome}
                        descricao={dadosLocal.descricao} />}
      {dadosLocal && <Galeria imagens={dadosLocal.imagens} />}
    </>
  );
}

export default InfoLocal;
