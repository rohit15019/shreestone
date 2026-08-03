import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Download, Sparkles, RefreshCw, Layers, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * CanvasFloorRenderer Component
 * STEP 3: Overlay selected tile texture(s) on the floor area using HTML5 Canvas & Perspective Transform.
 * STEP 6: Add Download button to export visualization as PNG client-side.
 * Includes Smart Floor Horizon & Perspective Alignment, PLUS Multi-Tile Combination Patterns
 * (Single, Checkered Grid, Border Frame, Split Room) when customer clicks "+ Add Tile"!
 */
const CanvasFloorRenderer = ({
  roomImage,
  selectedTile,
  tileLayers = [],
  activeLayerIndex = 0,
  layoutPattern = 'single',
  settings,
  onChangeSetting,
  onDownloadReady
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [tileImageObjs, setTileImageObjs] = useState([]);
  const [roomImageObj, setRoomImageObj] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Effective layers list: fallback to selectedTile if tileLayers is empty
  const activeLayers = tileLayers && tileLayers.length > 0
    ? tileLayers
    : selectedTile ? [selectedTile] : [];

  // Load all tile images into Image objects
  useEffect(() => {
    if (!activeLayers || activeLayers.length === 0) {
      setTileImageObjs([]);
      return;
    }

    let isMounted = true;
    const loadPromises = activeLayers.map((layer) => {
      return new Promise((resolve) => {
        const imgUrl = layer.images && layer.images.length > 0 ? layer.images[0] : '';
        if (!imgUrl) {
          resolve(null);
          return;
        }
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = imgUrl;
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
      });
    });

    Promise.all(loadPromises).then((images) => {
      if (isMounted) {
        setTileImageObjs(images.filter(Boolean));
      }
    });

    return () => {
      isMounted = false;
    };
  }, [JSON.stringify(activeLayers.map(l => l.images?.[0] || ''))]);

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

    // 2. If tile image(s) loaded, render perspective-aligned floor texture
    if (tileImageObjs.length > 0) {
      ctx.save();

      // Opacity from user slider
      ctx.globalAlpha = (settings.opacity || 85) / 100;

      // Calculate floor horizon and boundaries from user calibration sliders
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

      const basePatternSize = Math.max(30, Math.round(160 * (settings.scale || 1) * ((settings.gridSize || 60) / 60)));

      // Helper to create a tile pattern canvas based on pattern mode
      const createPattern = (img0, img1, mode) => {
        const patternCanvas = document.createElement('canvas');
        const pCtx = patternCanvas.getContext('2d');

        if (mode === 'checkered' && img0 && img1) {
          // 2x2 Alternating Checkered Grid (Italian Palazzo Style)
          patternCanvas.width = basePatternSize * 2;
          patternCanvas.height = basePatternSize * 2;

          pCtx.drawImage(img0, 0, 0, basePatternSize, basePatternSize);
          pCtx.drawImage(img1, basePatternSize, 0, basePatternSize, basePatternSize);
          pCtx.drawImage(img1, 0, basePatternSize, basePatternSize, basePatternSize);
          pCtx.drawImage(img0, basePatternSize, basePatternSize, basePatternSize, basePatternSize);

          pCtx.strokeStyle = 'rgba(255,255,255,0.25)';
          pCtx.lineWidth = 1.2;
          pCtx.strokeRect(0, 0, basePatternSize, basePatternSize);
          pCtx.strokeRect(basePatternSize, 0, basePatternSize, basePatternSize);
          pCtx.strokeRect(0, basePatternSize, basePatternSize, basePatternSize);
          pCtx.strokeRect(basePatternSize, basePatternSize, basePatternSize, basePatternSize);
        } else {
          // Single Tile Pattern
          const targetImg = img0 || tileImageObjs[0];
          patternCanvas.width = basePatternSize;
          patternCanvas.height = basePatternSize;
          if (targetImg) {
            pCtx.drawImage(targetImg, 0, 0, basePatternSize, basePatternSize);
          }
          pCtx.strokeStyle = 'rgba(255,255,255,0.22)';
          pCtx.lineWidth = 1.2;
          pCtx.strokeRect(0, 0, basePatternSize, basePatternSize);
        }

        return ctx.createPattern(patternCanvas, 'repeat');
      };

      const primaryImg = tileImageObjs[activeLayerIndex] || tileImageObjs[0];
      const secondaryImg = tileImageObjs[1] || tileImageObjs[0];

      // Draw floor slices with perspective
      const renderFloorSlices = (pattern, xClipMin = 0, xClipMax = width) => {
        const totalSlices = 90;
        const sliceHeight = (bottomY - topY) / totalSlices;
        const perspectiveIntensity = (settings.perspectiveDepth || 75) / 100;

        for (let i = 0; i < totalSlices; i++) {
          const sliceTop = topY + i * sliceHeight;
          const sliceBottom = sliceTop + sliceHeight + 0.5;
          const progress = i / totalSlices;

          const depthScale = perspectiveIntensity === 0
            ? 1.0
            : Math.pow(progress, 1 + (1 - perspectiveIntensity) * 0.8) * 1.5 + 0.25;

          ctx.save();
          ctx.beginPath();
          ctx.rect(xClipMin, sliceTop, xClipMax - xClipMin, sliceBottom - sliceTop);
          ctx.clip();

          if (pattern) {
            ctx.fillStyle = pattern;
            ctx.translate(width / 2 + (settings.offsetX || 0), sliceTop + (settings.offsetY || 0));
            ctx.scale(depthScale, perspectiveIntensity === 0 ? depthScale : depthScale * 0.7);
            ctx.rotate(((settings.rotation || 0) * Math.PI) / 180);
            ctx.translate(-width / 2, -sliceTop);

            ctx.fillRect(-width * 2, -height * 2, width * 5, height * 5);
          }
          ctx.restore();
        }
      };

      if (layoutPattern === 'checkered' && tileImageObjs.length >= 2) {
        const checkeredPattern = createPattern(tileImageObjs[0], tileImageObjs[1], 'checkered');
        renderFloorSlices(checkeredPattern);
      } else if (layoutPattern === 'split' && tileImageObjs.length >= 2) {
        const leftPattern = createPattern(tileImageObjs[0], null, 'single');
        const rightPattern = createPattern(tileImageObjs[1], null, 'single');
        renderFloorSlices(leftPattern, 0, width / 2);
        renderFloorSlices(rightPattern, width / 2, width);

        // Gold brass divider strip down the middle
        ctx.save();
        ctx.strokeStyle = '#D4AF37';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(width / 2 + shiftX, topY);
        ctx.lineTo(width / 2 + shiftX, bottomY);
        ctx.stroke();
        ctx.restore();
      } else if (layoutPattern === 'border' && tileImageObjs.length >= 2) {
        // Main floor center
        const mainPattern = createPattern(tileImageObjs[0], null, 'single');
        renderFloorSlices(mainPattern);

        // Elegant perimeter border frame with 2nd tile
        ctx.save();
        const borderPattern = createPattern(tileImageObjs[1], null, 'single');
        ctx.beginPath();
        // Inner trapezoid hole cutout for perimeter border
        const margin = 0.12;
        ctx.moveTo(width * ((1 - topWidthRatio * (1 - margin)) / 2) + shiftX, topY + (bottomY - topY) * 0.05);
        ctx.lineTo(width * ((1 + topWidthRatio * (1 - margin)) / 2) + shiftX, topY + (bottomY - topY) * 0.05);
        ctx.lineTo(width * ((1 + bottomWidthRatio * (1 - margin)) / 2) + shiftX, bottomY - (bottomY - topY) * 0.05);
        ctx.lineTo(width * ((1 - bottomWidthRatio * (1 - margin)) / 2) + shiftX, bottomY - (bottomY - topY) * 0.05);
        ctx.closePath();
        // Reverse clip area
        ctx.rect(0, 0, width, height);
        ctx.clip('evenodd');
        renderFloorSlices(borderPattern);
        ctx.restore();
      } else {
        // Default single pattern
        const singlePattern = createPattern(primaryImg, null, 'single');
        renderFloorSlices(singlePattern);
      }

      ctx.restore();

      // 3. Specular gloss highlight on floor for Italian marble finish
      ctx.save();
      const gradient = ctx.createLinearGradient(0, topY, 0, bottomY);
      gradient.addColorStop(0, 'rgba(255,255,255,0.06)');
      gradient.addColorStop(0.5, 'rgba(255,255,255,0.015)');
      gradient.addColorStop(1, 'rgba(0,0,0,0.15)');

      ctx.beginPath();
      ctx.moveTo(width * ((1 - topWidthRatio) / 2) + shiftX, topY);
      ctx.lineTo(width * ((1 + topWidthRatio) / 2) + shiftX, topY);
      ctx.lineTo(width * ((1 + bottomWidthRatio) / 2) + shiftX, bottomY);
      ctx.lineTo(width * ((1 - bottomWidthRatio) / 2) + shiftX, bottomY);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.restore();
    }

    // 4. Subtle Shreestone watermark in corner
    ctx.save();
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.font = 'bold 18px Cinzel, serif';
    ctx.fillText('SHREESTONE CERAMICS • AI STUDIO', 28, height - 28);
    ctx.restore();

    if (onDownloadReady) {
      onDownloadReady(canvas);
    }
  }, [roomImageObj, tileImageObjs, activeLayerIndex, layoutPattern, settings, onDownloadReady]);

  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  // Client-side export PNG
  const handleDownloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const link = document.createElement('a');
      link.download = `shreestone_visualization_${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (e) {
      console.error('Download export failed:', e);
    }
  };

  // Drag interaction to shift texture horizontally & vertically on floor
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    onChangeSetting('offsetX', (settings.offsetX || 0) + dx * 0.5);
    onChangeSetting('offsetY', (settings.offsetY || 0) + dy * 0.5);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="bg-white dark:bg-charcoal-800 rounded-3xl p-6 border border-gray-200/80 dark:border-charcoal-700 shadow-card space-y-4">
      {/* Canvas Header & Download CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-charcoal-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold border border-gold/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gold block">
              STEP 3 • Live Perspective Canvas
            </span>
            <h3 className="font-display font-bold text-xl text-charcoal-900 dark:text-white">
              Real-Time Architectural Floor Overlay
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => renderCanvas()}
            className="p-2.5 rounded-xl bg-gray-100 dark:bg-charcoal-900 text-charcoal-800 dark:text-gray-200 hover:bg-gold/15 hover:text-gold transition-colors"
            title="Refresh Overlay"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={handleDownloadImage}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-gold-amber via-gold to-gold-light text-charcoal-950 font-bold text-sm shadow-luxury hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download PNG (Step 6)</span>
          </button>
        </div>
      </div>

      {/* Interactive Floor Canvas */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="relative w-full rounded-2xl overflow-hidden bg-charcoal-950 border border-charcoal-800 cursor-grab active:cursor-grabbing select-none aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center shadow-inner group"
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain pointer-events-none"
        />

        {/* Drag Hint overlay */}
        <div className="absolute bottom-4 left-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-charcoal-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gold/30 text-white text-xs flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-gold" />
          <span>Click & drag to shift tile alignment on floor</span>
        </div>
      </div>
    </div>
  );
};

export default CanvasFloorRenderer;
