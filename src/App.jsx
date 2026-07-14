import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Cart from './components/cart/cart.jsx';
import ProductosNacionales from './components/productosNacionales/productosNacionales.jsx';
import { FormularioContainer } from './components/FormularioContainer/FormularioContainer.jsx';
import { AuthForm } from './components/auth/AuthForm.jsx';
import { ProtectedRoute } from './components/auth/ProtectedRoute.jsx';
import { ProfilePage } from './components/profile/ProfilePage.jsx';
import { ManagementPanel } from './components/gestion/ManagementPanel.jsx';

const banners = ['/images/banner1.png', '/images/banner2.png'];

function HomeBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const showPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const showNext = () => {
    setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  return (
    <section style={{ maxWidth: '900px', margin: '3rem auto', padding: '2rem', textAlign: 'center', borderRadius: '20px', background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)', boxShadow: '0 12px 30px rgba(0,0,0,0.08)' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#0f172a' }}>¡Bienvenido a APEX TIENDA!</h1>
      <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#334155', margin: '0 0 1.5rem' }}>
        Es un placer tenerte aquí. Explora nuestra amplia selección de productos y descubre todo lo que tenemos para ofrecerte. Estamos aquí para ayudarte a encontrar exactamente lo que buscas. ¡Gracias por elegirnos!
      </p>
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden', borderRadius: '18px', marginTop: '1.25rem' }}>
        <img
          key={banners[currentIndex]}
          src={banners[currentIndex]}
          alt={`Banner promocional ${currentIndex + 1}`}
          style={{ width: '100%', height: '260px', objectFit: 'contain', display: 'block', backgroundColor: '#f8fafc', transition: 'opacity 0.45s ease-in-out', opacity: 1 }}
        />
        <button type="button" onClick={showPrev} aria-label="Banner anterior" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', background: 'rgba(0,0,0,0.55)', color: 'white', fontSize: '1.2rem' }}>←</button>
        <button type="button" onClick={showNext} aria-label="Banner siguiente" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', background: 'rgba(0,0,0,0.55)', color: 'white', fontSize: '1.2rem' }}>→</button>
      </div>
    </section>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomeBanner />} />
        <Route path="productos" element={<ProductosNacionales />} />
        <Route path="carrito" element={<Cart />} />
        <Route path="login" element={<AuthForm />} />
        <Route
          path="perfil"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="gestion"
          element={
            <ProtectedRoute>
              <ManagementPanel />
            </ProtectedRoute>
          }
        />
        <Route
          path="formulario"
          element={
            <ProtectedRoute>
              <FormularioContainer />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
export default App;