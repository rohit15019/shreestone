import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Download, RefreshCw, Sparkles, Layers } from 'lucide-react';

/**
 * CanvasFloorRenderer Component
 * STEP 3: Client-side HTML5 Canvas perspective floor overlay
 * Now features High-Precision Perspective Triangle Mesh Rendering
 * so BOTH bottom and upper horizon tile shapes are geometrically PROPER and sharp!
 */
const CanvasFloorRenderer = ({
  roomImage,
  selectedTile,
  tileLayers = [],
  activeLayerIndex = 0,
  layoutPattern = 'single', // 'single' | 'checkered' | 'border' | 'split'
  settings,
  onChangeSetting,
  onDownloadReady
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [roomImageObj, setRoomImageObj] = useState(null);
  const [tileImageObjs, setTileImageObjs] = useState([]);

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

  // Main Canvas Render Loop with True Perspective Triangle Mesh
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const width = 1200;
    const height = roomImageObj
      ? Math.round((width / roomImageObj.naturalWidth) * roomImageObj.naturalHeight)
      : 800;

    canvas.width = width;
    canvas.height = height;

    // 1. Draw base room image or clean placeholder room studio
    ctx.clearRect(0, 0, width, height);
    if (roomImageObj) {
      ctx.drawImage(roomImageObj, 0, 0, width, height);
    } else {
      ctx.fillStyle = '#1A1A1A';
      ctx.fillRect(0, 0, width, height);
    }

    // 2. Draw Floor Overlay using High-Precision Perspective Triangle Mesh
    if (tileImageObjs.length > 0) {
      ctx.save();
      ctx.globalAlpha = (settings.opacity || 85) / 100;

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

      // Helper to create a base tile pattern canvas
      const createPatternCanvas = (img0, img1, mode) => {
        const patternCanvas = document.createElement('canvas');
        const pCtx = patternCanvas.getContext('2d');

        if (mode === 'checkered' && img0 && img1) {
          // 2x2 Alternating Checkered Grid
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

      // True 3D Perspective Triangle Mesh Renderer
      // Solves upper-side distortion so BOTH bottom and upper horizon tile shapes are geometrically perfect!
      const drawPerspectiveFloorMesh = (patternCanvas) => {
        const cols = 24;
        const rows = 24;
        const f = (settings.perspectiveDepth ?? 75) / 100;
        const k = f * 0.85;

        const patW = patternCanvas.width;
        const patH = patternCanvas.height;
        const repeatX = Math.max(1, Math.round((width * 1.5) / patW));
        const repeatY = Math.max(1, Math.round((height * 1.5) / patH));
        const offsetX = -(settings.offsetX || 0);
        const offsetY = -(settings.offsetY || 0);
        const rotDeg = settings.rotation || 0;

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
      };

      const renderFloorWithClip = (patternCanvas, xClipMin = 0, xClipMax = width) => {
        ctx.save();
        ctx.beginPath();
        ctx.rect(xClipMin, 0, xClipMax - xClipMin, height);
        ctx.clip();
        drawPerspectiveFloorMesh(patternCanvas);
        ctx.restore();
      };

      const primaryImg = tileImageObjs[activeLayerIndex] || tileImageObjs[0];
      const secondaryImg = tileImageObjs[1] || tileImageObjs[0];

      if (layoutPattern === 'checkered' && tileImageObjs.length >= 2) {
        const checkeredCanvas = createPatternCanvas(tileImageObjs[0], tileImageObjs[1], 'checkered');
        renderFloorWithClip(checkeredCanvas);
      } else if (layoutPattern === 'split' && tileImageObjs.length >= 2) {
        const leftCanvas = createPatternCanvas(tileImageObjs[0], null, 'single');
        const rightCanvas = createPatternCanvas(tileImageObjs[1], null, 'single');
        renderFloorWithClip(leftCanvas, 0, width / 2);
        renderFloorWithClip(rightCanvas, width / 2, width);

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
        // Main center floor
        const mainCanvas = createPatternCanvas(tileImageObjs[0], null, 'single');
        renderFloorWithClip(mainCanvas);

        // Elegant perimeter border frame with 2nd tile
        ctx.save();
        const borderCanvas = createPatternCanvas(tileImageObjs[1], null, 'single');
        ctx.beginPath();
        const margin = 0.12;
        ctx.moveTo(width * ((1 - topWidthRatio * (1 - margin)) / 2) + shiftX, topY + (bottomY - topY) * 0.05);
        ctx.lineTo(width * ((1 + topWidthRatio * (1 - margin)) / 2) + shiftX, topY + (bottomY - topY) * 0.05);
        ctx.lineTo(width * ((1 + bottomWidthRatio * (1 - margin)) / 2) + shiftX, bottomY - (bottomY - topY) * 0.05);
        ctx.lineTo(width * ((1 - bottomWidthRatio * (1 - margin)) / 2) + shiftX, bottomY - (bottomY - topY) * 0.05);
        ctx.closePath();
        // Reverse clip area for border
        ctx.rect(0, 0, width, height);
        ctx.clip('evenodd');
        drawPerspectiveFloorMesh(borderCanvas);
        ctx.restore();
      } else {
        // Default single pattern
        const singleCanvas = createPatternCanvas(primaryImg, null, 'single');
        renderFloorWithClip(singleCanvas);
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
        className="relative rounded-2xl overflow-hidden bg-charcoal-950 shadow-inner border border-gray-100 dark:border-charcoal-700 cursor-grab active:cursor-grabbing select-none flex items-center justify-center"
      >
        <canvas
          ref={canvasRef}
          className="w-full h-auto max-h-[550px] object-contain block"
        />

        {/* Floating Instruction Tag */}
        <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-charcoal-900/80 backdrop-blur-md text-white text-[11px] border border-white/10 pointer-events-none flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-gold" />
          <span>Click & drag to slide tiles • Sliders calibrate floor boundaries</span>
        </div>
      </div>
    </div>
  );
};

export default CanvasFloorRenderer;
