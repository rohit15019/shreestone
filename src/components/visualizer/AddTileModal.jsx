import React, { useState } from 'react';
import { X, Sparkles, Upload, Plus, Layers, Check, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { tilesData } from '../../data/tilesData';

const AddTileModal = ({ isOpen, onClose, onAddTile }) => {
  const [activeTab, setActiveTab] = useState('catalog'); // 'catalog' | 'upload'
  const [customName, setCustomName] = useState('');
  const [customImagePreview, setCustomImagePreview] = useState('');

  if (!isOpen) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCustomName(file.name.replace(/\.[^/.]+$/, ''));
    const reader = new FileReader();
    reader.onload = (event) => {
      setCustomImagePreview(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAddCustomTile = (e) => {
    e.preventDefault();
    if (!customImagePreview) return;

    const newTile = {
      id: `custom_${Date.now()}`,
      name: customName || 'Custom Uploaded Tile',
      category: 'Custom Surface',
      finish: 'Custom Texture',
      dimensions: 'Custom Size',
      images: [customImagePreview],
      isCustom: true,
    };

    onAddTile(newTile);
    setCustomImagePreview('');
    setCustomName('');
    onClose();
  };

  const handleSelectCatalogTile = (tile) => {
    onAddTile(tile);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-charcoal-950/80 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 20 }}
          className="relative w-full max-w-4xl glass-card rounded-3xl border border-gold/30 shadow-2xl overflow-hidden bg-charcoal-950 text-white flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-charcoal-800 bg-gradient-to-r from-charcoal-900 to-charcoal-950">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gold/15 text-gold border border-gold/30">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                  Add Tile to Visualization
                  <span className="px-2 py-0.5 rounded-full bg-gold/20 text-gold text-xs font-semibold">
                    Multi-Tile Mode
                  </span>
                </h3>
                <p className="text-xs text-gray-400">
                  Pick another tile to combine in a checkered grid, border frame, or custom accent layout.
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-charcoal-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center border-b border-charcoal-800 px-6 bg-charcoal-900/50">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`py-3 px-4 font-semibold text-xs uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'catalog'
                  ? 'border-gold text-gold'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Shreestone Luxury Catalog ({tilesData.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`py-3 px-4 font-semibold text-xs uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'upload'
                  ? 'border-gold text-gold'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <Upload className="w-4 h-4" />
              <span>Upload Custom Tile Photo</span>
            </button>
          </div>

          {/* Tab 1: Catalog Selection */}
          {activeTab === 'catalog' ? (
            <div className="p-6 overflow-y-auto flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {tilesData.map((tile) => (
                <div
                  key={tile.id}
                  onClick={() => handleSelectCatalogTile(tile)}
                  className="group relative rounded-2xl bg-charcoal-900 border border-charcoal-800 hover:border-gold/60 overflow-hidden cursor-pointer transition-all hover:scale-[1.02] hover:shadow-luxury flex flex-col"
                >
                  <div className="aspect-square w-full overflow-hidden bg-charcoal-950 relative">
                    <img
                      src={tile.images[0]}
                      alt={tile.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-gold text-[10px] font-bold">
                        {tile.category}
                      </span>
                      <span className="w-6 h-6 rounded-full bg-gold text-charcoal-950 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Plus className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-gold transition-colors">
                      {tile.name}
                    </h4>
                    <p className="text-[10px] text-gray-400">
                      {tile.finish} • {tile.dimensions}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Tab 2: Custom Tile Image Upload */
            <form onSubmit={handleAddCustomTile} className="p-6 overflow-y-auto flex-1 space-y-6">
              <div className="border-2 border-dashed border-charcoal-700 hover:border-gold/50 rounded-3xl p-8 text-center transition-colors bg-charcoal-900/50">
                {customImagePreview ? (
                  <div className="space-y-4">
                    <div className="w-44 h-44 mx-auto rounded-2xl overflow-hidden border-2 border-gold shadow-luxury">
                      <img
                        src={customImagePreview}
                        alt="Custom tile preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 text-gold text-xs font-semibold">
                        <Check className="w-3.5 h-3.5" />
                        <span>Tile Photo Ready</span>
                      </span>
                    </div>
                    <label className="inline-block text-xs text-gold hover:underline cursor-pointer">
                      <span>Change Image...</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center cursor-pointer space-y-3">
                    <div className="w-16 h-16 rounded-2xl bg-gold/15 text-gold flex items-center justify-center border border-gold/30">
                      <Upload className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">
                        Upload Your Own Tile Photo or Texture
                      </h4>
                      <p className="text-xs text-gray-400 mt-1">
                        Supports JPG, PNG, WEBP (Square tile photos work best for repeating patterns)
                      </p>
                    </div>
                    <span className="px-5 py-2.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-gold font-semibold text-xs border border-charcoal-600 transition-colors">
                      Choose Tile Image
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {customImagePreview && (
                <div className="max-w-md mx-auto space-y-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-300 block mb-1.5">
                      Custom Tile Name
                    </label>
                    <input
                      type="text"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      placeholder="e.g. My Custom Sintered Marble"
                      className="w-full px-4 py-2.5 rounded-xl bg-charcoal-900 border border-charcoal-700 text-white text-sm focus:outline-none focus:border-gold transition-colors"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-gold-amber via-gold to-gold-light text-charcoal-950 font-bold text-sm shadow-luxury hover:scale-105 transition-all flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Custom Tile to Room</span>
                  </button>
                </div>
              )}
            </form>
          )}

          {/* Footer */}
          <div className="px-6 py-4 border-t border-charcoal-800 bg-charcoal-900/50 flex items-center justify-between text-xs text-gray-400">
            <span>Click any tile to add it to your floor visualization.</span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-white font-semibold transition-colors"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AddTileModal;
