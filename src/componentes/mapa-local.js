import React, { useEffect } from 'react';
import './mapa-local.css';
import L from 'leaflet';
import config from './config';

function MapaLocal(props) {

  useEffect(() => {
    let mapa;
    function renderizarMapa() {
      const latlng = props.latlng.split(',');
      mapa = L.map('mapa-local').setView(latlng, 13);
      L.tileLayer(config.MAPA_TILE_LAYER, { maxZoom: 19 }).addTo(mapa);
      L.marker(latlng).addTo(mapa).bindPopup(props.nome).openPopup();
      L.circle(latlng, {
          color: 'orange',
          fillColor: 'light-blue',
          fillOpacity: 0.35,
          radius: 1000
      }).addTo(mapa);
    }

    renderizarMapa();

    return function limparMapa() {
      if (mapa) {
        mapa.invalidateSize();
      }
    };

  }, [props.latlng, props.nome]);

  return <div id="mapa-local"></div>;
}

export default MapaLocal;
