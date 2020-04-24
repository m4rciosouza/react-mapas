import React, { useEffect, useState } from 'react';
import './mapa.css';
import L from 'leaflet';
import config from './config';
import axios from 'axios';
import { navigate } from 'hookrouter';

function Mapa() {

  const [locais, setLocais] = useState();

  useEffect(() => {
    let mapa;

    function renderizarMapa() {
      mapa = L.map('mapa').setView([35.403430, 17.681967], 3);
      L.tileLayer(config.MAPA_TILE_LAYER, { maxZoom: 19 }).addTo(mapa);

      const markers = [];
      locais.forEach(local => markers.push(L.marker(local.latlng).addTo(mapa)));
      markers.forEach(marker => marker.on('click', onMarkerClick));
      function onMarkerClick(e) {
        const local = locais.find(local =>
            (local.latlng[0] === e.latlng.lat && local.latlng[1] === e.latlng.lng));
        navigate(`/info-local/${local.latlng}`);
      }

    }

    async function obterLocais() {
      try {
        const dados = await axios.get(`${config.API_URL_BASE}locais?apiKey=${config.API_KEY}`);
        setLocais(dados.data);
      } catch(error) {
        alert('Erro obtendo dados dos paises, tente novamente mais tarde.');
      }
    }

    if (!locais) {
      obterLocais();
    } else {
       renderizarMapa();
    }

    return function limparMapa() {
      if (mapa) {
        mapa.invalidateSize();
      }
    };

  }, [locais]);

  return (
    <div id="mapa"></div>
  );
}

export default Mapa;
