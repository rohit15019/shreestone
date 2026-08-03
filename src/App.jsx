import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { NotificationProvider } from './context/NotificationContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import CatalogDownloadModal from './components/CatalogDownloadModal';

import HomePage from './pages/HomePage';
import TilesPage from './pages/TilesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import TileVisualizerPage from './pages/TileVisualizerPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const App = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <CartProvider>
          <Router>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <CartDrawer />
              <CatalogDownloadModal />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/tiles" element={<TilesPage />} />
                  <Route path="/tile-visualizer" element={<TileVisualizerPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </CartProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
