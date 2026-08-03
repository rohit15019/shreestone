import React from 'react';
import { useRoom360 } from '../../../context/Room360Context';
import { ArrowLeftRight, X, Sparkles, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const CompareSlider = () => {
  const {
    isCompareMode,
    setIsCompareMode,
    compareTileA,
    setCompareTileA,
    compareTileB,
    setCompareTileB,
    compareSliderPos,
    setCompareSliderPos,
    selectedTileFloor
  } = useRoom360();

  if (!isCompareMode) return null;

  const handleSliderChange = (e) => {
    setCompareSliderPos(Number(e.target.value));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="absolute top-4 left-1/2 -translate-x-1/2 z-30 w-11/12 max-w-2xl bg-charcoal-900/90 backdrop-blur-xl border border-gold/40 rounded-2xl p-4 shadow-2xl text-white"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
          <h4 className="font-display font-bold text-sm uppercase tracking-wider text-gold">
            360° Split-Screen Slab Comparison
          </h4>
        </div>
        <button
          onClick={() => setIsCompareMode(false)}
          className="p-1 rounded-full hover:bg-white/10 text-gray-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Comparison Header Tiles */}
      <div className="grid grid-cols-2 gap-4 items-center">
        {/* Tile A (Left) */}
        <div className="flex items-center gap-2.5 p-2 rounded-xl bg-charcoal-800 border border-charcoal-700">
          <img
            src={compareTileA?.images?.[0] || ''}
            alt={compareTileA?.name || 'Tile A'}
            className="w-10 h-10 rounded-lg object-cover border border-gold/30"
          />
          <div className="overflow-hidden">
            <span className="text-[10px] uppercase font-bold text-gold block">
              Left (Tile A)
            </span>
            <p className="font-bold text-xs truncate">
              {compareTileA?.name || 'Statuario Imperial Gold'}
            </p>
            <span className="text-[11px] text-gray-400 block">
              ₹{compareTileA?.pricePerSqFt || 185}/sq.ft
            </span>
          </div>
        </div>

        {/* Tile B (Right) */}
        <div className="flex items-center gap-2.5 p-2 rounded-xl bg-charcoal-800 border border-charcoal-700">
          <img
            src={compareTileB?.images?.[0] || ''}
            alt={compareTileB?.name || 'Tile B'}
            className="w-10 h-10 rounded-lg object-cover border border-gold/30"
          />
          <div className="overflow-hidden">
            <span className="text-[10px] uppercase font-bold text-sky-400 block">
              Right (Tile B) - Click in Sidebar to change
            </span>
            <p className="font-bold text-xs truncate">
              {compareTileB?.name || 'Armani Gris Velvet'}
            </p>
            <span className="text-[11px] text-gray-400 block">
              ₹{compareTileB?.pricePerSqFt || 165}/sq.ft
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Range Slider Control */}
      <div className="mt-4 flex items-center gap-3">
        <span className="text-xs font-bold text-gold">0% (All B)</span>
        <input
          type="range"
          min="0"
          max="100"
          value={compareSliderPos}
          onChange={handleSliderChange}
          className="flex-1 accent-gold h-2 bg-charcoal-700 rounded-lg cursor-pointer"
        />
        <span className="text-xs font-bold text-sky-400">100% (All A)</span>
      </div>
      <p className="text-center text-[11px] text-gray-400 mt-1">
        Currently showing {compareSliderPos}% Tile A on the floor & {100 - compareSliderPos}% Tile B.
      </p>
    </motion.div>
  );
};

export default CompareSlider;
