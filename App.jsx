// /src/App.jsx
import "./App.css";
import { useState } from "react";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import Productos from "./components/Productos/Productos.jsx";
import { FormularioContainer } from "./components/FormularioContainer/FormularioContainer.jsx";
// import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";


function App() {
  const [vista, setVista] = useState('inicio');

  return (
    <Layout onVistaChange={setVista}>
      <h1>¡Bienvenidos a mi página!</h1>
      <p>Este es el contenido principal.</p>

      {vista === 'inicio' && <p>Esta es la vista de inicio.</p>}
      {vista === 'productos' && <Productos Mensaje="Productos locales" />}
      {vista === 'destacados' && <ItemListContainer Mensaje="Productos destacados" />}
      {vista === 'alta' && <FormularioContainer />}
    </Layout>
  );
}
export default App;
