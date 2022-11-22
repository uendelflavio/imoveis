import React from "react";
import Imoveis from "pages/Imoveis.js";

const routes = [
  {
    path: "/app/imoveis",
    exact: true,
    title: "Imoveis",
    component: () => {
      return <Imoveis />;
    }
  }
];

export default routes;
