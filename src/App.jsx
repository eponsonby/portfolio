import { Outlet } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.jsx';
import Nav from './components/Nav/Nav.jsx';
import Footer from './components/Footer/Footer.jsx';
import styles from './App.module.css';

export default function App() {
  return (
    <ThemeProvider>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <hr className={styles.stitch} />
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </ThemeProvider>
  );
}
