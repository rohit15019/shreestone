import React from 'react';
import { motion } from 'framer-motion';
import { Eye, ShoppingBag, ShoppingCart, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

const TileCard = ({ tile, onViewDetails, onBuyNow }) => {
  const { addToCart } = useCart();
  if (!tile) return null;

  const primaryImage = tile.images && tile.images.length > 0
    ? tile.images[0]
    : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85';

  const isAvailable = tile.availability === 'In Stock';
  const displayPrice = tile.pricePerSqFt || tile.price || 185;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group bg-white dark:bg-charcoal-800 rounded-3xl overflow-hidden border border-gray-200/80 dark:border-charcoal-700/80 shadow-card hover:shadow-luxury transition-all flex flex-col h-full"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 dark:bg-charcoal-900 cursor-pointer" onClick={() => onViewDetails(tile)}>
        <img
          src={primaryImage}
          alt={tile.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
          <span className="text-white text-xs font-semibold flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-gold" />
            <span>Click to inspect architectural slab</span>
          </span>
        </div>

        {/* Availability Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-3 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1.5 backdrop-blur-md shadow-sm ${
              isAvailable
                ? 'bg-black/60 text-emerald-400 border border-emerald-500/30'
                : 'bg-black/60 text-amber-400 border border-amber-500/30'
            }`}
          >
            {isAvailable ? (
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            ) : (
              <AlertCircle className="w-3 h-3 text-amber-400" />
            )}
            <span>{tile.availability || 'In Stock'}</span>
          </span>
        </div>

        {/* Category & Origin Badge */}
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 rounded-full bg-gold/90 text-charcoal-950 font-bold text-[10px] uppercase tracking-wider shadow-md">
            {tile.origin || 'Italy'}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
            <span className="font-medium text-charcoal-700 dark:text-gray-300">
              {tile.company || 'Company 1'} • {tile.size}
            </span>
            <span className="text-gold dark:text-gold-light font-semibold uppercase tracking-wider">{tile.finish}</span>
          </div>
          <h3
            onClick={() => onViewDetails(tile)}
            className="font-display font-bold text-lg text-charcoal-900 dark:text-white group-hover:text-gold transition-colors line-clamp-1 cursor-pointer"
          >
            {tile.name}
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 line-clamp-2 leading-relaxed">
            {tile.description}
          </p>
        </div>

        {/* Bottom Bar: Price & Action */}
        <div className="pt-3 border-t border-gray-100 dark:border-charcoal-700/80 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] uppercase font-semibold text-gray-400 block">Showroom Price</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-extrabold text-charcoal-900 dark:text-white">₹{displayPrice}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">/ sq.ft</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onViewDetails(tile)}
              title="Quick View"
              className="p-2 rounded-xl bg-gray-100 dark:bg-charcoal-700 text-charcoal-700 dark:text-gray-200 hover:text-gold dark:hover:text-gold hover:bg-gold/10 transition-colors"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => addToCart(tile, 100)}
              title="Add 100 sq.ft to Cart"
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-gold-amber via-gold to-gold-light text-charcoal-950 text-xs font-bold shadow-sm hover:shadow-luxury hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>+ Cart</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TileCard;
