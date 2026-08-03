import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { tilesData } from '../data/tilesData';

// 9 Luxury Room Types with unique architectural dimensions and aesthetic accents
export const ROOM_TYPES = [
  { id: 'living_room', name: 'Living Room', icon: 'Sofa', desc: 'Grand open-concept living space', wallColor: '#2B2E33', accentColor: '#D4AF37', width: 20, length: 24, height: 10 },
  { id: 'bathroom', name: 'Bathroom', icon: 'Bath', desc: 'Spa-like luxury ensuite bath', wallColor: '#1F2226', accentColor: '#A3E635', width: 12, length: 14, height: 9 },
  { id: 'kitchen', name: 'Kitchen', icon: 'Utensils', desc: 'Gourmet culinary kitchen & island', wallColor: '#26292E', accentColor: '#F59E0B', width: 16, length: 18, height: 10 },
  { id: 'bedroom', name: 'Bedroom', icon: 'Bed', desc: 'Serene contemporary bedroom sanctuary', wallColor: '#2C2A29', accentColor: '#E879F9', width: 16, length: 20, height: 10 },
  { id: 'balcony', name: 'Balcony', icon: 'Sun', desc: 'Panoramic penthouse terrace', wallColor: '#22252A', accentColor: '#38BDF8', width: 10, length: 22, height: 9 },
  { id: 'office', name: 'Office', icon: 'Briefcase', desc: 'Executive corporate corner suite', wallColor: '#23272D', accentColor: '#60A5FA', width: 18, length: 20, height: 11 },
  { id: 'hotel_lobby', name: 'Hotel Lobby', icon: 'Building2', desc: '5-Star grand architectural foyer', wallColor: '#1A1C20', accentColor: '#D4AF37', width: 30, length: 40, height: 16 },
  { id: 'restaurant', name: 'Restaurant', icon: 'Wine', desc: 'Atmospheric fine dining hall', wallColor: '#1E1B18', accentColor: '#F43F5E', width: 25, length: 35, height: 14 },
  { id: 'outdoor', name: 'Outdoor Area', icon: 'Trees', desc: 'Resort-style villa patio & pool deck', wallColor: '#252926', accentColor: '#34D399', width: 24, length: 32, height: 10 }
];

export const LIGHTING_MODES = [
  { id: 'morning', name: 'Morning', icon: 'Sunrise', color: '#FFF5E1', ambientIntensity: 0.85, dirIntensity: 1.4, bgGradient: 'from-amber-900/40 via-charcoal-900 to-charcoal-950', desc: 'Crisp sunrise warmth' },
  { id: 'day', name: 'Day', icon: 'Sun', color: '#FFFFFF', ambientIntensity: 1.1, dirIntensity: 1.8, bgGradient: 'from-sky-900/30 via-charcoal-900 to-charcoal-950', desc: 'Bright 6500K natural daylight' },
  { id: 'evening', name: 'Evening', icon: 'Sunset', color: '#FFB870', ambientIntensity: 0.7, dirIntensity: 1.3, bgGradient: 'from-orange-950/60 via-charcoal-900 to-charcoal-950', desc: 'Golden sunset glow' },
  { id: 'night', name: 'Night', icon: 'Moon', color: '#A5C8FF', ambientIntensity: 0.35, dirIntensity: 0.8, bgGradient: 'from-indigo-950/80 via-charcoal-950 to-black', desc: 'Dramatic recessed spotlighting' },
  { id: 'warm', name: 'Warm Light', icon: 'Flame', color: '#FFD199', ambientIntensity: 0.9, dirIntensity: 1.5, bgGradient: 'from-amber-950/50 via-charcoal-900 to-charcoal-950', desc: 'Cozy 2700K incandescent mood' },
  { id: 'cool', name: 'Cool Light', icon: 'Sparkles', color: '#E3F2FD', ambientIntensity: 1.0, dirIntensity: 1.6, bgGradient: 'from-blue-950/40 via-charcoal-900 to-charcoal-950', desc: 'Modern 5000K architectural white' }
];

export const TILE_CATEGORIES = [
  'All',
  'Marble',
  'Wooden',
  'Concrete',
  'Stone',
  'Terrazzo',
  'Designer',
  'High Gloss',
  'Matt Finish'
];

const Room360Context = createContext(null);

