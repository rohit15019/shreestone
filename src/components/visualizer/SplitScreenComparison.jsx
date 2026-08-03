import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Sliders, Sparkles, ArrowLeftRight } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * SplitScreenComparison Component
 * STEP 5: Split screen comparison
 * Left side: Original room image
 * Right side: Tile visualization with Smart Perspective Floor Alignment
 * Interactive Before / After slider handle
 */
const SplitScreenComparison = ({
  roomImage,
  selectedTile,
  settings
}) => {
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const canvasRightRef = useRef(null);

  // Calculate mouse/touch position for Before/After slider
  const updateSliderPosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pos = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(100, Math.max(0, pos)));
  }, []);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    updateSliderPosition(e.clientX);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    if (e.touches && e.touches.length > 0) {
      updateSliderPosition(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        updateSliderPosition(e.clientX);
      }
    };
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    const handleTouchMove = (e) => {
      if (isDragging && e.touches && e.touches.length > 0) {
        updateSliderPosition(e.touches[0].clientX);
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, updateSliderPosition]);

  // Render the Right-side canvas (with true perspective tile overlay) for split comparison
  useEffect(() => {
    const canvas = canvasRightRef.current;
    if (!canvas || !roomImage?.url) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = roomImage.url;
    img.onload = () => {
      const ctx = canvas.getContext('2d');
      const width = 1000;
      const height = Math.round((width / img.width) * img.height) || 660;

      canvas.width = width;
      canvas.height = height;

      // Draw base
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);

      // If tile selected, draw perspective floor overlay on right side
      if (selectedTile && selectedTile.images && selectedTile.images[0]) {
        const tileImg = new Image();
        tileImg.crossOrigin = 'anonymous';
        tileImg.src = selectedTile.images[0];
        tileImg.onload = () => {
          ctx.save();
          ctx.globalAlpha = (settings?.opacity || 85) / 100;

          const topY = height * ((settings?.floorTopY || 65) / 100);
          const bottomY = height * ((settings?.floorBottomY || 99) / 100);
          const topWidthRatio = (settings?.floorTopWidth || 45) / 100;
          const bottomWidthRatio = (settings?.floorBottomWidth || 96) / 100;

          ctx.beginPath();
          ctx.moveTo(width * ((1 - topWidthRatio) / 2), topY);
          ctx.lineTo(width * ((1 + topWidthRatio) / 2), topY);
          ctx.lineTo(width * ((1 + bottomWidthRatio) / 2), bottomY);
          ctx.lineTo(width * ((1 - bottomWidthRatio) / 2), bottomY);
          ctx.closePath();
          ctx.clip();

          const patternCanvas = document.createElement('canvas');
          const basePatternSize = Math.max(30, Math.round(160 * (settings?.scale || 1) * ((settings?.gridSize || 60) / 60)));
          patternCanvas.width = basePatternSize;
          patternCanvas.height = basePatternSize;
          const pCtx = patternCanvas.getContext('2d');
          pCtx.drawImage(tileImg, 0, 0, basePatternSize, basePatternSize);

          const pattern = ctx.createPattern(patternCanvas, 'repeat');
          const totalSlices = 70;
          const sliceHeight = (bottomY - topY) / totalSlices;
          const perspectiveIntensity = (settings?.perspectiveDepth || 75) / 100;

          for (let i = 0; i < totalSlices; i++) {
            const sliceTop = topY + i * sliceHeight;
            const sliceBottom = sliceTop + sliceHeight + 0.5;
            const progress = i / totalSlices;
            const depthScale = Math.pow(progress, 1 + (1 - perspectiveIntensity) * 0.8) * 1.5 + 0.25;

            ctx.save();
            ctx.beginPath();
            ctx.rect(0, sliceTop, width, sliceBottom - sliceTop);
            ctx.clip();

            if (pattern) {
              ctx.fillStyle = pattern;
              ctx.translate(width / 2 + (settings?.offsetX || 0), sliceTop + (settings?.offsetY || 0));
              ctx.scale(depthScale, depthScale * 0.7);
              ctx.rotate(((settings?.rotation || 0) * Math.PI) / 180);
              ctx.translate(-width / 2, -sliceTop);
              ctx.fillRect(-width * 2, -height * 2, width * 5, height * 5);
            }
            ctx.restore();
          }

          ctx.restore();
        };
      }
    };
  }, [roomImage, selectedTile, settings]);

  if (!roomImage?.url) {
    return (
      <div className="bg-white dark:bg-charcoal-800 rounded-3xl p-12 text-center border border-gray-200 dark:border-charcoal-700 shadow-card">
        <ArrowLeftRight className="w-10 h-10 text-gray-300 dark:text-charcoal-700 mx-auto mb-3" />
        <h4 className="font-display font-bold text-lg text-charcoal-900 dark:text-white">
          Before & After Split Comparison
        </h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Please upload or select a room photo in Step 1 to activate the interactive split-screen comparison.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-charcoal-800 rounded-3xl p-6 border border-gray-200/80 dark:border-charcoal-700 shadow-card space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-gold block">
            STEP 5 • Split Screen Comparison
          </span>
          <h3 className="font-display font-bold text-xl text-charcoal-900 dark:text-white">
            Before / After Architectural Slider
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-charcoal-900 font-semibold">
            Left: Original Room
          </span>
          <span className="px-3 py-1 rounded-full bg-gold/15 text-gold font-semibold">
            Right: AI Tile Visualization
          </span>
        </div>
      </div>

      {/* Interactive Split Viewport */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-gray-100 dark:bg-charcoal-900 border border-gray-200 dark:border-charcoal-700 cursor-ew-resize select-none"
      >
        {/* Right Side (Underneath): AI Tile Visualization */}
        <canvas
          ref={canvasRightRef}
          className="absolute inset-0 w-full h-full object-contain"
        />

        {/* Left Side (Clipped via overflow/width): Original Room Image */}
        <div
          style={{ width: `${sliderPos}%` }}
          className="absolute top-0 bottom-0 left-0 overflow-hidden border-r-2 border-gold shadow-2xl transition-[width] duration-75"
        >
          <img
            src={roomImage.url}
            alt="Original room before tile install"
            className="absolute top-0 left-0 h-full max-w-none object-contain"
            style={{
              width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%'
            }}
          />
        </div>

        {/* Draggable Divider Handle */}
        <div
          style={{ left: `${sliderPos}%` }}
          className="absolute top-0 bottom-0 -ml-5 w-10 flex items-center justify-center pointer-events-none"
        >
          <div className="w-9 h-9 rounded-full bg-gold text-charcoal-950 shadow-2xl flex items-center justify-center border-2 border-white transform hover:scale-110 transition-transform">
            <ArrowLeftRight className="w-4 h-4" />
          </div>
        </div>

        {/* Corner Labels */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-bold pointer-events-none">
          BEFORE (Original)
        </div>
        <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-gold text-charcoal-950 text-[11px] font-bold shadow-md pointer-events-none">
          AFTER (Shreestone Slab)
        </div>
      </div>
    </div>
  );
};

export default SplitScreenComparison;
