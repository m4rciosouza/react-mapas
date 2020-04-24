import React from 'react';
import './App.css';
import { useRoutes } from 'hookrouter';

import Mapa from './componentes/mapa';
import InfoLocal from './componentes/info-local';

function App() {

  const routes = {
      '/': () => <Mapa />,
      '/info-local/:latlng': ({latlng}) => <InfoLocal latlng={latlng} />
  };

  return useRoutes(routes);
}

export default App;
