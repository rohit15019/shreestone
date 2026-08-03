import React from 'react';
import { useRoom360 } from '../../../context/Room360Context';
import { useCart } from '../../../context/CartContext';
import { Calculator, X, ShoppingBag, CheckCircle2, Box, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MeasurementPanel = ({ isOpen, onClose }) => {
  const {
    dimensions,
    setDimensions,
    measurementStats,
    selectedTileFloor,
    selectedTileWall,
    applyTarget
  } = useRoom360();

  const { addToCart } = useCart();

  if (!isOpen) return null;

  const handleAddToCart = () => {
    const tile = applyTarget === 'wall' ? selectedTileWall : selectedTileFloor;
    if (!tile) return;

    addToCart(
      {
        ...tile,
        quantity: measurementStats.boxesRequired,
        selectedApplication: `${applyTarget.toUpperCase()} (${measurementStats.totalCoverageSqFt} sq.ft)`
      },
      measurementStats.boxesRequired
    );
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white dark:bg-charcoal-900 rounded-3xl p-6 border border-gray-200 dark:border-charcoal-700 shadow-2xl max-w-md w-full relative"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-charcoal-700">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-gold/15 text-gold">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-charcoal-900 dark:text-white">
                  360° Room Measurement & Estimator
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Calculate tiles, box quantities & approximate coverage
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-charcoal-800 text-gray-400 hover:text-charcoal-900 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Room Dimensions Form */}
          <div className="py-5 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-700 dark:text-gray-300">
              Enter Your Room Dimensions (Feet)
            </h4>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 dark:text-gray-400 mb-1">
                  Width (ft)
                </label>
                <input
                  type="number"
                  min="4"
                  max="100"
                  value={dimensions.width}
                  onChange={(e) => setDimensions(prev => ({ ...prev, width: Number(e.target.value) || 0 }))}
                  className="w-full bg-gray-50 dark:bg-charcoal-800 text-charcoal-900 dark:text-white border border-gray-200 dark:border-charcoal-700 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-500 dark:text-gray-400 mb-1">
                  Length (ft)
                </label>
                <input
                  type="number"
                  min="4"
                  max="100"
                  value={dimensions.length}
                  onChange={(e) => setDimensions(prev => ({ ...prev, length: Number(e.target.value) || 0 }))}
                  className="w-full bg-gray-50 dark:bg-charcoal-800 text-charcoal-900 dark:text-white border border-gray-200 dark:border-charcoal-700 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-500 dark:text-gray-400 mb-1">
                  Height (ft)
                </label>
                <input
                  type="number"
                  min="6"
                  max="30"
                  value={dimensions.height}
                  onChange={(e) => setDimensions(prev => ({ ...prev, height: Number(e.target.value) || 0 }))}
                  className="w-full bg-gray-50 dark:bg-charcoal-800 text-charcoal-900 dark:text-white border border-gray-200 dark:border-charcoal-700 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-gold"
                />
              </div>
            </div>

            {/* Calculated Results Box */}
            <div className="p-4 rounded-2xl bg-charcoal-900 text-white space-y-3 border border-charcoal-700 shadow-inner mt-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Total Area Coverage:</span>
                <span className="font-bold text-sm text-gold">
                  {measurementStats.totalCoverageSqFt} sq.ft
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Tiles Required:</span>
                <span className="font-bold text-sm">
                  {measurementStats.tilesRequired} Slabs
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Boxes Required:</span>
                <span className="font-bold text-sm text-emerald-400 flex items-center gap-1">
                  <Box className="w-3.5 h-3.5" />
                  {measurementStats.boxesRequired} Boxes
                </span>
              </div>

              <div className="border-t border-charcoal-700 pt-2 flex items-center justify-between">
                <span className="text-xs text-gray-300">Estimated Slab Cost:</span>
                <span className="font-display font-bold text-lg text-gold">
                  ₹{measurementStats.approxCost.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-charcoal-700 text-charcoal-700 dark:text-gray-300 font-semibold text-xs hover:bg-gray-50 dark:hover:bg-charcoal-800 transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleAddToCart}
              className="flex-1 py-2.5 rounded-xl bg-gold text-charcoal-950 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-gold-light transition-colors shadow-gold-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add Boxes to Cart</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default MeasurementPanel;
