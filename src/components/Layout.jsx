import { Outlet } from 'react-router-dom';
import Header from "./header/Header";
import Footer from "./footer/Footer";
// Todo lo que pongamos dentro del layout se renderiza en <Outlet />.
function Layout({ onVistaChange }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header onVistaChange={onVistaChange} />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
export default Layout;
