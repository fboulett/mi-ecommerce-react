import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './header/Header';
import Footer from './footer/Footer';

function Layout({ onVistaChange }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header onVistaChange={onVistaChange} />
      <main style={{ flex: 1 }}>
        <Container fluid className="px-3 px-md-4 py-3 py-md-4">
          <Outlet />
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
