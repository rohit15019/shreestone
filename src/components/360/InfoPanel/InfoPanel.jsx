import React from 'react';
import { useRoom360 } from '../../../context/Room360Context';
import { Layers, Sparkles, CheckCircle2, DollarSign, Calculator } from 'lucide-react';

const InfoPanel = ({ onOpenMeasurement }) => {
  const { selectedTileFloor, selectedTileWall, applyTarget } = useRoom360();

  const showFloor = applyTarget === 'floor' || applyTarget === 'both';
  const showWall = applyTarget === 'wall' || applyTarget === 'both';

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 bg-white/90 dark:bg-charcoal-900/90 backdrop-blur-xl px-4 py-3 rounded-2xl border border-gray-200/80 dark:border-charcoal-700 shadow-card text-xs">
      {/* Floor Tile Info */}
      {showFloor && selectedTileFloor && (
        <div className="flex items-center gap-3 border-r border-gray-200 dark:border-charcoal-700 pr-4 last:border-r-0 last:pr-0">
          <img
            src={selectedTileFloor.images?.[0] || ''}
            alt={selectedTileFloor.name}
            className="w-10 h-10 rounded-lg object-cover border border-gray-200 dark:border-charcoal-700"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-bold text-gray-400">Floor Tile</span>
              <span className="flex items-center gap-0.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                <CheckCircle2 className="w-2.5 h-2.5" />
                {selectedTileFloor.availability || 'In Stock'}
              </span>
            </div>
            <p className="font-display font-bold text-charcoal-900 dark:text-white truncate max-w-[140px]">
              {selectedTileFloor.name}
            </p>
            <div className="flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400">
              <span>{selectedTileFloor.size}</span>
              <span>•</span>
              <span>{selectedTileFloor.finish}</span>
              <span>•</span>
              <span className="font-bold text-gold">₹{selectedTileFloor.pricePerSqFt}/sq.ft</span>
            </div>
          </div>
        </div>
      )}

      {/* Wall Tile Info */}
      {showWall && selectedTileWall && (
        <div className="flex items-center gap-3 border-r border-gray-200 dark:border-charcoal-700 pr-4 last:border-r-0 last:pr-0">
          <img
            src={selectedTileWall.images?.[0] || ''}
            alt={selectedTileWall.name}
            className="w-10 h-10 rounded-lg object-cover border border-gray-200 dark:border-charcoal-700"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-bold text-gray-400">Wall Tile</span>
              <span className="flex items-center gap-0.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                <CheckCircle2 className="w-2.5 h-2.5" />
                {selectedTileWall.availability || 'In Stock'}
              </span>
            </div>
            <p className="font-display font-bold text-charcoal-900 dark:text-white truncate max-w-[140px]">
              {selectedTileWall.name}
            </p>
            <div className="flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400">
              <span>{selectedTileWall.size}</span>
              <span>•</span>
              <span>{selectedTileWall.finish}</span>
              <span>•</span>
              <span className="font-bold text-gold">₹{selectedTileWall.pricePerSqFt}/sq.ft</span>
            </div>
          </div>
        </div>
      )}

      {/* Measurement Calculator Trigger Button */}
      <button
        onClick={onOpenMeasurement}
        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gold text-charcoal-950 font-bold hover:bg-gold-light transition-all duration-200 shadow-sm"
      >
        <Calculator className="w-4 h-4" />
        <span>Estimate Tiles & Cost</span>
      </button>
    </div>
  );
};

export default InfoPanel;
