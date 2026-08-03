import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Linkedin, Facebook, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-charcoal-900 dark:bg-charcoal-950 text-gray-300 border-t border-charcoal-800 transition-colors">
      {/* Top Luxury Banner */}
      <div className="border-b border-charcoal-800/80 bg-charcoal-900/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-white">Authentic Italian Glaze</h4>
                <p className="text-xs text-gray-400">100% imported Carrara and Statuario marble textures</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-white">Nano-Polished Protection</h4>
                <p className="text-xs text-gray-400">Stain-resistant & zero moisture absorption guarantee</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
                <ArrowRight className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-white">Pan-India Express Dispatch</h4>
                <p className="text-xs text-gray-400">Secure wooden crate packing for zero transit damage</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="inline-block group">
              <Logo size="lg" forceWhite={true} className="group-hover:opacity-95 transition-opacity" />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Crafting architectural statements with Italian-inspired ceramic and vitrified surfaces. Elevating homes, villas, and luxury commercial spaces across India.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2 rounded-full bg-charcoal-800 hover:bg-gold/20 hover:text-gold transition-colors text-gray-300">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-charcoal-800 hover:bg-gold/20 hover:text-gold transition-colors text-gray-300">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-charcoal-800 hover:bg-gold/20 hover:text-gold transition-colors text-gray-300">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Featured Collections */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-white text-base uppercase tracking-wider border-l-2 border-gold pl-3">
              Collections
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/tiles?category=Floor+Tiles" className="hover:text-gold transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-gold" />
                  <span>Floor Slabs & Marble</span>
                </Link>
              </li>
              <li>
                <Link to="/tiles?category=Wall+Tiles" className="hover:text-gold transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-gold" />
                  <span>Carving Wall Surfaces</span>
                </Link>
              </li>
              <li>
                <Link to="/tiles?category=Bathroom+Tiles" className="hover:text-gold transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-gold" />
                  <span>Anti-Skid Bathroom Series</span>
                </Link>
              </li>
              <li>
                <Link to="/tiles?category=Kitchen+Tiles" className="hover:text-gold transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-gold" />
                  <span>Kitchen Backsplash & Counter</span>
                </Link>
              </li>
              <li>
                <Link to="/tiles?category=Outdoor+Tiles" className="hover:text-gold transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-gold" />
                  <span>15mm Full-Body Outdoor Pavers</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-white text-base uppercase tracking-wider border-l-2 border-gold pl-3">
              Showroom
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/tile-visualizer" className="hover:text-gold transition-colors font-semibold text-gold">AI Tile Visualizer (New)</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold transition-colors">About Our Studio</Link>
              </li>
              <li>
                <Link to="/tiles" className="hover:text-gold transition-colors">Catalog & Finishes</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold transition-colors">Showroom Locations</Link>
              </li>
              <li>
                <a href="#newsletter" className="hover:text-gold transition-colors">Request Catalog PDF</a>
              </li>
            </ul>
          </div>

          {/* Showroom Contacts */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-white text-base uppercase tracking-wider border-l-2 border-gold pl-3">
              Head Showroom
            </h3>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <span>Shreestone Studio, Worli Sea Face, Mumbai, Maharashtra - 400030</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <span>+91 98200 44520 / 022-2490-8800</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <span>luxury@shreestone.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Box */}
        <div id="newsletter" className="mt-12 p-8 rounded-2xl bg-charcoal-800/80 border border-charcoal-700/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-display font-bold text-lg text-white">Subscribe to the 2026 Architectural Trend Book</h4>
            <p className="text-sm text-gray-400 mt-1">Receive our seasonal lookbooks, new slab launches, and architect trade guides.</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to Shreestone Ceramics newsletters.'); }} className="flex w-full md:w-auto max-w-md gap-2">
            <input
              type="email"
              required
              placeholder="Enter architect or client email..."
              className="px-4 py-2.5 rounded-lg bg-charcoal-900 border border-charcoal-700 text-white text-sm focus:outline-none focus:border-gold w-full md:w-64"
            />
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-gold-amber via-gold to-gold-light text-charcoal-950 font-semibold text-sm hover:scale-105 transition-transform flex-shrink-0"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Legal */}
      <div className="border-t border-charcoal-800/80 py-6 bg-charcoal-950 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Shreestone Ceramics Pvt. Ltd. All rights reserved. Designed for Luxury Architecture.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-gray-400">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400">Terms of Supply</a>
            <a href="#" className="hover:text-gray-400">Architect Portal</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
