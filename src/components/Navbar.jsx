import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { Sun, Moon, Menu, X, Sparkles, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { cartItems, openCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Tiles Collection', path: '/tiles' },
    { name: 'AI Visualizer', path: '/tile-visualizer' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Showroom', path: '/contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'glass-nav shadow-lg py-2' 
        : 'bg-transparent py-3'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="inline-block group">
            <Logo size="md" className="group-hover:opacity-95 transition-opacity" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors relative py-1 ${
                    isActive
                      ? 'text-gold font-semibold'
                      : 'text-charcoal-700 dark:text-gray-300 hover:text-gold dark:hover:text-gold-light'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="navIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-amber to-gold"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={openCart}
              aria-label="View Showroom Cart"
              className="relative p-2.5 rounded-full bg-gray-100 dark:bg-charcoal-800 text-charcoal-800 dark:text-gold hover:bg-gold/10 transition-colors border border-gray-200 dark:border-charcoal-700"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gold text-charcoal-950 text-[10px] font-bold flex items-center justify-center shadow-md">
                  {cartItems.length}
                </span>
              )}
            </button>

            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2.5 rounded-full bg-gray-100 dark:bg-charcoal-800 text-charcoal-800 dark:text-gold hover:bg-gold/10 transition-colors border border-gray-200 dark:border-charcoal-700"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-gold" />
              ) : (
                <Moon className="w-4 h-4 text-charcoal-700" />
              )}
            </button>

            <Link
              to="/tiles"
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-gold-amber via-gold to-gold-light text-charcoal-950 font-semibold text-sm shadow-md hover:shadow-luxury hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Explore Studio</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={openCart}
              aria-label="View Showroom Cart"
              className="relative p-2 rounded-lg bg-gray-100 dark:bg-charcoal-800 text-charcoal-800 dark:text-gold"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold text-charcoal-950 text-[9px] font-bold flex items-center justify-center shadow-md">
                  {cartItems.length}
                </span>
              )}
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-charcoal-800 text-charcoal-800 dark:text-gold"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-gold" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-charcoal-900 dark:text-white hover:bg-gray-100 dark:hover:bg-charcoal-800"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-nav border-t border-gray-200 dark:border-charcoal-800 px-6 py-6 space-y-4"
          >
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `text-base font-medium py-2 px-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-gold/15 text-gold font-semibold'
                        : 'text-charcoal-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-charcoal-800'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>
            <div className="pt-4 border-t border-gray-200 dark:border-charcoal-800">
              <Link
                to="/tiles"
                onClick={() => setIsOpen(false)}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-gold-amber via-gold to-gold-light text-charcoal-950 font-bold text-center block shadow-md"
              >
                Explore Luxury Tiles
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
