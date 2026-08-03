import React, { useState, useMemo } from 'react';
import { Search, CheckCircle2, Sparkles, SlidersHorizontal } from 'lucide-react';
import { tilesData, categoriesData } from '../../data/tilesData';
import { motion } from 'framer-motion';

/**
 * TileSelectorDrawer Component
 * STEP 2: Load all tile images from the existing website product data (tilesData.js)
 * Displays tiles as cards with:
 * - Tile Image
 * - Tile Name
 * - Size
 * - Finish
 * - Color
 * Clicking a tile selects it instantly.
 */
const TileSelectorDrawer = ({ selectedTile, onSelectTile }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter tiles by category and keyword search
  const filteredTiles = useMemo(() => {
    return tilesData.filter(tile => {
      const matchesCat = selectedCategory === 'All' || tile.category === selectedCategory;
      const matchesSearch = searchQuery === '' ||
        tile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (tile.color && tile.color.toLowerCase().includes(searchQuery.toLowerCase())) ||
        tile.finish.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="bg-white dark:bg-charcoal-800 rounded-3xl p-6 border border-gray-200/80 dark:border-charcoal-700 shadow-card flex flex-col h-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-gold block">
            STEP 2 • Texture Library
          </span>
          <h3 className="font-display font-bold text-xl text-charcoal-900 dark:text-white">
            Select Surface Slab ({filteredTiles.length})
          </h3>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-60">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search marble, color..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 dark:bg-charcoal-900 border border-gray-200 dark:border-charcoal-700 text-xs text-charcoal-900 dark:text-white focus:outline-none focus:border-gold"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            selectedCategory === 'All'
              ? 'bg-gradient-to-r from-gold-amber via-gold to-gold-light text-charcoal-950 shadow-sm'
              : 'bg-gray-100 dark:bg-charcoal-900 text-charcoal-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-charcoal-700'
          }`}
        >
          All Finishes ({tilesData.length})
        </button>
        {categoriesData.categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-gold-amber via-gold to-gold-light text-charcoal-950 shadow-sm'
                : 'bg-gray-100 dark:bg-charcoal-900 text-charcoal-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-charcoal-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tile Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto max-h-[480px] pr-1">
        {filteredTiles.map((tile) => {
          const isSelected = selectedTile?._id === tile._id;
          const imgUrl = tile.images && tile.images.length > 0 ? tile.images[0] : '';

          return (
            <motion.button
              key={tile._id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectTile(tile)}
              className={`group relative rounded-2xl overflow-hidden border-2 text-left transition-all flex flex-col bg-gray-50 dark:bg-charcoal-900/60 ${
                isSelected
                  ? 'border-gold shadow-luxury ring-2 ring-gold/40'
                  : 'border-gray-200 dark:border-charcoal-700 hover:border-gold/60'
              }`}
            >
              {/* Image Preview Container */}
              <div className="relative aspect-square overflow-hidden bg-gray-200 dark:bg-charcoal-900">
                <img
                  src={imgUrl}
                  alt={tile.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Selected Check Badge */}
                {isSelected && (
                  <div className="absolute top-2 right-2 p-1 rounded-full bg-gold text-charcoal-950 shadow-md">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}

                {/* Finish Badge */}
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-black/60 text-white backdrop-blur-sm">
                  {tile.finish}
                </div>
              </div>

              {/* Card Metadata */}
              <div className="p-3 space-y-1">
                <h4 className="font-display font-bold text-xs text-charcoal-900 dark:text-white truncate">
                  {tile.name}
                </h4>
                <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
                  <span>{tile.size}</span>
                  <span className="text-gold font-semibold">{tile.color}</span>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default TileSelectorDrawer;
