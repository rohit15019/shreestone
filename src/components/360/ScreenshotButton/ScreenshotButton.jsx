import React from 'react';
import { useRoom360 } from '../../../context/Room360Context';
import { useNotification } from '../../../context/NotificationContext';
import { 
  Camera, 
  Heart, 
  Share2, 
  RotateCw, 
  RefreshCw, 
  Maximize2, 
  Minimize2,
  Columns,
  Sparkles
} from 'lucide-react';

const ScreenshotButton = ({ canvasContainerRef }) => {
  const {
    isAutoRotate,
    setIsAutoRotate,
    isFullscreen,
    setIsFullscreen,
    triggerCameraReset,
    isCompareMode,
    setIsCompareMode,
    selectedTileFloor,
    favoriteIds,
    toggleFavorite
  } = useRoom360();

  const { addNotification } = useNotification();

  const isFav = selectedTileFloor && favoriteIds.includes(selectedTileFloor._id);

  // Download high-resolution canvas screenshot
  const handleScreenshot = () => {
    try {
      const container = canvasContainerRef?.current;
      if (!container) return;
      const canvas = container.querySelector('canvas');
      if (!canvas) {
        addNotification('Error capturing screenshot', 'error');
        return;
      }

      const dataURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `Shreestone-360-View-${Date.now()}.png`;
      link.href = dataURL;
      link.click();
      addNotification('360° Luxury Room screenshot saved!', 'success');
    } catch (err) {
      addNotification('Could not save screenshot', 'error');
    }
  };

  // Share visualization summary
  const handleShare = () => {
    try {
      const shareText = `Explore Shreestone 360° Luxury Room featuring ${selectedTileFloor?.name || 'Statuario Imperial Gold'}!`;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
        addNotification('Shareable 360° link copied to clipboard!', 'success');
      } else {
        addNotification('Link ready to share!', 'success');
      }
    } catch (e) {
      addNotification('Link ready to share!', 'success');
    }
  };

  // Toggle Fullscreen mode
  const handleToggleFullscreen = () => {
    try {
      if (!isFullscreen) {
        const el = canvasContainerRef?.current;
        if (el && el.requestFullscreen) {
          el.requestFullscreen();
          setIsFullscreen(true);
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
          setIsFullscreen(false);
        }
      }
    } catch (err) {
      setIsFullscreen(!isFullscreen);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 bg-white/90 dark:bg-charcoal-900/90 backdrop-blur-xl p-2 rounded-2xl border border-gray-200/80 dark:border-charcoal-700 shadow-card">
      {/* Compare Mode Toggle */}
      <button
        onClick={() => setIsCompareMode(!isCompareMode)}
        title="Split Screen Comparison Mode"
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
          isCompareMode
            ? 'bg-gold text-charcoal-950 font-bold shadow-sm'
            : 'text-charcoal-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-charcoal-800'
        }`}
      >
        <Columns className="w-4 h-4" />
        <span>Compare</span>
      </button>

      {/* Auto Rotate Toggle */}
      <button
        onClick={() => setIsAutoRotate(!isAutoRotate)}
        title="Toggle 360° Auto-Rotate Turntable"
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
          isAutoRotate
            ? 'bg-emerald-500 text-white shadow-sm'
            : 'text-charcoal-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-charcoal-800'
        }`}
      >
        <RotateCw className={`w-4 h-4 ${isAutoRotate ? 'animate-spin' : ''}`} />
        <span className="hidden md:inline">Auto Rotate</span>
      </button>

      {/* Reset Camera */}
      <button
        onClick={triggerCameraReset}
        title="Reset Camera View"
        className="p-2 rounded-xl text-charcoal-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-charcoal-800 transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
      </button>

      {/* Save Favorite */}
      {selectedTileFloor && (
        <button
          onClick={() => toggleFavorite(selectedTileFloor._id)}
          title={isFav ? "Remove from favorites" : "Save tile to favorites"}
          className={`p-2 rounded-xl transition-colors ${
            isFav
              ? 'bg-red-500 text-white'
              : 'text-charcoal-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-charcoal-800'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-white' : ''}`} />
        </button>
      )}

      {/* Download Screenshot */}
      <button
        onClick={handleScreenshot}
        title="Download 360° High-Res Screenshot"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-charcoal-900 text-white dark:bg-white dark:text-charcoal-900 font-semibold text-xs hover:bg-charcoal-800 transition-colors shadow-sm"
      >
        <Camera className="w-4 h-4 text-gold" />
        <span className="hidden sm:inline">Screenshot</span>
      </button>

      {/* Share Button */}
      <button
        onClick={handleShare}
        title="Share 360° Visualization"
        className="p-2 rounded-xl text-charcoal-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-charcoal-800 transition-colors"
      >
        <Share2 className="w-4 h-4" />
      </button>

      {/* Fullscreen Button */}
      <button
        onClick={handleToggleFullscreen}
        title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen Mode"}
        className="p-2 rounded-xl text-charcoal-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-charcoal-800 transition-colors"
      >
        {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
      </button>
    </div>
  );
};

export default ScreenshotButton;
