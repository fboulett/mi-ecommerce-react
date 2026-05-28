import Header from "./header/Header";
import Footer from "./footer/Footer";
// Todo lo que pongamos dentro de <Layout> en App.jsx será el "children".
function Layout({ children, onVistaChange }) {
  return (
    <>
      <Header onVistaChange={onVistaChange} />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}
export default Layout;
