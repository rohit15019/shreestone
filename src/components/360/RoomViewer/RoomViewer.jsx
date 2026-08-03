import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useRoom360 } from '../../../context/Room360Context';
import { Sparkles, Loader2, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  LivingRoomFurniture,
  BathroomFurniture,
  KitchenFurniture,
  BedroomFurniture,
  BalconyFurniture,
  OfficeFurniture,
  HotelLobbyFurniture,
  RestaurantFurniture,
  OutdoorFurniture
} from './RoomFurniture';

// Safe Texture Generator for Floor & Wall Slabs with Architectural Grout Joints & Bevel
const useSafeTileTexture = (tile, repeatX = 4, repeatY = 4) => {
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const imgUrl = tile?.images?.[0] || '';

    // Helper to draw realistic grout joint & bevel around every tile slab (as tiles are laid in a house)
    const drawGroutJointsAndBevel = (ctx) => {
      // 1. Realistic outer grout spacer joint between house tiles
      ctx.strokeStyle = 'rgba(150, 150, 150, 0.85)';
      ctx.lineWidth = 8;
      ctx.strokeRect(0, 0, 512, 512);

      // 2. Inner bevel highlight for 3D slab depth
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.lineWidth = 3;
      ctx.strokeRect(6, 6, 500, 500);

      // 3. Inner edge shadow
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.25)';
      ctx.lineWidth = 2;
      ctx.strokeRect(9, 9, 494, 494);
    };

    const createDefaultTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');

      ctx.fillStyle = tile?.color === 'Black' ? '#1E1E1E' : '#F4F4F4';
      ctx.fillRect(0, 0, 512, 512);

      ctx.strokeStyle = tile?.color === 'Black' ? 'rgba(212,175,55,0.35)' : 'rgba(0,0,0,0.12)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(50, 0);
      ctx.bezierCurveTo(200, 150, 100, 350, 450, 512);
      ctx.stroke();

      drawGroutJointsAndBevel(ctx);

      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(repeatX, repeatY);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.needsUpdate = true;
      if (isMounted) setTexture(tex);
    };

    if (!imgUrl) {
      createDefaultTexture();
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imgUrl;
    img.onload = () => {
      if (!isMounted) return;
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');

      ctx.drawImage(img, 0, 0, 512, 512);
      drawGroutJointsAndBevel(ctx);

      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(repeatX, repeatY);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.needsUpdate = true;
      setTexture(tex);
    };
    img.onerror = () => {
      if (isMounted) createDefaultTexture();
    };

    return () => {
      isMounted = false;
    };
  }, [tile, repeatX, repeatY]);

  return texture;
};

// Camera Reset Controller
const CameraResetter = ({ trigger }) => {
  const { camera } = useThree();
  const controlsRef = useRef(null);

  useEffect(() => {
    if (trigger > 0) {
      camera.position.set(0, 4.5, 12);
      camera.lookAt(0, 2.5, 0);
    }
  }, [trigger, camera]);

  return null;
};

