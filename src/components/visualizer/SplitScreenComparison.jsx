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

          const shiftX = width * ((settings?.floorShiftX || 0) / 100);

          ctx.beginPath();
          ctx.moveTo(width * ((1 - topWidthRatio) / 2) + shiftX, topY);
          ctx.lineTo(width * ((1 + topWidthRatio) / 2) + shiftX, topY);
          ctx.lineTo(width * ((1 + bottomWidthRatio) / 2) + shiftX, bottomY);
          ctx.lineTo(width * ((1 - bottomWidthRatio) / 2) + shiftX, bottomY);
          ctx.closePath();
          ctx.clip();

          const patternCanvas = document.createElement('canvas');
          const basePatternSize = Math.max(30, Math.round(160 * (settings?.scale || 1) * ((settings?.gridSize || 60) / 60)));
          patternCanvas.width = basePatternSize;
          patternCanvas.height = basePatternSize;
          const pCtx = patternCanvas.getContext('2d');
          pCtx.drawImage(tileImg, 0, 0, basePatternSize, basePatternSize);
          pCtx.strokeStyle = 'rgba(255,255,255,0.22)';
          pCtx.lineWidth = 1.2;
          pCtx.strokeRect(0, 0, basePatternSize, basePatternSize);

          // Perspective triangle mesh renderer for proper upper horizon tile shapes
          const cols = 24;
          const rows = 24;
          const f = (settings?.perspectiveDepth ?? 75) / 100;
          const k = f * 0.85;

          const patW = patternCanvas.width;
          const patH = patternCanvas.height;
          const repeatX = Math.max(1, Math.round((width * 1.5) / patW));
          const repeatY = Math.max(1, Math.round((height * 1.5) / patH));
          const offsetX = -(settings?.offsetX || 0);
          const offsetY = -(settings?.offsetY || 0);
          const rotDeg = settings?.rotation || 0;

          const getRotatedUV = (u, v) => {
            const rx = u * repeatX * patW + offsetX;
            const ry = v * repeatY * patH + offsetY;
            if (rotDeg === 0) return { x: rx, y: ry };

            const rad = (rotDeg * Math.PI) / 180;
            const cos = Math.cos(rad);
            const sin = Math.sin(rad);
            const cx = 0.5 * repeatX * patW;
            const cy = 0.5 * repeatY * patH;
            const dx = rx - cx;
            const dy = ry - cy;
            return {
              x: cx + dx * cos - dy * sin,
              y: cy + dx * sin + dy * cos
            };
          };

          const getScreenPos = (u, v) => {
            const py = (v * (1 + k)) / (1 + k * v);
            const sy = topY + (bottomY - topY) * py;
            const currentWidthRatio = topWidthRatio + (bottomWidthRatio - topWidthRatio) * py;
            const leftX = width * ((1 - currentWidthRatio) / 2) + shiftX;
            const rightX = width * ((1 + currentWidthRatio) / 2) + shiftX;
            const sx = leftX + u * (rightX - leftX);
            return { x: sx, y: sy };
          };

          const drawTriangle = (s0, s1, s2, d0, d1, d2) => {
            const sDelta = (s0.x - s2.x) * (s1.y - s2.y) - (s1.x - s2.x) * (s0.y - s2.y);
            if (Math.abs(sDelta) < 0.0001) return;

            const a = ((d0.x - d2.x) * (s1.y - s2.y) - (d1.x - d2.x) * (s0.y - s2.y)) / sDelta;
            const b = ((d0.y - d2.y) * (s1.y - s2.y) - (d1.y - d2.y) * (s0.y - s2.y)) / sDelta;
            const c = ((s0.x - s2.x) * (d1.x - d2.x) - (s1.x - s2.x) * (d0.x - d2.x)) / sDelta;
            const d = ((s0.x - s2.x) * (d1.y - d2.y) - (s1.x - s2.x) * (d0.y - d2.y)) / sDelta;
            const e = d0.x - a * s0.x - c * s0.y;
            const fMat = d0.y - b * s0.x - d * s0.y;

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(d0.x, d0.y);
            ctx.lineTo(d1.x, d1.y);
            ctx.lineTo(d2.x, d2.y);
            ctx.closePath();
            ctx.clip();

            ctx.transform(a, b, c, d, e, fMat);
            const maxU = Math.ceil(repeatX * patW);
            const maxV = Math.ceil(repeatY * patH);
            ctx.fillStyle = ctx.createPattern(patternCanvas, 'repeat');
            ctx.fillRect(-patW * 4, -patH * 4, maxU + patW * 8, maxV + patH * 8);
            ctx.restore();
          };

          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              const u0 = c / cols, u1 = (c + 1) / cols;
              const v0 = r / rows, v1 = (r + 1) / rows;

              const p00 = getScreenPos(u0, v0);
              const p10 = getScreenPos(u1, v0);
              const p01 = getScreenPos(u0, v1);
              const p11 = getScreenPos(u1, v1);

              const s00 = getRotatedUV(u0, v0);
              const s10 = getRotatedUV(u1, v0);
              const s01 = getRotatedUV(u0, v1);
              const s11 = getRotatedUV(u1, v1);

              drawTriangle(s00, s10, s01, p00, p10, p01);
              drawTriangle(s10, s11, p01, p10, p11, p01);
            }
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
