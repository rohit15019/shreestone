import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ShoppingBag, ShoppingCart, Plus, Minus, Layers, ShieldCheck, Ruler, Sparkles, Award } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductDetailsModal = ({ tile, isOpen, onClose, onBuyNow }) => {
  const { addToCart } = useCart();
  const [quantitySqFt, setQuantitySqFt] = useState(100);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!isOpen || !tile) return null;

  const images = tile.images && tile.images.length > 0
    ? tile.images
    : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-charcoal-950/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-charcoal-800 rounded-3xl overflow-hidden border border-gray-200 dark:border-charcoal-700 max-w-5xl w-full shadow-2xl max-h-[90vh] flex flex-col md:flex-row relative"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-charcoal-900/60 text-white hover:bg-gold hover:text-charcoal-950 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Interactive Image Gallery */}
          <div className="w-full md:w-1/2 bg-gray-100 dark:bg-charcoal-900 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-gray-200 dark:border-charcoal-700">
            <div>
              {/* Main Image */}
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200 dark:bg-charcoal-800 shadow-inner mb-4 relative group">
                <img
                  src={images[selectedImageIndex]}
                  alt={tile.name}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur-md">
                    {tile.category}
                  </span>
                </div>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-20 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                        selectedImageIndex === idx
                          ? 'border-gold shadow-md scale-105'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quality Badges */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-charcoal-800 grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Zero Stain Protection</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Award className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Italian Rectified Edges</span>
              </div>
            </div>
          </div>

          {/* Right Column: Specifications & Actions */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-gold block">
                    {tile.company || 'Company 1'} • {tile.category} • {tile.finish}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {tile.availability || 'In Stock'}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-charcoal-900 dark:text-white mt-1">
                  {tile.name}
                </h2>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-charcoal-900/60 border border-gray-100 dark:border-charcoal-700 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 block font-medium uppercase">Showroom Price</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-3xl font-extrabold text-charcoal-900 dark:text-white">₹{tile.pricePerSqFt}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">/ sq.ft (Inclusive of taxes)</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gold font-semibold uppercase block">Trade Discount</span>
                  <span className="text-xs text-gray-600 dark:text-gray-300">Available on over 1,000 sq.ft</span>
                </div>
              </div>

              <div>
                <h4 className="font-display font-semibold text-charcoal-900 dark:text-white text-sm uppercase tracking-wider mb-2">
                  Architectural Description
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {tile.description}
                </p>
              </div>

              {/* Technical Specifications Matrix */}
              <div>
                <h4 className="font-display font-semibold text-charcoal-900 dark:text-white text-sm uppercase tracking-wider mb-3">
                  Technical Specifications
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-charcoal-900/40 border border-gray-100 dark:border-charcoal-700">
                    <span className="text-gray-400 uppercase block font-semibold text-[10px]">Dimensions</span>
                    <span className="font-bold text-charcoal-900 dark:text-white text-sm mt-0.5 block">{tile.size}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-charcoal-900/40 border border-gray-100 dark:border-charcoal-700">
                    <span className="text-gray-400 uppercase block font-semibold text-[10px]">Surface Finish</span>
                    <span className="font-bold text-charcoal-900 dark:text-white text-sm mt-0.5 block">{tile.finish}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-charcoal-900/40 border border-gray-100 dark:border-charcoal-700">
                    <span className="text-gray-400 uppercase block font-semibold text-[10px]">Thickness</span>
                    <span className="font-bold text-charcoal-900 dark:text-white text-sm mt-0.5 block">{tile.thickness || '10 mm'}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-charcoal-900/40 border border-gray-100 dark:border-charcoal-700">
                    <span className="text-gray-400 uppercase block font-semibold text-[10px]">Base Material</span>
                    <span className="font-bold text-charcoal-900 dark:text-white text-sm mt-0.5 block">{tile.material || 'Vitrified Porcelain'}</span>
                  </div>
                </div>
              </div>

              {/* Suitable Applications */}
              {tile.applications && (
                <div>
                  <h4 className="font-display font-semibold text-charcoal-900 dark:text-white text-sm uppercase tracking-wider mb-2">
                    Recommended Applications
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {tile.applications.map((app, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-lg text-xs font-medium bg-gray-100 dark:bg-charcoal-900 text-charcoal-700 dark:text-gray-300 border border-gray-200 dark:border-charcoal-700"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Order Section - Clean vertical stack (no left/right shift) */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-charcoal-700 flex flex-col gap-3 w-full">
              {/* Quantity Selector */}
              <div className="flex items-center justify-between bg-gray-100 dark:bg-charcoal-900 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-charcoal-700 w-full">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Select Area:
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantitySqFt(prev => Math.max(50, prev - 50))}
                    className="w-7 h-7 rounded-lg bg-white dark:bg-charcoal-800 hover:bg-gold/20 hover:text-gold flex items-center justify-center text-xs font-bold transition-colors shadow-sm"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm font-bold w-20 text-center text-charcoal-900 dark:text-white">
                    {quantitySqFt} sq.ft
                  </span>
                  <button
                    onClick={() => setQuantitySqFt(prev => prev + 50)}
                    className="w-7 h-7 rounded-lg bg-white dark:bg-charcoal-800 hover:bg-gold/20 hover:text-gold flex items-center justify-center text-xs font-bold transition-colors shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Primary Action: Add to Cart */}
              <button
                onClick={() => {
                  addToCart(tile, quantitySqFt);
                  onClose();
                }}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-gold-amber via-gold to-gold-light text-charcoal-950 font-bold text-sm shadow-md hover:shadow-luxury hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart ({quantitySqFt} sq.ft)</span>
              </button>

              {/* Secondary Action: Inquire (stacked directly below Add to Cart) */}
              <button
                onClick={() => {
                  onClose();
                  if (onBuyNow) onBuyNow(tile);
                }}
                className="w-full py-3 px-5 rounded-xl bg-gray-100 dark:bg-charcoal-900 text-charcoal-800 dark:text-gray-200 hover:bg-gold/15 hover:text-gold text-sm font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Inquire / Request Quote</span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductDetailsModal;
