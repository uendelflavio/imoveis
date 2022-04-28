import React from 'react';
import Imoveis from './../pages/Imoveis.js';
import Locadores from './../pages/Locadores.js';

const routes = [
  {
    path: '/app/imoveis',
    exact: true,
    title: 'Imoveis',
    component: () => <Imoveis/>
  },
  {
    path: '/app/locadores',
    exact: true,
    title: 'Locadores',
    component: () => <Locadores/>
  }
];

export default routes;