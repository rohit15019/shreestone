import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ShieldCheck, Truck, Tag, Award, Sparkles, 
  Star, CheckCircle2, ChevronRight, Eye, ShoppingBag, Layers 
} from 'lucide-react';
import { tilesData } from '../data/tilesData';
import TileCard from '../components/TileCard';
import ProductDetailsModal from '../components/ProductDetailsModal';
import BuyNowModal from '../components/BuyNowModal';

const HomePage = () => {
  const featuredTiles = tilesData.filter(t => t.isFeatured).slice(0, 6);
  const [selectedTile, setSelectedTile] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isBuyNowOpen, setIsBuyNowOpen] = useState(false);

  const handleViewDetails = (tile) => {
    setSelectedTile(tile);
    setIsDetailsOpen(true);
  };

  const handleBuyNow = (tile) => {
    setSelectedTile(tile);
    setIsBuyNowOpen(true);
  };

  const categories = [
    {
      name: "Floor Tiles",
      description: "Large format vitrified slabs & Italian marble textures",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=85",
      count: "48+ Slabs"
    },
    {
      name: "Wall Tiles",
      description: "Carving finishes, metallic veins & 3D elevations",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=85",
      count: "36+ Designs"
    },
    {
      name: "Bathroom Tiles",
      description: "Anti-skid matte & moisture-resistant bathroom series",
      image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=85",
      count: "24+ Series"
    },
    {
      name: "Kitchen Tiles",
      description: "Stain-proof backsplashes & heat-resistant countertops",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=85",
      count: "18+ Colors"
    },
    {
      name: "Outdoor Tiles",
      description: "15 mm heavy-duty pavers & rustic patio tiles",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=85",
      count: "15+ Pavers"
    }
  ];

  const whyChooseUs = [
    {
      title: "Premium Quality",
      subtitle: "Italian Rectified Standards",
      desc: "Zero-stain nano seal with <0.05% water absorption and high MOHS scratch resistance.",
      icon: <Award className="w-8 h-8 text-gold" />
    },
    {
      title: "Affordable Price",
      subtitle: "Direct Factory & Studio Rates",
      desc: "Transparent sq.ft pricing without middleman markups. Project trade discounts available.",
      icon: <Tag className="w-8 h-8 text-gold" />
    },
    {
      title: "Fast Delivery",
      subtitle: "Pan-India Express Logistics",
      desc: "Specialized wooden pallet reinforcement guaranteeing zero transit breakage.",
      icon: <Truck className="w-8 h-8 text-gold" />
    },
    {
      title: "Trusted Brand",
      subtitle: "Preferred by Architects",
      desc: "Chosen by over 1,400+ interior designers and developers across luxury Indian estates.",
      icon: <ShieldCheck className="w-8 h-8 text-gold" />
    }
  ];

  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-charcoal-950 text-white pt-20">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
            alt="Shreestone Luxury Marble"
            className="w-full h-full object-cover opacity-35 scale-105 animate-pulse"
            style={{ animationDuration: '8s' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950 via-charcoal-950/50 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/30 text-gold-light text-xs font-semibold tracking-wider uppercase backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Italian Carrara & Vitrified Surfaces • 2026 Studio Collection</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight leading-[1.08] text-white"
            >
              Architectural <br />
              <span className="text-gradient-gold">Luxury Surfaces.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg text-gray-300 max-w-2xl font-normal leading-relaxed"
            >
              Transform estates, villas, and commercial spaces with precision-crafted Italian Carrara slabs, carving vitrified surfaces, and 15 mm heavy-duty outdoor pavers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <Link
                to="/tiles"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-gold-amber via-gold to-gold-light text-charcoal-950 font-bold text-sm shadow-xl hover:shadow-luxury hover:scale-105 transition-all flex items-center gap-2"
              >
                <span>Explore Studio Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 rounded-xl bg-charcoal-900/80 hover:bg-charcoal-800 text-white font-semibold text-sm border border-charcoal-700 backdrop-blur-md transition-all flex items-center gap-2"
              >
                <span>Showroom Locator</span>
              </Link>
            </motion.div>

            {/* Trust Metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="grid grid-cols-3 gap-6 pt-10 border-t border-white/10 max-w-lg"
            >
              <div>
                <span className="text-2xl sm:text-3xl font-display font-bold text-white block">1,400+</span>
                <span className="text-xs text-gray-400 uppercase tracking-wider">Architects & Studios</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-display font-bold text-gold block">120+</span>
                <span className="text-xs text-gray-400 uppercase tracking-wider">Slabs & Finishes</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-display font-bold text-white block">10 Yrs</span>
                <span className="text-xs text-gray-400 uppercase tracking-wider">Surface Warranty</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURED TILES SECTION */}
      <section className="py-24 bg-marble-light dark:bg-charcoal-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-gold block mb-2">
                Curated Luxury
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-charcoal-900 dark:text-white">
                Featured Showroom Slabs
              </h2>
            </div>
            <Link
              to="/tiles"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-amber transition-colors group"
            >
              <span>View Entire Collection</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Tiles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTiles.map((tile) => (
              <TileCard
                key={tile._id}
                tile={tile}
                onViewDetails={handleViewDetails}
                onBuyNow={handleBuyNow}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES SHOWCASE */}
      <section className="py-24 bg-white dark:bg-charcoal-950 transition-colors border-y border-gray-200/60 dark:border-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold block mb-2">
              Architectural Applications
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-charcoal-900 dark:text-white">
              Explore by Space & Finish
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Every Shreestone slab is engineered with specific slip-resistance, thickness, and MOHS hardness ratings tailored for different architectural environments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                to={`/tiles?category=${encodeURIComponent(cat.name)}`}
                className="group relative aspect-[16/10] rounded-3xl overflow-hidden shadow-card hover:shadow-luxury transition-all duration-500 block"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                  <div>
                    <span className="text-xs font-semibold text-gold uppercase tracking-wider block mb-1">
                      {cat.count}
                    </span>
                    <h3 className="font-display font-bold text-2xl group-hover:text-gold transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-gray-300 mt-1 line-clamp-1">
                      {cat.description}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-gold group-hover:text-charcoal-950 transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 bg-marble-light dark:bg-charcoal-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold block mb-2">
              Italian Vitrified Standards
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-charcoal-900 dark:text-white">
              Why Shreestone Ceramics?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white dark:bg-charcoal-800 border border-gray-200/80 dark:border-charcoal-700 shadow-card flex flex-col justify-between space-y-4 hover:border-gold/50 transition-all"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mb-6">
                    {item.icon}
                  </div>
                  <span className="text-xs font-semibold text-gold uppercase tracking-wider block mb-1">
                    {item.subtitle}
                  </span>
                  <h3 className="font-display font-bold text-xl text-charcoal-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODALS */}
      <ProductDetailsModal
        tile={selectedTile}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        onBuyNow={(t) => {
          setIsDetailsOpen(false);
          handleBuyNow(t);
        }}
      />
      <BuyNowModal
        tile={selectedTile}
        isOpen={isBuyNowOpen}
        onClose={() => setIsBuyNowOpen(false)}
      />
    </div>
  );
};

export default HomePage;
