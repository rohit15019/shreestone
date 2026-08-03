import React from 'react';
import { 
  ZoomIn, ZoomOut, RotateCcw, RefreshCw, Layers, 
  MoveHorizontal, MoveVertical, Grid, Sliders, Sparkles, LayoutGrid, ShoppingCart, Plus 
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

/**
 * VisualizerControls Component
 * STEP 4: Provide editing controls that update instantly:
 * - Zoom In / Zoom Out / Reset
 * - Change Tile & "+ Add Tile" button for multi-tile editing
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
  tileLayers = [],
  activeLayerIndex = 0,
  settings,
  onChangeSetting,
  onReset,
  onZoomIn,
  onZoomOut,
  onChangeTile,
  onOpenAddModal,
  onApplyFloorPreset
}) => {
  const { addToCart } = useCart();
  const currentTile = tileLayers[activeLayerIndex] || selectedTile;

  return (
    <div className="bg-white dark:bg-charcoal-800 rounded-3xl p-6 border border-gray-200/80 dark:border-charcoal-700 shadow-card space-y-6">
      {/* Top Header & Quick Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-charcoal-700">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-gold block">
            STEP 4 • Surface Calibration
          </span>
          <h3 className="font-display font-bold text-xl text-charcoal-900 dark:text-white flex items-center gap-2">
            <span>Floor Texture Controls</span>
            {currentTile && (
              <span className="text-xs px-2.5 py-1 rounded-full bg-gold/15 text-gold font-semibold">
                Editing: {currentTile.name}
              </span>
            )}
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

          {/* "+ Add Tile" Button */}
          <button
            onClick={onOpenAddModal}
            className="px-4 py-2 rounded-xl bg-gold/15 hover:bg-gold/25 text-gold border border-gold/30 font-bold text-xs transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-gold" />
            <span>+ Add Tile</span>
          </button>

          {currentTile && (
            <button
              onClick={() => addToCart(currentTile, 100)}
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
            Standard Floor
          </button>
          <button
            onClick={() => onApplyFloorPreset && onApplyFloorPreset('wide')}
            className="py-2 px-3 rounded-xl bg-gray-100 dark:bg-charcoal-900 hover:bg-gold/15 hover:text-gold text-charcoal-800 dark:text-gray-200 text-xs font-semibold transition-all border border-transparent hover:border-gold/30 text-center"
          >
            Wide Angle Hall
          </button>
          <button
            onClick={() => onApplyFloorPreset && onApplyFloorPreset('corridor')}
            className="py-2 px-3 rounded-xl bg-gray-100 dark:bg-charcoal-900 hover:bg-gold/15 hover:text-gold text-charcoal-800 dark:text-gray-200 text-xs font-semibold transition-all border border-transparent hover:border-gold/30 text-center"
          >
            Long Corridor
          </button>
          <button
            onClick={() => onApplyFloorPreset && onApplyFloorPreset('flat')}
            className="py-2 px-3 rounded-xl bg-gray-100 dark:bg-charcoal-900 hover:bg-gold/15 hover:text-gold text-charcoal-800 dark:text-gray-200 text-xs font-semibold transition-all border border-transparent hover:border-gold/30 text-center"
          >
            Full Top-Down
          </button>
        </div>
      </div>

      {/* Main Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 1. Texture Scale & Zoom */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-charcoal-700 dark:text-gray-300">Tile Scale / Size</span>
            <span className="text-gold">{settings.scale}x ({Math.round(160 * settings.scale)}px)</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="3.0"
            step="0.1"
            value={settings.scale}
            onChange={(e) => onChangeSetting('scale', parseFloat(e.target.value))}
            className="w-full accent-gold bg-gray-200 dark:bg-charcoal-700 h-2 rounded-lg cursor-pointer"
          />
          <p className="text-[10px] text-gray-400">
            Adjust pattern scale for 2x2, 4x4 or large slab look.
          </p>
        </div>

        {/* 2. Rotation Angle */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-charcoal-700 dark:text-gray-300">Rotation Angle</span>
            <span className="text-gold">{settings.rotation}°</span>
          </div>
          <input
            type="range"
            min="0"
            max="360"
            step="5"
            value={settings.rotation}
            onChange={(e) => onChangeSetting('rotation', parseInt(e.target.value))}
            className="w-full accent-gold bg-gray-200 dark:bg-charcoal-700 h-2 rounded-lg cursor-pointer"
          />
          <p className="text-[10px] text-gray-400">
            Rotate texture for diagonal or herringbone tile layout.
          </p>
        </div>

        {/* 3. Surface Opacity */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-charcoal-700 dark:text-gray-300">Surface Blend (Opacity)</span>
            <span className="text-gold">{settings.opacity}%</span>
          </div>
          <input
            type="range"
            min="30"
            max="100"
            step="5"
            value={settings.opacity}
            onChange={(e) => onChangeSetting('opacity', parseInt(e.target.value))}
            className="w-full accent-gold bg-gray-200 dark:bg-charcoal-700 h-2 rounded-lg cursor-pointer"
          />
          <p className="text-[10px] text-gray-400">
            Blend tile glaze seamlessly with natural room lighting.
          </p>
        </div>

        {/* 4. Grout & Grid Size */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-charcoal-700 dark:text-gray-300">Grout Line Grid</span>
            <span className="text-gold">{settings.gridSize}px</span>
          </div>
          <input
            type="range"
            min="30"
            max="120"
            step="5"
            value={settings.gridSize}
            onChange={(e) => onChangeSetting('gridSize', parseInt(e.target.value))}
            className="w-full accent-gold bg-gray-200 dark:bg-charcoal-700 h-2 rounded-lg cursor-pointer"
          />
          <p className="text-[10px] text-gray-400">
            Control density of joint lines between tiles.
          </p>
        </div>

        {/* 5. Horizontal Shift */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-charcoal-700 dark:text-gray-300">Horizontal Alignment</span>
            <span className="text-gold">{Math.round(settings.offsetX || 0)}px</span>
          </div>
          <input
            type="range"
            min="-300"
            max="300"
            step="10"
            value={settings.offsetX || 0}
            onChange={(e) => onChangeSetting('offsetX', parseInt(e.target.value))}
            className="w-full accent-gold bg-gray-200 dark:bg-charcoal-700 h-2 rounded-lg cursor-pointer"
          />
          <p className="text-[10px] text-gray-400">
            Shift pattern left or right to align with room walls.
          </p>
        </div>

        {/* 6. Vertical Shift */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-charcoal-700 dark:text-gray-300">Vertical Alignment</span>
            <span className="text-gold">{Math.round(settings.offsetY || 0)}px</span>
          </div>
          <input
            type="range"
            min="-300"
            max="300"
            step="10"
            value={settings.offsetY || 0}
            onChange={(e) => onChangeSetting('offsetY', parseInt(e.target.value))}
            className="w-full accent-gold bg-gray-200 dark:bg-charcoal-700 h-2 rounded-lg cursor-pointer"
          />
          <p className="text-[10px] text-gray-400">
            Shift pattern forward or backward on the floor plane.
          </p>
        </div>
      </div>

      {/* NEW: Smart Horizon & Perspective Alignment Drawer Section */}
      <div className="pt-4 border-t border-gray-100 dark:border-charcoal-700 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-display font-bold text-charcoal-900 dark:text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-gold" />
            <span>Smart Floor Boundary & Perspective Calibration</span>
          </h4>
          <span className="text-[11px] text-gold bg-gold/10 px-2.5 py-0.5 rounded-full font-semibold">
            Prevents tiles on walls
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Floor Horizon (Top Y) */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-charcoal-700 dark:text-gray-300">Floor Horizon Line (Top Y)</span>
              <span className="text-gold">{settings.floorTopY ?? 65}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="85"
              step="1"
              value={settings.floorTopY ?? 65}
              onChange={(e) => onChangeSetting('floorTopY', parseInt(e.target.value))}
              className="w-full accent-gold bg-gray-200 dark:bg-charcoal-700 h-2 rounded-lg cursor-pointer"
            />
            <p className="text-[10px] text-gray-400">
              Set where the floor starts so tiles never climb furniture or walls.
            </p>
          </div>

          {/* Horizon Width (Top Width) */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-charcoal-700 dark:text-gray-300">Perspective Horizon Width</span>
              <span className="text-gold">{settings.floorTopWidth ?? 45}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="1"
              value={settings.floorTopWidth ?? 45}
              onChange={(e) => onChangeSetting('floorTopWidth', parseInt(e.target.value))}
              className="w-full accent-gold bg-gray-200 dark:bg-charcoal-700 h-2 rounded-lg cursor-pointer"
            />
            <p className="text-[10px] text-gray-400">
              Width of floor at the far wall horizon (creates realistic trapezoid).
            </p>
          </div>

          {/* Perspective 3D Depth */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-charcoal-700 dark:text-gray-300">3D Foreshortening Depth</span>
              <span className="text-gold">{settings.perspectiveDepth ?? 75}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={settings.perspectiveDepth ?? 75}
              onChange={(e) => onChangeSetting('perspectiveDepth', parseInt(e.target.value))}
              className="w-full accent-gold bg-gray-200 dark:bg-charcoal-700 h-2 rounded-lg cursor-pointer"
            />
            <p className="text-[10px] text-gray-400">
              Makes distant tiles appear smaller than foreground tiles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualizerControls;
