import React, { useState } from 'react';
import { Sparkles, Layers, ShieldCheck, Award, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { tilesData } from '../data/tilesData';
import RoomUploader from '../components/visualizer/RoomUploader';
import TileSelectorDrawer from '../components/visualizer/TileSelectorDrawer';
import VisualizerControls from '../components/visualizer/VisualizerControls';
import CanvasFloorRenderer from '../components/visualizer/CanvasFloorRenderer';
import SplitScreenComparison from '../components/visualizer/SplitScreenComparison';
import TileLayersBar from '../components/visualizer/TileLayersBar';
import AddTileModal from '../components/visualizer/AddTileModal';

/**
 * TileVisualizerPage Component
 * New feature page at /tile-visualizer
 * Combines Steps 1 - 7:
 * STEP 1: Room Image Uploader (JPG, PNG, WEBP, browser memory only)
 * STEP 2: Tile Selector from existing product catalog & Custom Tile Upload
 * STEP 3: Client-side HTML5 Canvas + Perspective floor overlay with Multi-Tile Support
 * STEP 4: Real-time Editing Controls & Sliders + "+ Add Tile" button for Checkered/Border combinations
 * STEP 5: Before / After Split Screen Comparison
 * STEP 6: Download PNG Image export
 * STEP 7: Responsive Luxury Design (Desktop, Tablet, Mobile)
 */
const DEFAULT_SETTINGS = {
  scale: 1,
  rotation: 0,
  opacity: 85,
  gridSize: 60,
  offsetX: 0,
  offsetY: 0,
  // Smart Floor Boundary & Perspective Alignment Controls
  floorTopY: 65,        // % from top where floor horizon starts (prevents tiles on walls)
  floorBottomY: 99,     // % where floor ends at bottom
  floorTopWidth: 45,    // % width of floor at horizon (creates perspective trapezoid)
  floorBottomWidth: 96, // % width of floor at bottom of image
  floorShiftX: 0,       // % horizontal shift of entire floor boundary box (-50 to 50)
  perspectiveDepth: 75  // % 3D perspective foreshortening intensity
};

const DEFAULT_ROOM_IMAGE = {
  id: 'preset_living',
  name: 'Luxury Villa Lounge',
  url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
  tag: 'Living Room'
};

const TileVisualizerPage = () => {
  // Step 1: Uploaded or preset room photo state (defaulting to preset living room so canvas is never empty)
  const [roomImage, setRoomImage] = useState(DEFAULT_ROOM_IMAGE);

  // Default single selected tile fallback
  const [selectedTile, setSelectedTile] = useState(tilesData[0] || null);

  // NEW: Multi-Tile Layers State ("make one tile image and after uploading image customer can edit and add more tile by clicking add tile button")
  const [tileLayers, setTileLayers] = useState([tilesData[0] || null]);
  const [activeLayerIndex, setActiveLayerIndex] = useState(0);
  const [layoutPattern, setLayoutPattern] = useState('single'); // 'single' | 'checkered' | 'border' | 'split'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Step 4: Interactive transformation settings
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  // Active view tab for mobile/tablet convenience
  const [activeTab, setActiveTab] = useState('visualize'); // 'visualize' | 'library' | 'compare'

  const handleChangeSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  const handleZoomIn = () => {
    setSettings(prev => ({ ...prev, scale: Math.min(4, Number((prev.scale + 0.2).toFixed(1))) }));
  };

  const handleZoomOut = () => {
    setSettings(prev => ({ ...prev, scale: Math.max(0.5, Number((prev.scale - 0.2).toFixed(1))) }));
  };

  const handleChangeTile = () => {
    setActiveTab('library');
    const libraryEl = document.getElementById('texture-library-section');
    if (libraryEl) {
      libraryEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Add a new tile layer to the room visualization
  const handleAddTile = (newTile) => {
    setTileLayers(prev => {
      const updated = [...prev, newTile];
      // Automatically switch to 'checkered' pattern when adding a 2nd tile to show multi-tile combination
      if (updated.length === 2) {
        setLayoutPattern('checkered');
      }
      return updated;
    });
    setActiveLayerIndex(tileLayers.length);
    setSelectedTile(newTile);
  };

  // Remove a tile layer from the visualization
  const handleRemoveTile = (indexToRemove) => {
    if (tileLayers.length <= 1) return; // Keep at least 1 tile
    setTileLayers(prev => prev.filter((_, idx) => idx !== indexToRemove));
    if (activeLayerIndex >= indexToRemove && activeLayerIndex > 0) {
      setActiveLayerIndex(prev => prev - 1);
    }
    if (tileLayers.length - 1 === 1) {
      setLayoutPattern('single');
    }
  };

  // Select which tile layer is being actively edited
  const handleSelectLayer = (index) => {
    setActiveLayerIndex(index);
    if (tileLayers[index]) {
      setSelectedTile(tileLayers[index]);
    }
  };

  // Quick 1-click Floor Shape Presets to align floor tiles instantly
  const handleApplyFloorPreset = (presetType) => {
    if (presetType === 'standard') {
      setSettings(prev => ({
        ...prev,
        floorTopY: 65,
        floorBottomY: 99,
        floorTopWidth: 45,
        floorBottomWidth: 96,
        floorShiftX: 0,
        perspectiveDepth: 75
      }));
    } else if (presetType === 'wide') {
      setSettings(prev => ({
        ...prev,
        floorTopY: 55,
        floorBottomY: 99,
        floorTopWidth: 65,
        floorBottomWidth: 100,
        floorShiftX: 0,
        perspectiveDepth: 85
      }));
    } else if (presetType === 'corridor') {
      setSettings(prev => ({
        ...prev,
        floorTopY: 70,
        floorBottomY: 99,
        floorTopWidth: 25,
        floorBottomWidth: 80,
        floorShiftX: 0,
        perspectiveDepth: 95
      }));
    } else if (presetType === 'full' || presetType === 'flat') {
      setSettings(prev => ({
        ...prev,
        floorTopY: 0,
        floorBottomY: 100,
        floorTopWidth: 100,
        floorBottomWidth: 100,
        floorShiftX: 0,
        perspectiveDepth: 0
      }));
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-24 bg-marble-light dark:bg-charcoal-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Header Banner */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs font-semibold tracking-wider uppercase mb-3 backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>100% Client-Side • Zero Server Uploads • Multi-Tile Layouts</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-display font-extrabold text-charcoal-900 dark:text-white"
          >
            AI Architectural Tile Visualizer
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-gray-600 dark:text-gray-400 mt-2"
          >
            Upload any room photo and instantly render Italian Carrara marble, vitrified slabs, or outdoor pavers. Click "+ Add Tile" to combine multiple tiles in checkered grids, borders, and custom layouts.
          </motion.p>
        </div>

        {/* STEP 1: Room Photo Upload & Preset Room Workspace */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold">
              STEP 1 • Upload Room Photo (JPG, PNG, WEBP)
            </span>
          </div>

          <RoomUploader
            currentImage={roomImage}
            onImageSelect={(img) => setRoomImage(img)}
            onRemoveImage={() => setRoomImage(null)}
          />
        </section>

        {/* STEP 3, 4, 6: Main Canvas Floor Renderer & Interactive Controls */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Top: Active Tile Layers Bar & Perspective Canvas Renderer (7 cols on desktop) */}
          <div className="lg:col-span-7 space-y-6">
            <TileLayersBar
              tileLayers={tileLayers}
              activeLayerIndex={activeLayerIndex}
              layoutPattern={layoutPattern}
              onSelectLayer={handleSelectLayer}
              onRemoveLayer={handleRemoveTile}
              onChangePattern={setLayoutPattern}
              onOpenAddModal={() => setIsAddModalOpen(true)}
            />

            <CanvasFloorRenderer
              roomImage={roomImage}
              selectedTile={tileLayers[activeLayerIndex] || selectedTile}
              tileLayers={tileLayers}
              activeLayerIndex={activeLayerIndex}
              layoutPattern={layoutPattern}
              settings={settings}
              onChangeSetting={handleChangeSetting}
            />
          </div>

          {/* Right / Bottom: Real-Time Sliders & Controls (5 cols on desktop) */}
          <div className="lg:col-span-5 space-y-6">
            <VisualizerControls
              selectedTile={tileLayers[activeLayerIndex] || selectedTile}
              tileLayers={tileLayers}
              activeLayerIndex={activeLayerIndex}
              layoutPattern={layoutPattern}
              onChangePattern={setLayoutPattern}
              settings={settings}
              onChangeSetting={handleChangeSetting}
              onReset={handleReset}
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              onChangeTile={handleChangeTile}
              onOpenAddModal={() => setIsAddModalOpen(true)}
              onApplyFloorPreset={handleApplyFloorPreset}
            />
          </div>
        </section>

        {/* STEP 5: Before / After Split Screen Comparison */}
        <section className="space-y-4">
          <SplitScreenComparison
            roomImage={roomImage}
            selectedTile={tileLayers[activeLayerIndex] || selectedTile}
            settings={settings}
          />
        </section>

        {/* STEP 2: Product Data Texture Library (Clicking selects tile instantly) */}
        <section id="texture-library-section" className="space-y-4">
          <TileSelectorDrawer
            selectedTile={tileLayers[activeLayerIndex] || selectedTile}
            onSelectTile={(tile) => {
              setSelectedTile(tile);
              setTileLayers(prev => {
                const updated = [...prev];
                if (updated[activeLayerIndex]) {
                  updated[activeLayerIndex] = tile;
                } else {
                  updated[0] = tile;
                }
                return updated;
              });
              window.scrollTo({ top: 400, behavior: 'smooth' });
            }}
          />
        </section>

        {/* Trust & Privacy Guarantee Banner */}
        <div className="p-8 rounded-3xl bg-charcoal-950 text-white border border-charcoal-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gold/15 text-gold flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-lg text-white">
                100% Client-Side Privacy Guarantee
              </h4>
              <p className="text-xs text-gray-400">
                Your private home and room photos are processed exclusively inside your device browser memory. Nothing is ever uploaded to external servers.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-charcoal-900 border border-charcoal-800 text-xs text-gray-300 flex items-center gap-2">
              <Award className="w-4 h-4 text-gold" />
              <span>Full HD Perspective Export</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add Tile Modal for Multi-Tile Layouts */}
      <AddTileModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddTile={handleAddTile}
      />
    </div>
  );
};

export default TileVisualizerPage;
