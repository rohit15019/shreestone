import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Trash2, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * RoomUploader Component
 * STEP 1: Allow users to upload their own room image (JPG, PNG, WEBP)
 * Runs 100% inside browser memory using URL.createObjectURL.
 * Features: Drag & Drop, Click to Upload, Image Preview, Remove Image, Replace Image,
 * plus 3 architectural preset room images for instant one-click testing.
 */
const PRESET_ROOMS = [
  {
    id: 'preset_living',
    name: 'Luxury Villa Lounge',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
    tag: 'Living Room'
  },
  {
    id: 'preset_bathroom',
    name: 'Carrara Marble Bath',
    url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1400&q=85',
    tag: 'Bathroom'
  },
  {
    id: 'preset_kitchen',
    name: 'Gourmet Island Kitchen',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=85',
    tag: 'Kitchen'
  }
];

const RoomUploader = ({ currentImage, onImageSelect, onRemoveImage }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const fileInputRef = useRef(null);

  // Validate and load selected file into browser memory
  const handleFile = (file) => {
    setErrorMsg(null);
    if (!file) return;

    // Check supported formats: JPG, PNG, WEBP
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrorMsg('Unsupported format. Please upload a JPG, PNG, or WEBP image.');
      return;
    }

    // Limit to reasonable client-side size (< 15MB)
    if (file.size > 15 * 1024 * 1024) {
      setErrorMsg('Image file size exceeds 15MB. Please choose a smaller image.');
      return;
    }

    // Create client-side object URL (no server upload)
    const objectUrl = URL.createObjectURL(file);
    onImageSelect({
      url: objectUrl,
      name: file.name,
      isPreset: false
    });
  };

  // Drag and drop event handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handlePresetSelect = (preset) => {
    setErrorMsg(null);
    onImageSelect({
      url: preset.url,
      name: preset.name,
      isPreset: true
    });
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone or Preview Display */}
      {!currentImage ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 ${
            isDragging
              ? 'border-gold bg-gold/10 scale-[1.01]'
              : 'border-gray-300 dark:border-charcoal-700 bg-white/70 dark:bg-charcoal-800/70 hover:border-gold/70 hover:bg-white dark:hover:bg-charcoal-800'
          } backdrop-blur-md shadow-card`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileInputChange}
            className="hidden"
          />

          <div className="max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-amber via-gold to-gold-light flex items-center justify-center mx-auto shadow-lg shadow-gold/20">
              <Upload className="w-7 h-7 text-charcoal-950" />
            </div>

            <div>
              <h3 className="font-display font-bold text-xl text-charcoal-900 dark:text-white">
                Upload Room Photo to Visualize
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Drag & drop your living room, kitchen, or bathroom photo here, or <span className="text-gold font-semibold underline">click to browse</span>
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-charcoal-900 text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                JPG
              </span>
              <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-charcoal-900 text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                PNG
              </span>
              <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-charcoal-900 text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                WEBP
              </span>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs">
                {errorMsg}
              </div>
            )}
          </div>
        </motion.div>
      ) : (
        /* Image Preview State with Replace and Remove controls */
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-charcoal-800 rounded-3xl p-5 border border-gray-200 dark:border-charcoal-700 shadow-card flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="w-20 h-16 rounded-xl overflow-hidden bg-gray-100 dark:bg-charcoal-900 flex-shrink-0 border border-gray-200 dark:border-charcoal-700">
              <img
                src={currentImage.url}
                alt={currentImage.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <h4 className="font-semibold text-sm text-charcoal-900 dark:text-white truncate max-w-[200px] sm:max-w-xs">
                  {currentImage.name}
                </h4>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 block">
                {currentImage.isPreset ? 'Studio Preset Photo' : 'Browser Memory • Ready for Tile Rendering'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileInputChange}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-charcoal-700 hover:bg-gold/15 hover:text-gold text-charcoal-800 dark:text-gray-200 text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Replace Image</span>
            </button>
            <button
              onClick={onRemoveImage}
              className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Remove</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* Preset Room Gallery */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Or try a Studio Preset Architecture Space</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {PRESET_ROOMS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handlePresetSelect(preset)}
              className={`group relative aspect-[16/9] rounded-2xl overflow-hidden border-2 text-left transition-all ${
                currentImage?.url === preset.url
                  ? 'border-gold shadow-luxury scale-[1.02]'
                  : 'border-transparent opacity-85 hover:opacity-100 hover:scale-[1.01]'
              }`}
            >
              <img
                src={preset.url}
                alt={preset.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/20 to-transparent flex items-end p-3">
                <div>
                  <span className="text-[10px] font-semibold text-gold uppercase tracking-wider block">
                    {preset.tag}
                  </span>
                  <span className="text-xs font-bold text-white block truncate">
                    {preset.name}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomUploader;