// 360° Architectural Luxury Interior Room Scene
const LuxuryRoomScene = () => {
  const {
    activeRoom,
    activeLighting,
    selectedTileFloor,
    selectedTileWall,
    applyTarget,
    isCompareMode,
    compareTileA,
    compareTileB,
    compareSliderPos
  } = useRoom360();

  // Floor & Wall textures
  const floorTileToUse = isCompareMode
    ? (compareSliderPos > 50 ? compareTileA : compareTileB)
    : selectedTileFloor;

  const wallTileToUse = selectedTileWall || selectedTileFloor;

  const floorTexture = useSafeTileTexture(floorTileToUse || selectedTileFloor, 6, 6);
  const wallTexture = useSafeTileTexture(wallTileToUse || selectedTileFloor, 5, 3);

  const w = activeRoom.width;
  const l = activeRoom.length;
  const h = activeRoom.height;

  // Background color from lighting mode
  const bgHex = activeLighting.id === 'night' ? '#0A0C10' :
                activeLighting.id === 'evening' ? '#24140D' :
                activeLighting.id === 'morning' ? '#211814' : '#171A21';

  return (
    <>
      {/* Background / Sky */}
      <color attach="background" args={[bgHex]} />
      <fog attach="fog" args={[bgHex, 15, 60]} />

      {/* Dynamic Lighting from activeLighting mode */}
      <ambientLight
        color={activeLighting.color}
        intensity={activeLighting.ambientIntensity + 0.3}
      />
      <directionalLight
        position={[10, 20, 15]}
        color={activeLighting.color}
        intensity={activeLighting.dirIntensity}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      {/* Warm accent interior spotlight */}
      <spotLight
        position={[0, h - 1, 0]}
        angle={0.65}
        penumbra={0.5}
        intensity={2.2}
        color="#FFE5B4"
        castShadow
      />
      {/* Central interior fill light so all 4 walls are brightly illuminated */}
      <pointLight
        position={[0, h / 2, 0]}
        intensity={1.8}
        distance={35}
        color="#FFFFFF"
      />

      {/* 1. MAIN FLOOR MESH */}
      <mesh
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[w, l]} />
        <meshStandardMaterial
          map={floorTexture}
          roughness={selectedTileFloor?.finish === 'Glossy' ? 0.15 : 0.65}
          metalness={selectedTileFloor?.finish === 'Glossy' ? 0.25 : 0.05}
          color="#FFFFFF"
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 2. ARCHITECTURAL WALLS */}
      {/* Back Wall (North) */}
      <mesh position={[0, h / 2, -l / 2]} receiveShadow>
        <planeGeometry args={[w, h]} />
        <meshStandardMaterial
          map={wallTexture}
          color="#FFFFFF"
          roughness={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Front Wall (South) */}
      <mesh position={[0, h / 2, l / 2]} rotation={[0, Math.PI, 0]} receiveShadow>
        <planeGeometry args={[w, h]} />
        <meshStandardMaterial
          map={wallTexture}
          color="#FFFFFF"
          roughness={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Left Wall (West) */}
      <mesh position={[-w / 2, h / 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[l, h]} />
        <meshStandardMaterial
          map={wallTexture}
          color="#FFFFFF"
          roughness={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Right Wall (East) */}
      <mesh position={[w / 2, h / 2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[l, h]} />
        <meshStandardMaterial
          map={wallTexture}
          color="#FFFFFF"
          roughness={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 3. CEILING */}
      <mesh position={[0, h, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[w, l]} />
        <meshStandardMaterial color="#111317" roughness={0.9} />
      </mesh>

      {/* 4. ROOM-SPECIFIC ARCHITECTURAL FEATURES & FURNITURE ASSEMBLIES */}
      {activeRoom.id === 'living_room' && <LivingRoomFurniture />}
      {activeRoom.id === 'bathroom' && <BathroomFurniture />}
      {activeRoom.id === 'kitchen' && <KitchenFurniture />}
      {activeRoom.id === 'bedroom' && <BedroomFurniture />}
      {activeRoom.id === 'balcony' && <BalconyFurniture />}
      {activeRoom.id === 'office' && <OfficeFurniture />}
      {activeRoom.id === 'hotel_lobby' && <HotelLobbyFurniture />}
      {activeRoom.id === 'restaurant' && <RestaurantFurniture />}
      {activeRoom.id === 'outdoor' && <OutdoorFurniture />}
    </>
  );
};

// Main 360° Room Viewer Component
const RoomViewer = ({ canvasContainerRef }) => {
  const { isAutoRotate, cameraResetTrigger } = useRoom360();

  return (
    <div
      ref={canvasContainerRef}
      className="relative w-full h-full min-h-[460px] lg:min-h-[680px] bg-charcoal-950 rounded-3xl overflow-hidden shadow-2xl border border-gray-200/40 dark:border-charcoal-700 select-none"
    >
      <Canvas
        shadows
        camera={{ position: [0, 4.5, 12], fov: 60 }}
        gl={{ preserveDrawingBuffer: true, antialias: true }}
      >
        <Suspense fallback={null}>
          <LuxuryRoomScene />
        </Suspense>

        <CameraResetter trigger={cameraResetTrigger} />

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={3}
          maxDistance={28}
          maxPolarAngle={Math.PI / 2 - 0.05}
          autoRotate={isAutoRotate}
          autoRotateSpeed={1.0}
          rotateSpeed={0.7}
          dampingFactor={0.05}
        />
      </Canvas>

      {/* 360° Drag Instruction Badge */}
      <div className="absolute bottom-4 left-4 pointer-events-none z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold border border-white/15">
        <Compass className="w-3.5 h-3.5 text-gold animate-spin-slow" />
        <span>Drag to rotate 360° • Scroll to Zoom</span>
      </div>
    </div>
  );
};

export default RoomViewer;
