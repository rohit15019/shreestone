import React from 'react';
import { 
  ZoomIn, ZoomOut, RotateCcw, RefreshCw, Layers, 
  MoveHorizontal, MoveVertical, Grid, Sliders, Sparkles, LayoutGrid, ShoppingCart 
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

/**
 * VisualizerControls Component
 * STEP 4: Provide editing controls that update instantly:
 * - Zoom In / Zoom Out / Reset
 * - Change Tile
 * - Add Selected Tile to Cart
 * - Opacity Slider
 * - Tile Scale Slider
 * - Rotation Slider
 * - Grid Size Slider
 * - Horizontal & Vertical Offset Sliders
 * - Smart Floor Horizon & Perspective Calibration Sliders + One-Click Shape Presets
 */
const VisualizerControls = ({
  selectedTile,
  settings,
  onChangeSetting,
  onReset,
  onZoomIn,
  onZoomOut,
  onChangeTile,
  onApplyFloorPreset
}) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white dark:bg-charcoal-800 rounded-3xl p-6 border border-gray-200/80 dark:border-charcoal-700 shadow-card space-y-6">
      {/* Top Header & Quick Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-charcoal-700">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-gold block">
            STEP 4 • Surface Calibration
          </span>
          <h3 className="font-display font-bold text-xl text-charcoal-900 dark:text-white">
            Floor Texture Controls
          </h3>
        </div>

        {/* Action Button Group */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onZoomIn}
            title="Zoom In"
            className="p-2.5 rounded-xl bg-gray-100 dark:bg-charcoal-900 text-charcoal-800 dark:text-gray-200 hover:bg-gold/15 hover:text-gold transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={onZoomOut}
            title="Zoom Out"
            className="p-2.5 rounded-xl bg-gray-100 dark:bg-charcoal-900 text-charcoal-800 dark:text-gray-200 hover:bg-gold/15 hover:text-gold transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={onReset}
            title="Reset to Default"
            className="px-3.5 py-2 rounded-xl bg-gray-100 dark:bg-charcoal-900 text-charcoal-800 dark:text-gray-200 hover:bg-gold/15 hover:text-gold text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          <button
            onClick={onChangeTile}
            className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-charcoal-900 hover:bg-gold/15 hover:text-gold text-charcoal-800 dark:text-gray-200 font-bold text-xs transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Change Tile</span>
          </button>
          {selectedTile && (
            <button
              onClick={() => addToCart(selectedTile, 100)}
              title="Add this tile to Cart (100 sq.ft)"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-gold-amber via-gold to-gold-light text-charcoal-950 font-bold text-xs shadow-md hover:scale-105 transition-transform flex items-center gap-1.5"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>+ Add to Cart</span>
            </button>
          )}
        </div>
      </div>

      {/* One-Click Smart Floor Shape Presets */}
      <div className="space-y-2 pb-4 border-b border-gray-100 dark:border-charcoal-700">
        <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 dark:text-gray-300 flex items-center gap-1.5">
          <LayoutGrid className="w-3.5 h-3.5 text-gold" />
          <span>Quick Floor Alignment Presets</span>
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            onClick={() => onApplyFloorPreset && onApplyFloorPreset('standard')}
            className="py-2 px-3 rounded-xl bg-gray-100 dark:bg-charcoal-900 hover:bg-gold/15 hover:text-gold text-charcoal-800 dark:text-gray-200 text-xs font-semibold transition-all border border-transparent hover:border-gold/30 text-center"
          >
            Standard Room
          </button>
          <button
            onClick={() => onApplyFloorPreset && onApplyFloorPreset('wide')}
            className="py-2 px-3 rounded-xl bg-gray-100 dark:bg-charcoal-900 hover:bg-gold/15 hover:text-gold text-charcoal-800 dark:text-gray-200 text-xs font-semibold transition-all border border-transparent hover:border-gold/30 text-center"
          >
            Wide Living Area
          </button>
          <button
            onClick={() => onApplyFloorPreset && onApplyFloorPreset('corridor')}
            className="py-2 px-3 rounded-xl bg-gray-100 dark:bg-charcoal-900 hover:bg-gold/15 hover:text-gold text-charcoal-800 dark:text-gray-200 text-xs font-semibold transition-all border border-transparent hover:border-gold/30 text-center"
          >
            Hallway / Corridor
          </button>
          <button
            onClick={() => onApplyFloorPreset && onApplyFloorPreset('full')}
            className="py-2 px-3 rounded-xl bg-gray-100 dark:bg-charcoal-900 hover:bg-gold/15 hover:text-gold text-charcoal-800 dark:text-gray-200 text-xs font-semibold transition-all border border-transparent hover:border-gold/30 text-center"
          >
            100% Full Surface
          </button>
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Floor Horizon (Top Y %) — Prevents tiles overflowing onto walls */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-charcoal-700 dark:text-gray-300 uppercase tracking-wider">
              Floor Horizon (Top Y)
            </span>
            <span className="text-gold font-bold">{settings.floorTopY ?? 65}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={settings.floorTopY ?? 65}
            onChange={(e) => onChangeSetting('floorTopY', Number(e.target.value))}
            className="w-full accent-gold bg-gray-200 dark:bg-charcoal-900 h-2 rounded-lg cursor-pointer"
          />
        </div>

        {/* Floor Horizon Width (%) — Aligns side walls trapezoid top width */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-charcoal-700 dark:text-gray-300 uppercase tracking-wider">
              Top Horizon Width
            </span>
            <span className="text-gold font-bold">{settings.floorTopWidth ?? 45}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={settings.floorTopWidth ?? 45}
            onChange={(e) => onChangeSetting('floorTopWidth', Number(e.target.value))}
            className="w-full accent-gold bg-gray-200 dark:bg-charcoal-900 h-2 rounded-lg cursor-pointer"
          />
        </div>

        {/* Floor Bottom Width (%) — Aligns side walls trapezoid bottom width */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-charcoal-700 dark:text-gray-300 uppercase tracking-wider">
              Bottom Floor Width
            </span>
            <span className="text-gold font-bold">{settings.floorBottomWidth ?? 96}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={settings.floorBottomWidth ?? 96}
            onChange={(e) => onChangeSetting('floorBottomWidth', Number(e.target.value))}
            className="w-full accent-gold bg-gray-200 dark:bg-charcoal-900 h-2 rounded-lg cursor-pointer"
          />
        </div>

        {/* Perspective Depth (%) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-charcoal-700 dark:text-gray-300 uppercase tracking-wider">
              3D Perspective Depth
            </span>
            <span className="text-gold font-bold">{settings.perspectiveDepth ?? 75}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={settings.perspectiveDepth ?? 75}
            onChange={(e) => onChangeSetting('perspectiveDepth', Number(e.target.value))}
            className="w-full accent-gold bg-gray-200 dark:bg-charcoal-900 h-2 rounded-lg cursor-pointer"
          />
        </div>

        {/* Opacity Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-charcoal-700 dark:text-gray-300 uppercase tracking-wider">
              Opacity
            </span>
            <span className="text-gold font-bold">{settings.opacity}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={settings.opacity}
            onChange={(e) => onChangeSetting('opacity', Number(e.target.value))}
            className="w-full accent-gold bg-gray-200 dark:bg-charcoal-900 h-2 rounded-lg cursor-pointer"
          />
        </div>

        {/* Tile Scale Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-charcoal-700 dark:text-gray-300 uppercase tracking-wider">
              Tile Scale
            </span>
            <span className="text-gold font-bold">{settings.scale}x</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="4"
            step="0.1"
            value={settings.scale}
            onChange={(e) => onChangeSetting('scale', Number(e.target.value))}
            className="w-full accent-gold bg-gray-200 dark:bg-charcoal-900 h-2 rounded-lg cursor-pointer"
          />
        </div>

        {/* Rotation Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-charcoal-700 dark:text-gray-300 uppercase tracking-wider">
              Rotation
            </span>
            <span className="text-gold font-bold">{settings.rotation}°</span>
          </div>
          <input
            type="range"
            min="-180"
            max="180"
            value={settings.rotation}
            onChange={(e) => onChangeSetting('rotation', Number(e.target.value))}
            className="w-full accent-gold bg-gray-200 dark:bg-charcoal-900 h-2 rounded-lg cursor-pointer"
          />
        </div>

        {/* Horizontal Offset Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-charcoal-700 dark:text-gray-300 uppercase tracking-wider">
              Horizontal Offset
            </span>
            <span className="text-gold font-bold">{Math.round(settings.offsetX ?? 0)}px</span>
          </div>
          <input
            type="range"
            min="-1500"
            max="1500"
            value={Math.round(settings.offsetX ?? 0)}
            onChange={(e) => onChangeSetting('offsetX', Number(e.target.value))}
            className="w-full accent-gold bg-gray-200 dark:bg-charcoal-900 h-2 rounded-lg cursor-pointer"
          />
        </div>

        {/* Vertical Offset Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-charcoal-700 dark:text-gray-300 uppercase tracking-wider">
              Vertical Offset
            </span>
            <span className="text-gold font-bold">{Math.round(settings.offsetY ?? 0)}px</span>
          </div>
          <input
            type="range"
            min="-1500"
            max="1500"
            value={Math.round(settings.offsetY ?? 0)}
            onChange={(e) => onChangeSetting('offsetY', Number(e.target.value))}
            className="w-full accent-gold bg-gray-200 dark:bg-charcoal-900 h-2 rounded-lg cursor-pointer"
          />
        </div>

        {/* Floor Horizontal Shift (Left / Right Position %) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-charcoal-700 dark:text-gray-300 uppercase tracking-wider">
              Floor Left/Right Shift
            </span>
            <span className="text-gold font-bold">{settings.floorShiftX ?? 0}%</span>
          </div>
          <input
            type="range"
            min="-50"
            max="50"
            value={settings.floorShiftX ?? 0}
            onChange={(e) => onChangeSetting('floorShiftX', Number(e.target.value))}
            className="w-full accent-gold bg-gray-200 dark:bg-charcoal-900 h-2 rounded-lg cursor-pointer"
          />
        </div>

        {/* Floor Bottom (Bottom Y %) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-charcoal-700 dark:text-gray-300 uppercase tracking-wider">
              Floor Bottom (Bottom Y)
            </span>
            <span className="text-gold font-bold">{settings.floorBottomY ?? 99}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={settings.floorBottomY ?? 99}
            onChange={(e) => onChangeSetting('floorBottomY', Number(e.target.value))}
            className="w-full accent-gold bg-gray-200 dark:bg-charcoal-900 h-2 rounded-lg cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default VisualizerControls;
