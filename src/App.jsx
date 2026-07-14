import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import Layout from './components/Layout.jsx';
import Cart from './components/cart/cart.jsx';
import ProductosNacionales from './components/productosNacionales/productosNacionales.jsx';
import { FormularioContainer } from './components/FormularioContainer/FormularioContainer.jsx';
import { AuthForm } from './components/auth/AuthForm.jsx';
import { ProtectedRoute } from './components/auth/ProtectedRoute.jsx';
import { ProfilePage } from './components/profile/ProfilePage.jsx';
import { ManagementPanel } from './components/gestion/ManagementPanel.jsx';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const banners = ['/images/banner1.png', '/images/banner2.png'];

function PageSEO({ title, description }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index,follow" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
}

const BannerSection = styled.section`
  max-width: 900px;
  margin: 3rem auto;
  padding: 2rem;
  text-align: center;
  border-radius: 20px;
  background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
`;

const BannerTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #0f172a;
`;

const BannerText = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: #334155;
  margin: 0 0 1.5rem;
`;

const BannerFrame = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 18px;
  margin-top: 1.25rem;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 260px;
  object-fit: contain;
  display: block;
  background-color: #f8fafc;
  transition: opacity 0.45s ease-in-out;
  opacity: 1;
`;

const BannerButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.55);
  color: white;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function HomeBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const showPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const showNext = () => {
    setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  return (
    <BannerSection>
      <BannerTitle>¡Bienvenido a APEX TIENDA!</BannerTitle>
      <BannerText>
        Es un placer tenerte aquí. Explora nuestra amplia selección de productos y descubre todo lo que tenemos para ofrecerte. Estamos aquí para ayudarte a encontrar exactamente lo que buscas. ¡Gracias por elegirnos!
      </BannerText>
      <BannerFrame>
        <BannerImage
          key={banners[currentIndex]}
          src={banners[currentIndex]}
          alt={`Banner promocional ${currentIndex + 1}`}
        />
        <BannerButton type="button" onClick={showPrev} aria-label="Banner anterior" style={{ left: '12px' }}><FaChevronLeft /></BannerButton>
        <BannerButton type="button" onClick={showNext} aria-label="Banner siguiente" style={{ right: '12px' }}><FaChevronRight /></BannerButton>
      </BannerFrame>
    </BannerSection>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <>
              <PageSEO title="Inicio | APEX TIENDA" description="Descubre productos destacados, ofertas y una experiencia de compra moderna en APEX TIENDA." />
              <HomeBanner />
            </>
          }
        />
        <Route
          path="productos"
          element={
            <>
              <PageSEO title="Productos | APEX TIENDA" description="Explora nuestra colección de productos nacionales y encuentra lo que necesitas." />
              <ProductosNacionales />
            </>
          }
        />
        <Route
          path="carrito"
          element={
            <>
              <PageSEO title="Carrito | APEX TIENDA" description="Revisa y gestiona los productos seleccionados en tu carrito de compras." />
              <Cart />
            </>
          }
        />
        <Route
          path="login"
          element={
            <>
              <PageSEO title="Iniciar sesión | APEX TIENDA" description="Accede a tu cuenta o crea una nueva para disfrutar de una experiencia más personalizada." />
              <AuthForm />
            </>
          }
        />
        <Route
          path="perfil"
          element={
            <ProtectedRoute>
              <PageSEO title="Perfil | APEX TIENDA" description="Administra tu perfil y tus datos personales en APEX TIENDA." />
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="gestion"
          element={
            <ProtectedRoute>
              <PageSEO title="Gestión | APEX TIENDA" description="Panel de gestión para administrar productos y contenido de la tienda." />
              <ManagementPanel />
            </ProtectedRoute>
          }
        />
        <Route
          path="formulario"
          element={
            <ProtectedRoute>
              <PageSEO title="Formulario | APEX TIENDA" description="Crea o edita productos desde el panel administrativo de APEX TIENDA." />
              <FormularioContainer />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
export default App;