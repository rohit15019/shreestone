import React from 'react';
import { useRoom360 } from '../../../context/Room360Context';
import Filters from '../Filters/Filters';
import { Layers, Heart, Check, Sparkles, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const TileSelector = () => {
  const {
    applyTarget,
    setApplyTarget,
    TILE_CATEGORIES,
    selectedCategory,
    setSelectedCategory,
    filteredTiles,
    selectedTileFloor,
    selectedTileWall,
    handleSelectTile,
    favoriteIds,
    toggleFavorite,
    isCompareMode
  } = useRoom360();

  return (
    <div className="flex flex-col h-full bg-white dark:bg-charcoal-900 border-r border-gray-200 dark:border-charcoal-700 w-full sm:w-80 lg:w-96 select-none shadow-xl z-20">
      {/* 1. Sidebar Header & Target Switcher */}
      <div className="p-4 border-b border-gray-200 dark:border-charcoal-700 bg-gray-50/50 dark:bg-charcoal-800/50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-gold" />
            <h3 className="font-display font-bold text-base text-charcoal-900 dark:text-white">
              Tile Selector
            </h3>
          </div>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-gold/15 text-gold">
            {filteredTiles.length} Slabs
          </span>
        </div>

        {/* Apply To: Floor | Wall | Both */}
        <div className="bg-gray-200/80 dark:bg-charcoal-900 p-1 rounded-xl flex items-center gap-1">
          {['floor', 'wall', 'both'].map((target) => {
            const isActive = applyTarget === target;
            const label =
              target === 'floor' ? 'Floor Only' :
              target === 'wall' ? 'Wall Only' : 'Both Floor & Wall';

            return (
              <button
                key={target}
                onClick={() => setApplyTarget(target)}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-200 ${
                  isActive
                    ? 'bg-gold text-charcoal-950 shadow-sm'
                    : 'text-charcoal-700 dark:text-gray-400 hover:text-charcoal-900 dark:hover:text-white'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Category Filter Pills */}
      <div className="px-4 py-2.5 border-b border-gray-200 dark:border-charcoal-700 bg-white dark:bg-charcoal-900">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {TILE_CATEGORIES.map((cat) => {
            const isCatActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
                  isCatActive
                    ? 'bg-charcoal-900 text-white dark:bg-white dark:text-charcoal-900 border-gold shadow-xs'
                    : 'bg-gray-100 dark:bg-charcoal-800 text-charcoal-700 dark:text-gray-300 border-transparent hover:border-gold/40'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Filter Controls */}
      <div className="p-3 border-b border-gray-200 dark:border-charcoal-700 bg-gray-50/40 dark:bg-charcoal-850">
        <Filters />
      </div>

      {/* 4. Tile Slabs List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {filteredTiles.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-xs font-medium">No tiles match your current filters.</p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="mt-2 text-xs text-gold underline"
            >
              Show All Slabs
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredTiles.map((tile) => {
              const isFloorSelected = selectedTileFloor?._id === tile._id;
              const isWallSelected = selectedTileWall?._id === tile._id;
              const isSelected =
                (applyTarget === 'floor' && isFloorSelected) ||
                (applyTarget === 'wall' && isWallSelected) ||
                (applyTarget === 'both' && (isFloorSelected || isWallSelected));

              const isFav = favoriteIds.includes(tile._id);

              return (
                <motion.div
                  key={tile._id}
                  whileHover={{ y: -2 }}
                  onClick={() => handleSelectTile(tile)}
                  className={`group relative rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-200 bg-gray-100 dark:bg-charcoal-800 ${
                    isSelected
                      ? 'border-gold shadow-gold-md ring-2 ring-gold/20'
                      : 'border-gray-200 dark:border-charcoal-700 hover:border-gold/50'
                  }`}
                >
                  {/* Thumbnail Image */}
                  <div className="aspect-square w-full relative overflow-hidden bg-gray-200 dark:bg-charcoal-900">
                    <img
                      src={tile.images?.[0] || ''}
                      alt={tile.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Active Check overlay */}
                    {isSelected && (
                      <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-gold text-charcoal-950 flex items-center justify-center shadow-md">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}

                    {/* Favorite Heart Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(tile._id);
                      }}
                      className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md transition-colors ${
                        isFav
                          ? 'bg-red-500 text-white'
                          : 'bg-black/40 text-white/80 hover:bg-black/70 hover:text-white'
                      }`}
                      title={isFav ? 'Remove from favorites' : 'Save favorite'}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-white' : ''}`} />
                    </button>

                    {/* Finish tag */}
                    <span className="absolute bottom-2 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white uppercase tracking-wider">
                      {tile.finish}
                    </span>
                  </div>

                  {/* Tile Info Footer */}
                  <div className="p-2.5 bg-white dark:bg-charcoal-800">
                    <h4 className="font-display font-bold text-xs text-charcoal-900 dark:text-white truncate">
                      {tile.name}
                    </h4>
                    <div className="flex items-center justify-between mt-1 text-[11px]">
                      <span className="text-gray-500 dark:text-gray-400">
                        {tile.size}
                      </span>
                      <span className="font-bold text-gold">
                        ₹{tile.pricePerSqFt}/sq.ft
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TileSelector;
