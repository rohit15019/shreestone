import React from 'react';
import { Plus, Layers, Trash2, Edit3, Grid, Square, Split, Sparkles, Check } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * TileLayersBar Component
 * Allows customer to view all added tiles in the visualization,
 * switch between tiles to edit them individually,
 * change multi-tile combination patterns (Checkered, Border Frame, Split),
 * and click "+ Add Tile" to add more tile images to their room!
 */
const TileLayersBar = ({
  tileLayers = [],
  activeLayerIndex = 0,
  layoutPattern = 'single',
  onSelectLayer,
  onRemoveLayer,
  onChangePattern,
  onOpenAddModal
}) => {
  return (
    <div className="bg-white dark:bg-charcoal-800 rounded-3xl p-6 border border-gray-200/80 dark:border-charcoal-700 shadow-card space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 dark:border-charcoal-700 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-gold/15 text-gold border border-gold/30">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display font-bold text-base text-charcoal-900 dark:text-white flex items-center gap-2">
              <span>Room Tile Layers</span>
              <span className="px-2 py-0.5 rounded-full bg-gold/15 text-gold text-xs font-semibold">
                {tileLayers.length} {tileLayers.length === 1 ? 'Tile' : 'Tiles'}
              </span>
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Click a tile below to edit its scale and angle, or add more tiles to create multi-tile combinations.
            </p>
          </div>
        </div>

        {/* "+ Add Tile" Button - prominent as requested */}
        <button
          onClick={onOpenAddModal}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-gold-amber via-gold to-gold-light text-charcoal-950 font-bold text-xs shadow-md hover:shadow-luxury hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Tile</span>
        </button>
      </div>

      {/* Multi-Tile Pattern Selector (visible when 2+ tiles are added) */}
      {tileLayers.length >= 2 && (
        <div className="space-y-2 pt-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 dark:text-gray-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Multi-Tile Combination Pattern</span>
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              onClick={() => onChangePattern('checkered')}
              className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 border ${
                layoutPattern === 'checkered'
                  ? 'bg-gold/20 text-gold border-gold font-bold'
                  : 'bg-gray-100 dark:bg-charcoal-900 text-charcoal-800 dark:text-gray-300 border-transparent hover:border-gold/30'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Checkered Grid</span>
            </button>

            <button
              onClick={() => onChangePattern('border')}
              className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 border ${
                layoutPattern === 'border'
                  ? 'bg-gold/20 text-gold border-gold font-bold'
                  : 'bg-gray-100 dark:bg-charcoal-900 text-charcoal-800 dark:text-gray-300 border-transparent hover:border-gold/30'
              }`}
            >
              <Square className="w-3.5 h-3.5" />
              <span>Border Frame</span>
            </button>

            <button
              onClick={() => onChangePattern('split')}
              className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 border ${
                layoutPattern === 'split'
                  ? 'bg-gold/20 text-gold border-gold font-bold'
                  : 'bg-gray-100 dark:bg-charcoal-900 text-charcoal-800 dark:text-gray-300 border-transparent hover:border-gold/30'
              }`}
            >
              <Split className="w-3.5 h-3.5" />
              <span>Split Room</span>
            </button>

            <button
              onClick={() => onChangePattern('single')}
              className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 border ${
                layoutPattern === 'single'
                  ? 'bg-gold/20 text-gold border-gold font-bold'
                  : 'bg-gray-100 dark:bg-charcoal-900 text-charcoal-800 dark:text-gray-300 border-transparent hover:border-gold/30'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>Single Selected</span>
            </button>
          </div>
        </div>
      )}

      {/* List of Added Tile Layers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {tileLayers.map((layer, index) => {
          const isSelected = index === activeLayerIndex;
          const tileImage = layer.images && layer.images.length > 0 ? layer.images[0] : '';

          return (
            <div
              key={layer.id || index}
              onClick={() => onSelectLayer(index)}
              className={`relative group p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                isSelected
                  ? 'bg-gold/10 border-gold shadow-md'
                  : 'bg-gray-50 dark:bg-charcoal-900 border-gray-200 dark:border-charcoal-700 hover:border-gold/50'
              }`}
            >
              {/* Tile Image Preview */}
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-charcoal-950 shrink-0 border border-charcoal-700 relative">
                <img
                  src={tileImage}
                  alt={layer.name}
                  className="w-full h-full object-cover"
                />
                {isSelected && (
                  <div className="absolute inset-0 bg-gold/20 flex items-center justify-center">
                    <span className="w-5 h-5 rounded-full bg-gold text-charcoal-950 flex items-center justify-center">
                      <Edit3 className="w-3 h-3" />
                    </span>
                  </div>
                )}
              </div>

              {/* Tile Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold truncate">
                    Tile #{index + 1}
                  </span>
                  {isSelected && (
                    <span className="text-[10px] font-semibold text-green-600 dark:text-green-400">
                      Editing
                    </span>
                  )}
                </div>
                <h4 className="text-xs font-bold text-charcoal-900 dark:text-white truncate">
                  {layer.name}
                </h4>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">
                  {layer.finish || 'Polished'}
                </p>
              </div>

              {/* Remove button if more than 1 tile */}
              {tileLayers.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveLayer(index);
                  }}
                  title="Remove Tile"
                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TileLayersBar;
