import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Sliders, Sparkles, ArrowLeftRight } from 'lucide-react';

/**
 * SplitScreenComparison Component
 * STEP 5: Split screen comparison
 * Left side: Original room image
 * Right side: Tile visualization with Smart Perspective Floor Alignment
 * Uses dual-canvas with CSS clip-path for 100% pixel-perfect alignment.
 */
const SplitScreenComparison = ({
  roomImage,
  selectedTile,
  tileLayers = [],
  activeLayerIndex = 0,
  layoutPattern = 'single',
  settings
}) => {
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const canvasRightRef = useRef(null); // AFTER canvas (bottom layer)
  const canvasLeftRef = useRef(null);  // BEFORE canvas (top layer)

  const [roomImageObj, setRoomImageObj] = useState(null);
  const [tileImageObjs, setTileImageObjs] = useState([]);

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

  // Load Room background image
  useEffect(() => {
    if (!roomImage?.url) {
      setRoomImageObj(null);
      return;
    }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = roomImage.url;
    img.onload = () => setRoomImageObj(img);
    img.onerror = () => setRoomImageObj(null);
  }, [roomImage?.url]);

  // Load all tile layer images
  useEffect(() => {
    const layersToLoad = tileLayers.length > 0 ? tileLayers : (selectedTile ? [selectedTile] : []);
    let isCancelled = false;

    const loadPromises = layersToLoad.map(layer => {
      return new Promise((resolve) => {
        if (!layer) {
          resolve(null);
          return;
        }
        const src = layer.images && layer.images[0] ? layer.images[0] : (layer.url || '');
        if (!src) {
          resolve(null);
          return;
        }
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
      });
    });

    Promise.all(loadPromises).then(loaded => {
      if (!isCancelled) {
        setTileImageObjs(loaded.filter(Boolean));
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [tileLayers, selectedTile]);

  // Render both LEFT (BEFORE) and RIGHT (AFTER) canvases
  useEffect(() => {
    const canvasRight = canvasRightRef.current;
    const canvasLeft = canvasLeftRef.current;
    if (!canvasRight || !canvasLeft || !roomImageObj) return;

    const ctxRight = canvasRight.getContext('2d');
    const ctxLeft = canvasLeft.getContext('2d');

    const width = 1200;
    const height = Math.round((width / roomImageObj.naturalWidth) * roomImageObj.naturalHeight) || 800;

    // Ensure identical canvas dimensions
    canvasRight.width = width;
    canvasRight.height = height;
    canvasLeft.width = width;
    canvasLeft.height = height;

    // 1. Draw BEFORE canvas (original room image only)
    ctxLeft.clearRect(0, 0, width, height);
    ctxLeft.drawImage(roomImageObj, 0, 0, width, height);

    // 2. Draw AFTER canvas (room image + floor overlay)
    ctxRight.clearRect(0, 0, width, height);
    ctxRight.drawImage(roomImageObj, 0, 0, width, height);

    if (tileImageObjs.length > 0) {
      ctxRight.save();
      ctxRight.globalAlpha = (settings?.opacity || 85) / 100;

      const topY = height * ((settings?.floorTopY ?? 65) / 100);
      const bottomY = height * ((settings?.floorBottomY ?? 99) / 100);
      const topWidthRatio = (settings?.floorTopWidth ?? 45) / 100;
      const bottomWidthRatio = (settings?.floorBottomWidth ?? 96) / 100;
      const shiftX = width * ((settings?.floorShiftX ?? 0) / 100);

      // Trapezoidal clipping region so tiles never overflow walls
      ctxRight.beginPath();
      ctxRight.moveTo(width * ((1 - topWidthRatio) / 2) + shiftX, topY);
      ctxRight.lineTo(width * ((1 + topWidthRatio) / 2) + shiftX, topY);
      ctxRight.lineTo(width * ((1 + bottomWidthRatio) / 2) + shiftX, bottomY);
      ctxRight.lineTo(width * ((1 - bottomWidthRatio) / 2) + shiftX, bottomY);
      ctxRight.closePath();
      ctxRight.clip();

      const basePatternSize = Math.max(30, Math.round(160 * (settings?.scale || 1) * ((settings?.gridSize || 60) / 60)));

      // Helper to create tile pattern canvas
      const createPatternCanvas = (img0, img1, mode) => {
        const patternCanvas = document.createElement('canvas');
        const pCtx = patternCanvas.getContext('2d');

        if (mode === 'checkered' && img0 && img1) {
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
          const targetImg = img0 || tileImageObjs[0];
          patternCanvas.width = basePatternSize;
          patternCanvas.height = basePatternSize;
          if (targetImg) {
            pCtx.drawImage(targetImg, 0, 0, basePatternSize, basePatternSize);
          } else {
            pCtx.fillStyle = '#E8ECEF';
            pCtx.fillRect(0, 0, basePatternSize, basePatternSize);
          }
          pCtx.strokeStyle = 'rgba(255,255,255,0.22)';
          pCtx.lineWidth = 1.2;
          pCtx.strokeRect(0, 0, basePatternSize, basePatternSize);
        }

        return patternCanvas;
      };

      const drawPerspectiveFloorMesh = (patternCanvas) => {
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

          ctxRight.save();
          ctxRight.beginPath();
          ctxRight.moveTo(d0.x, d0.y);
          ctxRight.lineTo(d1.x, d1.y);
          ctxRight.lineTo(d2.x, d2.y);
          ctxRight.closePath();
          ctxRight.clip();

          ctxRight.transform(a, b, c, d, e, fMat);
          const maxU = Math.ceil(repeatX * patW);
          const maxV = Math.ceil(repeatY * patH);
          ctxRight.fillStyle = ctxRight.createPattern(patternCanvas, 'repeat');
          ctxRight.fillRect(-patW * 4, -patH * 4, maxU + patW * 8, maxV + patH * 8);
          ctxRight.restore();
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
      };

      const renderFloorWithClip = (patternCanvas, xClipMin = 0, xClipMax = width) => {
        ctxRight.save();
        ctxRight.beginPath();
        ctxRight.rect(xClipMin, 0, xClipMax - xClipMin, height);
        ctxRight.clip();
        drawPerspectiveFloorMesh(patternCanvas);
        ctxRight.restore();
      };

      if (layoutPattern === 'checkered' && tileImageObjs.length >= 2) {
        const checkeredCanvas = createPatternCanvas(tileImageObjs[0], tileImageObjs[1], 'checkered');
        renderFloorWithClip(checkeredCanvas);
      } else if (layoutPattern === 'split' && tileImageObjs.length >= 2) {
        const leftCanvas = createPatternCanvas(tileImageObjs[0], null, 'single');
        const rightCanvas = createPatternCanvas(tileImageObjs[1], null, 'single');
        renderFloorWithClip(leftCanvas, 0, width / 2);
        renderFloorWithClip(rightCanvas, width / 2, width);

        ctxRight.save();
        ctxRight.strokeStyle = '#D4AF37';
        ctxRight.lineWidth = 3;
        ctxRight.beginPath();
        ctxRight.moveTo(width / 2 + shiftX, topY);
        ctxRight.lineTo(width / 2 + shiftX, bottomY);
        ctxRight.stroke();
        ctxRight.restore();
      } else if (layoutPattern === 'border' && tileImageObjs.length >= 2) {
        const mainCanvas = createPatternCanvas(tileImageObjs[0], null, 'single');
        renderFloorWithClip(mainCanvas);

        ctxRight.save();
        const borderCanvas = createPatternCanvas(tileImageObjs[1], null, 'single');
        ctxRight.beginPath();
        const margin = 0.12;
        ctxRight.moveTo(width * ((1 - topWidthRatio * (1 - margin)) / 2) + shiftX, topY + (bottomY - topY) * 0.05);
        ctxRight.lineTo(width * ((1 + topWidthRatio * (1 - margin)) / 2) + shiftX, topY + (bottomY - topY) * 0.05);
        ctxRight.lineTo(width * ((1 + bottomWidthRatio * (1 - margin)) / 2) + shiftX, bottomY - (bottomY - topY) * 0.05);
        ctxRight.lineTo(width * ((1 - bottomWidthRatio * (1 - margin)) / 2) + shiftX, bottomY - (bottomY - topY) * 0.05);
        ctxRight.closePath();
        ctxRight.rect(0, 0, width, height);
        ctxRight.clip('evenodd');
        drawPerspectiveFloorMesh(borderCanvas);
        ctxRight.restore();
      } else {
        const singleCanvas = createPatternCanvas(tileImageObjs[activeLayerIndex] || tileImageObjs[0], null, 'single');
        renderFloorWithClip(singleCanvas);
      }

      ctxRight.restore();
    }
  }, [roomImageObj, tileImageObjs, activeLayerIndex, layoutPattern, settings]);

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
        {/* Right Side (Underneath): AFTER - AI Tile Visualization */}
        <canvas
          ref={canvasRightRef}
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        />

        {/* Left Side (Top layer, clipped by CSS inset): BEFORE - Original Room Image */}
        <canvas
          ref={canvasLeftRef}
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          className="absolute inset-0 w-full h-full object-contain pointer-events-none transition-[clip-path] duration-75"
        />

        {/* Draggable Divider Line & Handle */}
        <div
          style={{ left: `${sliderPos}%` }}
          className="absolute top-0 bottom-0 -ml-[1px] w-[2px] bg-gold shadow-2xl pointer-events-none z-10"
        >
          <div className="absolute top-1/2 -translate-y-1/2 -ml-4 w-9 h-9 rounded-full bg-gold text-charcoal-950 shadow-2xl flex items-center justify-center border-2 border-white transform hover:scale-110 transition-transform">
            <ArrowLeftRight className="w-4 h-4" />
          </div>
        </div>

        {/* Corner Labels */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-bold pointer-events-none z-20">
          BEFORE (Original)
        </div>
        <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-gold text-charcoal-950 text-[11px] font-bold shadow-md pointer-events-none z-20">
          AFTER (Shreestone Slab)
        </div>
      </div>
    </div>
  );
};

export default SplitScreenComparison;
