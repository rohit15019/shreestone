import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Download, Sparkles, RefreshCw, Layers, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * CanvasFloorRenderer Component
 * STEP 3: Overlay selected tile texture on the floor area using HTML5 Canvas & Perspective Transform.
 * STEP 6: Add Download button to export visualization as PNG client-side.
 * Includes Smart Floor Horizon & Perspective Alignment so tiles stay properly aligned and never overflow walls.
 */
const CanvasFloorRenderer = ({
  roomImage,
  selectedTile,
  settings,
  onChangeSetting,
  onDownloadReady
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [tileImageObj, setTileImageObj] = useState(null);
  const [roomImageObj, setRoomImageObj] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Load the selected tile image into an Image object
  useEffect(() => {
    if (!selectedTile) {
      setTileImageObj(null);
      return;
    }
    const imgUrl = selectedTile.images && selectedTile.images.length > 0
      ? selectedTile.images[0]
      : '';
    if (!imgUrl) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imgUrl;
    img.onload = () => {
      setTileImageObj(img);
    };
  }, [selectedTile]);

  // Load the uploaded room photo into an Image object
  useEffect(() => {
    if (!roomImage?.url) {
      setRoomImageObj(null);
      return;
    }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = roomImage.url;
    img.onload = () => {
      setRoomImageObj(img);
    };
  }, [roomImage]);

  // Main Canvas Perspective Floor Render loop
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !roomImageObj) return;

    const ctx = canvas.getContext('2d');
    const width = 1200;
    const height = Math.round((width / roomImageObj.width) * roomImageObj.height) || 800;

    canvas.width = width;
    canvas.height = height;

    // 1. Draw base room image
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(roomImageObj, 0, 0, width, height);

    // 2. If tile image is selected, render true perspective-aligned floor texture
    if (tileImageObj) {
      ctx.save();

      // Opacity from user slider
      ctx.globalAlpha = (settings.opacity || 85) / 100;

      // Calculate floor horizon and boundaries from user calibration sliders
      // Defaults: floorTopY=65%, floorBottomY=99%, floorTopWidth=45%, floorBottomWidth=96%
      const topY = height * ((settings.floorTopY ?? 65) / 100);
      const bottomY = height * ((settings.floorBottomY ?? 99) / 100);
      const topWidthRatio = (settings.floorTopWidth ?? 45) / 100;
      const bottomWidthRatio = (settings.floorBottomWidth ?? 96) / 100;
      const shiftX = width * ((settings.floorShiftX ?? 0) / 100);

      // Define trapezoidal floor polygon clipping region so tiles NEVER overflow onto walls
      ctx.beginPath();
      ctx.moveTo(width * ((1 - topWidthRatio) / 2) + shiftX, topY);
      ctx.lineTo(width * ((1 + topWidthRatio) / 2) + shiftX, topY);
      ctx.lineTo(width * ((1 + bottomWidthRatio) / 2) + shiftX, bottomY);
      ctx.lineTo(width * ((1 - bottomWidthRatio) / 2) + shiftX, bottomY);
      ctx.closePath();
      ctx.clip();

      // Create base tile pattern canvas
      const patternCanvas = document.createElement('canvas');
      const basePatternSize = Math.max(30, Math.round(160 * (settings.scale || 1) * ((settings.gridSize || 60) / 60)));
      patternCanvas.width = basePatternSize;
      patternCanvas.height = basePatternSize;
      const pCtx = patternCanvas.getContext('2d');

      // Draw tile texture with subtle grout lines
      pCtx.drawImage(tileImageObj, 0, 0, basePatternSize, basePatternSize);
      pCtx.strokeStyle = 'rgba(255,255,255,0.22)';
      pCtx.lineWidth = 1.2;
      pCtx.strokeRect(0, 0, basePatternSize, basePatternSize);

      const pattern = ctx.createPattern(patternCanvas, 'repeat');

      // Render perspective horizontal slices for authentic 3D depth and convergence
      const totalSlices = 90;
      const sliceHeight = (bottomY - topY) / totalSlices;
      const perspectiveIntensity = (settings.perspectiveDepth || 75) / 100;

      for (let i = 0; i < totalSlices; i++) {
        const sliceTop = topY + i * sliceHeight;
        const sliceBottom = sliceTop + sliceHeight + 0.5; // slight overlap prevents subpixel gaps
        const progress = i / totalSlices; // 0 at horizon, 1 at bottom foreground

        // Non-linear perspective scaling: tiles grow larger and wider as they approach foreground
        const depthScale = perspectiveIntensity === 0
          ? 1.0
          : Math.pow(progress, 1 + (1 - perspectiveIntensity) * 0.8) * 1.5 + 0.25;

        ctx.save();
        ctx.beginPath();
        ctx.rect(0, sliceTop, width, sliceBottom - sliceTop);
        ctx.clip();

        if (pattern) {
          ctx.fillStyle = pattern;
          ctx.translate(width / 2 + (settings.offsetX || 0), sliceTop + (settings.offsetY || 0));
          ctx.scale(depthScale, perspectiveIntensity === 0 ? depthScale : depthScale * 0.7); // 100% flat when perspective is 0
          ctx.rotate(((settings.rotation || 0) * Math.PI) / 180);
          ctx.translate(-width / 2, -sliceTop);

          ctx.fillRect(-width * 2, -height * 2, width * 5, height * 5);
        }
        ctx.restore();
      }

      ctx.restore();

      // 3. Specular gloss highlight on floor for Italian marble finish
      ctx.save();
      const gradient = ctx.createLinearGradient(0, topY, 0, bottomY);
      gradient.addColorStop(0, 'rgba(255,255,255,0.06)');
      gradient.addColorStop(0.5, 'rgba(255,255,255,0.015)');
      gradient.addColorStop(1, 'rgba(0,0,0,0.15)');

      ctx.beginPath();
      ctx.moveTo(width * ((1 - topWidthRatio) / 2), topY);
      ctx.lineTo(width * ((1 + topWidthRatio) / 2), topY);
      ctx.lineTo(width * ((1 + bottomWidthRatio) / 2), bottomY);
      ctx.lineTo(width * ((1 - bottomWidthRatio) / 2), bottomY);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.restore();
    }
  }, [roomImageObj, tileImageObj, settings]);

  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  // STEP 6: Export visualization as PNG client-side
  const handleDownloadPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `shreestone-ai-visualizer-${selectedTile?.name?.toLowerCase().replace(/\s+/g, '-') || 'room'}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Canvas export error:', err);
      alert('Unable to export image. Please ensure your uploaded image format is valid.');
    }
  };

  const handleMouseDown = (e) => {
    if (!onChangeSetting) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !onChangeSetting) return;
    const dx = (e.clientX - dragStart.x) * 1.5;
    const dy = (e.clientY - dragStart.y) * 1.5;
    onChangeSetting('offsetX', (settings.offsetX ?? 0) + dx);
    onChangeSetting('offsetY', (settings.offsetY ?? 0) + dy);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleTouchStart = (e) => {
    if (!onChangeSetting || !e.touches || e.touches.length === 0) return;
    setIsDragging(true);
    setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !onChangeSetting || !e.touches || e.touches.length === 0) return;
    const dx = (e.touches[0].clientX - dragStart.x) * 1.5;
    const dy = (e.touches[0].clientY - dragStart.y) * 1.5;
    onChangeSetting('offsetX', (settings.offsetX ?? 0) + dx);
    onChangeSetting('offsetY', (settings.offsetY ?? 0) + dy);
    setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="bg-white dark:bg-charcoal-800 rounded-3xl p-6 border border-gray-200/80 dark:border-charcoal-700 shadow-card flex flex-col space-y-4">
      {/* Top Controls & Download Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-gold block">
            STEP 3 • Client-Side Perspective Floor Rendering
          </span>
          <h3 className="font-display font-bold text-xl text-charcoal-900 dark:text-white">
            {selectedTile ? `${selectedTile.name} • ${selectedTile.finish}` : 'Preview Workspace'}
          </h3>
        </div>

        {/* STEP 6: Download Button */}
        <button
          onClick={handleDownloadPNG}
          disabled={!roomImageObj}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-gold-amber via-gold to-gold-light text-charcoal-950 font-bold text-xs shadow-md hover:shadow-luxury hover:scale-105 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          <span>Export PNG Image</span>
        </button>
      </div>

      {/* Main Interactive Visualizer Display */}
      <div
        ref={containerRef}
        className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-gray-100 dark:bg-charcoal-900 border border-gray-200 dark:border-charcoal-700 shadow-inner flex items-center justify-center group"
      >
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
          className="w-full h-full object-contain cursor-move"
          title="Click and drag to move tiles anywhere"
        />

        {/* Interactive Drag Tip Badge */}
        {selectedTile && (
          <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-1.5 pointer-events-none">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Click & Drag anywhere on photo to move tiles</span>
          </div>
        )}

        {/* Live Perspective Floor Alignment Feedback */}
        {selectedTile && (
          <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-1.5 pointer-events-none">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>3D Perspective Floor Calibration Active</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CanvasFloorRenderer;