export const Room360Provider = ({ children }) => {
  // 1. Room selection
  const [activeRoomId, setActiveRoomId] = useState('living_room');
  const activeRoom = useMemo(() => ROOM_TYPES.find(r => r.id === activeRoomId) || ROOM_TYPES[0], [activeRoomId]);

  // 2. Tile selection state
  const defaultFloorTile = tilesData[0] || null;
  const defaultWallTile = tilesData[2] || tilesData[1] || tilesData[0] || null;

  const [selectedTileFloor, setSelectedTileFloor] = useState(defaultFloorTile);
  const [selectedTileWall, setSelectedTileWall] = useState(defaultWallTile);
  const [applyTarget, setApplyTarget] = useState('both'); // 'floor' | 'wall' | 'both'

  // 3. Tile filters & categories
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filters, setFilters] = useState({
    color: '',
    finish: '',
    size: '',
    search: ''
  });

  // 4. Lighting & Environment
  const [lightingModeId, setLightingModeId] = useState('day');
  const activeLighting = useMemo(() => LIGHTING_MODES.find(l => l.id === lightingModeId) || LIGHTING_MODES[1], [lightingModeId]);

  // 5. Compare Mode (Split screen comparison)
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [compareTileA, setCompareTileA] = useState(defaultFloorTile);
  const [compareTileB, setCompareTileB] = useState(tilesData[1] || defaultFloorTile);
  const [compareSliderPos, setCompareSliderPos] = useState(50); // %

  // 6. Favorites
  const [favoriteIds, setFavoriteIds] = useState(() => {
    try {
      const saved = localStorage.getItem('shreestone_360_favs');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const toggleFavorite = useCallback((tileId) => {
    setFavoriteIds(prev => {
      const next = prev.includes(tileId)
        ? prev.filter(id => id !== tileId)
        : [...prev, tileId];
      try {
        localStorage.setItem('shreestone_360_favs', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  }, []);

  // 7. Measurement & Estimation
  const [dimensions, setDimensions] = useState({
    width: 15,
    length: 20,
    height: 10
  });

  const measurementStats = useMemo(() => {
    const w = parseFloat(dimensions.width) || 0;
    const l = parseFloat(dimensions.length) || 0;
    const h = parseFloat(dimensions.height) || 0;

    const floorAreaSqFt = w * l;
    const wallAreaSqFt = 2 * (w * h + l * h);
    const totalCoverageSqFt =
      applyTarget === 'floor' ? floorAreaSqFt :
      applyTarget === 'wall' ? wallAreaSqFt :
      (floorAreaSqFt + wallAreaSqFt);

    // Standard tile 800x1600mm is approx 13.77 sq.ft per tile; box pack = 2 tiles (~27.5 sq.ft)
    const activeTile = applyTarget === 'wall' ? selectedTileWall : selectedTileFloor;
    const sqFtPerTile = 13.77; // default for 800x1600
    const tilesRequired = Math.ceil(totalCoverageSqFt / sqFtPerTile);
    const boxesRequired = Math.ceil(tilesRequired / 2); // standard 2 tiles per box
    const approxCost = Math.round(totalCoverageSqFt * (activeTile?.pricePerSqFt || 185));

    return {
      floorAreaSqFt: Math.round(floorAreaSqFt),
      wallAreaSqFt: Math.round(wallAreaSqFt),
      totalCoverageSqFt: Math.round(totalCoverageSqFt),
      tilesRequired,
      boxesRequired,
      approxCost
    };
  }, [dimensions, applyTarget, selectedTileFloor, selectedTileWall]);

  // 8. Camera & Performance controls
  const [isAutoRotate, setIsAutoRotate] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [cameraResetTrigger, setCameraResetTrigger] = useState(0);

  const triggerCameraReset = useCallback(() => {
    setCameraResetTrigger(prev => prev + 1);
  }, []);

  // Filtered Tile Catalog
  const filteredTiles = useMemo(() => {
    return tilesData.filter(tile => {
      // Category filter
      if (selectedCategory !== 'All') {
        const catLower = selectedCategory.toLowerCase();
        const tileCat = (tile.category || '').toLowerCase();
        const tileFinish = (tile.finish || '').toLowerCase();
        const tileName = (tile.name || '').toLowerCase();
        const tileDesc = (tile.description || '').toLowerCase();

        if (selectedCategory === 'Marble') {
          if (!tileName.includes('marble') && !tileDesc.includes('marble') && !tileName.includes('statuario') && !tileName.includes('calacatta') && !tileName.includes('marquina')) {
            return false;
          }
        } else if (selectedCategory === 'Wooden') {
          if (!tileName.includes('wood') && !tileDesc.includes('wood') && !tileName.includes('oak') && !tileName.includes('teak')) {
            return false;
          }
        } else if (selectedCategory === 'Concrete') {
          if (!tileName.includes('concrete') && !tileDesc.includes('concrete') && !tileName.includes('cement') && !tileColorMatch(tile, 'grey')) {
            return false;
          }
        } else if (selectedCategory === 'Stone') {
          if (!tileName.includes('stone') && !tileDesc.includes('stone') && !tileName.includes('travertine') && !tileName.includes('gris')) {
            return false;
          }
        } else if (selectedCategory === 'High Gloss') {
          if (!tileFinish.includes('gloss')) return false;
        } else if (selectedCategory === 'Matt Finish') {
          if (!tileFinish.includes('matt') && !tileFinish.includes('satin') && !tileFinish.includes('carving')) return false;
        } else {
          if (!tileCat.includes(catLower) && !tileName.includes(catLower)) return false;
        }
      }

      // Color filter
      if (filters.color && (tile.color || '').toLowerCase() !== filters.color.toLowerCase()) {
        return false;
      }

      // Finish filter
      if (filters.finish && !(tile.finish || '').toLowerCase().includes(filters.finish.toLowerCase())) {
        return false;
      }

      // Size filter
      if (filters.size && !(tile.size || '').toLowerCase().includes(filters.size.toLowerCase())) {
        return false;
      }

      // Search filter
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const matchName = (tile.name || '').toLowerCase().includes(q);
        const matchColor = (tile.color || '').toLowerCase().includes(q);
        const matchSize = (tile.size || '').toLowerCase().includes(q);
        if (!matchName && !matchColor && !matchSize) return false;
      }

      return true;
    });
  }, [selectedCategory, filters]);

  // Helper for concrete check
  function tileColorMatch(t, col) {
    return (t.color || '').toLowerCase() === col.toLowerCase();
  }

  // Handle tile click -> applies instantly based on applyTarget
  const handleSelectTile = useCallback((tile) => {
    if (isCompareMode) {
      setCompareTileB(tile);
      return;
    }

    if (applyTarget === 'floor') {
      setSelectedTileFloor(tile);
    } else if (applyTarget === 'wall') {
      setSelectedTileWall(tile);
    } else {
      setSelectedTileFloor(tile);
      setSelectedTileWall(tile);
    }
  }, [applyTarget, isCompareMode]);

  const value = {
    // Rooms
    activeRoomId,
    setActiveRoomId,
    activeRoom,
    ROOM_TYPES,

    // Tile selection
    selectedTileFloor,
    setSelectedTileFloor,
    selectedTileWall,
    setSelectedTileWall,
    applyTarget,
    setApplyTarget,
    handleSelectTile,

    // Catalog & Filters
    selectedCategory,
    setSelectedCategory,
    filters,
    setFilters,
    filteredTiles,
    TILE_CATEGORIES,

    // Lighting
    lightingModeId,
    setLightingModeId,
    activeLighting,
    LIGHTING_MODES,

    // Compare Mode
    isCompareMode,
    setIsCompareMode,
    compareTileA,
    setCompareTileA,
    compareTileB,
    setCompareTileB,
    compareSliderPos,
    setCompareSliderPos,

    // Favorites
    favoriteIds,
    toggleFavorite,

    // Measurement & Coverage
    dimensions,
    setDimensions,
    measurementStats,

    // Camera & Fullscreen
    isAutoRotate,
    setIsAutoRotate,
    isFullscreen,
    setIsFullscreen,
    cameraResetTrigger,
    triggerCameraReset
  };

  return (
    <Room360Context.Provider value={value}>
      {children}
    </Room360Context.Provider>
  );
};

export const useRoom360 = () => {
  const context = useContext(Room360Context);
  if (!context) {
    throw new Error('useRoom360 must be used within a Room360Provider');
  }
  return context;
};
