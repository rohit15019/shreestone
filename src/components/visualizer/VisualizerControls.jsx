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
  onApplyFloorPreset,
  layoutPattern = 'single',
  onChangePattern
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

      {/* One-Click Smart Floor Shape Presets & Multi-Tile Layout Mode */}
      <div className="space-y-4 pb-4 border-b border-gray-100 dark:border-charcoal-700">
        <div className="space-y-2">
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

        {onChangePattern && (
          <div className="space-y-2 pt-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 dark:text-gray-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Multi-Tile Combination Pattern</span>
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => onChangePattern('single')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all border text-center ${
                  layoutPattern === 'single'
                    ? 'bg-gold/20 text-gold border-gold font-bold'
                    : 'bg-gray-100 dark:bg-charcoal-900 text-charcoal-800 dark:text-gray-300 border-transparent hover:border-gold/30'
                }`}
              >
                Single Tile
              </button>
              <button
                onClick={() => onChangePattern('checkered')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all border text-center ${
                  layoutPattern === 'checkered'
                    ? 'bg-gold/20 text-gold border-gold font-bold'
                    : 'bg-gray-100 dark:bg-charcoal-900 text-charcoal-800 dark:text-gray-300 border-transparent hover:border-gold/30'
                }`}
              >
                Checkered Grid
              </button>
              <button
                onClick={() => onChangePattern('border')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all border text-center ${
                  layoutPattern === 'border'
                    ? 'bg-gold/20 text-gold border-gold font-bold'
                    : 'bg-gray-100 dark:bg-charcoal-900 text-charcoal-800 dark:text-gray-300 border-transparent hover:border-gold/30'
                }`}
              >
                Border Frame
              </button>
              <button
                onClick={() => onChangePattern('split')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all border text-center ${
                  layoutPattern === 'split'
                    ? 'bg-gold/20 text-gold border-gold font-bold'
                    : 'bg-gray-100 dark:bg-charcoal-900 text-charcoal-800 dark:text-gray-300 border-transparent hover:border-gold/30'
                }`}
              >
                Split Room
              </button>
            </div>
          </div>
        )}
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
              min="0"
              max="100"
              step="1"
              value={settings.floorTopY ?? 65}
              onChange={(e) => onChangeSetting('floorTopY', parseInt(e.target.value))}
              className="w-full accent-gold bg-gray-200 dark:bg-charcoal-700 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Horizon Width (Top Width) */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-charcoal-700 dark:text-gray-300">Top Horizon Width</span>
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
          </div>

          {/* Bottom Floor Width */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-charcoal-700 dark:text-gray-300">Bottom Floor Width</span>
              <span className="text-gold">{settings.floorBottomWidth ?? 96}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="1"
              value={settings.floorBottomWidth ?? 96}
              onChange={(e) => onChangeSetting('floorBottomWidth', parseInt(e.target.value))}
              className="w-full accent-gold bg-gray-200 dark:bg-charcoal-700 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Floor Bottom (Bottom Y) */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-charcoal-700 dark:text-gray-300">Floor Bottom Line (Bottom Y)</span>
              <span className="text-gold">{settings.floorBottomY ?? 99}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="1"
              value={settings.floorBottomY ?? 99}
              onChange={(e) => onChangeSetting('floorBottomY', parseInt(e.target.value))}
              className="w-full accent-gold bg-gray-200 dark:bg-charcoal-700 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Floor Left/Right Shift */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-charcoal-700 dark:text-gray-300">Floor Left/Right Shift</span>
              <span className="text-gold">{settings.floorShiftX ?? 0}%</span>
            </div>
            <input
              type="range"
              min="-50"
              max="50"
              step="1"
              value={settings.floorShiftX ?? 0}
              onChange={(e) => onChangeSetting('floorShiftX', parseInt(e.target.value))}
              className="w-full accent-gold bg-gray-200 dark:bg-charcoal-700 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Perspective 3D Depth */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-charcoal-700 dark:text-gray-300">3D Perspective Depth</span>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualizerControls;
