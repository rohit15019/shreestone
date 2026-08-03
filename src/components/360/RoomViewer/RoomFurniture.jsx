import React from 'react';
import * as THREE from 'three';

/**
 * High-end architectural 3D interior furniture and decor assemblies
 * Built with optimized R3F primitives for instant loading, zero network lag, and 60 FPS rendering.
 */

export const LivingRoomFurniture = () => (
  <group position={[0, 0, -2]}>
    {/* L-Shaped Luxury Sectional Sofa */}
    <group position={[0, 0, 0]}>
      {/* Main sofa base */}
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[9, 1.2, 3.2]} />
        <meshStandardMaterial color="#E8E6E1" roughness={0.7} />
      </mesh>
      {/* Sofa backrest */}
      <mesh position={[0, 1.8, -1.2]} castShadow>
        <boxGeometry args={[9, 1.4, 0.8]} />
        <meshStandardMaterial color="#D9D7D2" roughness={0.7} />
      </mesh>
      {/* Chaise lounge extension on left */}
      <mesh position={[-3.2, 0.6, 2.2]} castShadow receiveShadow>
        <boxGeometry args={[2.6, 1.2, 4.4]} />
        <meshStandardMaterial color="#E8E6E1" roughness={0.7} />
      </mesh>
      {/* Gold metallic sofa legs */}
      {[-4, 0, 4].map((x, i) => (
        <mesh key={i} position={[x, 0.2, 1.2]}>
          <cylinderGeometry args={[0.08, 0.05, 0.4, 16]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}
    </group>

    {/* Luxury Glass & Gold Coffee Table */}
    <group position={[1.2, 0, 2.6]}>
      {/* Glass Top */}
      <mesh position={[0, 1.1, 0]} castShadow>
        <boxGeometry args={[4.2, 0.15, 2.4]} />
        <meshStandardMaterial color="#FFFFFF" transparent opacity={0.65} roughness={0.1} />
      </mesh>
      {/* Gold Structural Base */}
      <mesh position={[0, 0.55, 0]}>
        <boxGeometry args={[3.8, 1.1, 2.0]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.85} roughness={0.2} wireframe />
      </mesh>
      {/* Decorative centerpiece bowl */}
      <mesh position={[0, 1.3, 0]}>
        <cylinderGeometry args={[0.5, 0.3, 0.25, 24]} />
        <meshStandardMaterial color="#111827" roughness={0.2} />
      </mesh>
    </group>

    {/* Wall-Mounted 65" TV & Media Console against Back Wall */}
    <group position={[0, 0, -8.5]}>
      {/* Media Console Unit */}
      <mesh position={[0, 1.0, 0]} castShadow receiveShadow>
        <boxGeometry args={[10, 2.0, 1.6]} />
        <meshStandardMaterial color="#1F2937" roughness={0.4} />
      </mesh>
      {/* 65-inch Flat Screen TV */}
      <mesh position={[0, 5.2, -0.6]}>
        <boxGeometry args={[8.2, 4.6, 0.2]} />
        <meshStandardMaterial color="#000000" roughness={0.1} />
      </mesh>
      {/* Illuminated TV Screen display */}
      <mesh position={[0, 5.2, -0.48]}>
        <planeGeometry args={[8.0, 4.4]} />
        <meshBasicMaterial color="#38BDF8" />
      </mesh>
      <pointLight position={[0, 5.2, 1.5]} intensity={1.5} distance={12} color="#38BDF8" />
    </group>

    {/* Indoor Potted Monstera Plant (Right Corner) */}
    <group position={[6.5, 0, -7]}>
      {/* Ceramic Planter */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <cylinderGeometry args={[0.9, 0.7, 2.4, 24]} />
        <meshStandardMaterial color="#F9FAFB" roughness={0.3} />
      </mesh>
      {/* Foliage */}
      <mesh position={[0, 3.2, 0]}>
        <sphereGeometry args={[1.6, 16, 16]} />
        <meshStandardMaterial color="#15803D" roughness={0.6} />
      </mesh>
    </group>
  </group>
);

export const BathroomFurniture = () => (
  <group position={[0, 0, -1]}>
    {/* Freestanding Oval Soaking Bathtub */}
    <group position={[-2.5, 0, -2]}>
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.8, 2.2, 2.8, 32]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.08} />
      </mesh>
      {/* Tub Water basin */}
      <mesh position={[0, 2.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.5, 32]} />
        <meshStandardMaterial color="#38BDF8" transparent opacity={0.6} roughness={0.1} />
      </mesh>
      {/* Polished Gold Stand Faucet */}
      <mesh position={[3.2, 2.6, 0]}>
        <cylinderGeometry args={[0.1, 0.15, 5.2, 16]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.15} />
      </mesh>
    </group>

    {/* Luxury Double Vanity Sink Counter */}
    <group position={[3.5, 0, -3]}>
      {/* Cabinet Base */}
      <mesh position={[0, 1.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[6.5, 3.6, 2.4]} />
        <meshStandardMaterial color="#1E293B" roughness={0.4} />
      </mesh>
      {/* Marble Countertop */}
      <mesh position={[0, 3.65, 0]}>
        <boxGeometry args={[6.8, 0.2, 2.6]} />
        <meshStandardMaterial color="#F8FAFC" roughness={0.2} />
      </mesh>
      {/* Dual Gold-Framed LED Mirrors on wall */}
      {[-1.6, 1.6].map((x, i) => (
        <group key={i} position={[x, 6.2, -1.1]}>
          <mesh>
            <boxGeometry args={[2.4, 3.4, 0.1]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0, 0.08]}>
            <planeGeometry args={[2.2, 3.2]} />
            <meshStandardMaterial color="#E2E8F0" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      ))}
      <pointLight position={[0, 6, 1]} intensity={1.5} distance={10} color="#FDE047" />
    </group>

    {/* Glass Shower Partition */}
    <group position={[-5, 4, 3]}>
      <mesh>
        <boxGeometry args={[0.15, 8, 5]} />
        <meshStandardMaterial color="#93C5FD" transparent opacity={0.35} roughness={0.1} />
      </mesh>
    </group>
  </group>
);

export const KitchenFurniture = () => (
  <group position={[0, 0, 0]}>
    {/* Gourmet Marble Waterfall Kitchen Island */}
    <group position={[0, 0, 1]}>
      {/* Island base */}
      <mesh position={[0, 1.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[11, 3.6, 4.0]} />
        <meshStandardMaterial color="#1E293B" roughness={0.3} />
      </mesh>
      {/* Waterfall Marble Top */}
      <mesh position={[0, 3.7, 0]}>
        <boxGeometry args={[11.4, 0.3, 4.4]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.15} />
      </mesh>
      {/* Gold Breakfast Bar Stools */}
      {[-3, 0, 3].map((x, i) => (
        <group key={i} position={[x, 0, 3.2]}>
          <mesh position={[0, 1.4, 0]}>
            <cylinderGeometry args={[0.7, 0.7, 0.2, 24]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.7, 0]}>
            <cylinderGeometry args={[0.1, 0.3, 1.4, 16]} />
            <meshStandardMaterial color="#0F172A" roughness={0.4} />
          </mesh>
        </group>
      ))}
      {/* Triple Hanging Gold Pendant Lights */}
      {[-3.5, 0, 3.5].map((x, i) => (
        <group key={i} position={[x, 8, 0]}>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.5, 0.9, 1.2, 24]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
          </mesh>
          <pointLight position={[0, -0.8, 0]} intensity={1.2} distance={8} color="#FEF08A" />
        </group>
      ))}
    </group>

    {/* Back Wall Kitchen Cabinetry & Appliances */}
    <group position={[0, 0, -7]}>
      <mesh position={[0, 3.5, 0]} castShadow>
        <boxGeometry args={[14, 7.0, 2.0]} />
        <meshStandardMaterial color="#334155" roughness={0.5} />
      </mesh>
      {/* Stainless Steel Oven Built-in */}
      <mesh position={[0, 2.8, 1.05]}>
        <boxGeometry args={[3.2, 3.2, 0.1]} />
        <meshStandardMaterial color="#94A3B8" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  </group>
);

export const BedroomFurniture = () => (
  <group position={[0, 0, -1]}>
    {/* King Platform Bed */}
    <group position={[0, 0, -1]}>
      {/* Bed Base */}
      <mesh position={[0, 1.0, 0]} castShadow receiveShadow>
        <boxGeometry args={[7.4, 2.0, 7.8]} />
        <meshStandardMaterial color="#27272A" roughness={0.6} />
      </mesh>
      {/* Mattress & White Linens */}
      <mesh position={[0, 2.2, 0.3]}>
        <boxGeometry args={[6.8, 0.8, 7.0]} />
        <meshStandardMaterial color="#F8FAFC" roughness={0.4} />
      </mesh>
      {/* Upholstered Headboard with Gold Trim */}
      <mesh position={[0, 3.8, -3.6]}>
        <boxGeometry args={[8.0, 5.0, 0.6]} />
        <meshStandardMaterial color="#3F3F46" roughness={0.7} />
      </mesh>
      <mesh position={[0, 6.4, -3.55]}>
        <boxGeometry args={[8.2, 0.3, 0.5]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Layered Pillows */}
      {[-1.8, 1.8].map((x, i) => (
        <mesh key={i} position={[x, 2.8, -2.5]} rotation={[0.4, 0, 0]}>
          <boxGeometry args={[2.4, 0.8, 1.4]} />
          <meshStandardMaterial color="#E2E8F0" roughness={0.5} />
        </mesh>
      ))}
    </group>

    {/* Bedside Nightstands & Lamps */}
    {[-5.2, 5.2].map((x, i) => (
      <group key={i} position={[x, 0, -4]}>
        <mesh position={[0, 1.4, 0]} castShadow>
          <boxGeometry args={[2.2, 2.8, 2.2]} />
          <meshStandardMaterial color="#1E293B" roughness={0.5} />
        </mesh>
        {/* Bedside Lamp */}
        <mesh position={[0, 3.2, 0]}>
          <cylinderGeometry args={[0.6, 0.8, 1.2, 24]} />
          <meshStandardMaterial color="#FDE047" roughness={0.3} />
        </mesh>
        <pointLight position={[0, 3.5, 0]} intensity={1.0} distance={7} color="#FEF08A" />
      </group>
    ))}

    {/* Bedroom Seating Bench at Foot of Bed */}
    <group position={[0, 0, 4.2]}>
      <mesh position={[0, 1.0, 0]} castShadow>
        <boxGeometry args={[6.0, 1.2, 1.8]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  </group>
);

export const BalconyFurniture = () => (
  <group position={[0, 0, 2]}>
    {/* Glass Balustrade Balcony Railing */}
    <group position={[0, 0, 6.5]}>
      <mesh position={[0, 2.2, 0]}>
        <boxGeometry args={[19, 4.4, 0.2]} />
        <meshStandardMaterial color="#7DD3FC" transparent opacity={0.35} roughness={0.1} />
      </mesh>
      {/* Gold Top Handrail */}
      <mesh position={[0, 4.5, 0]}>
        <boxGeometry args={[19.2, 0.3, 0.4]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>

    {/* Bistro Patio Table & 2 Chairs */}
    <group position={[0, 0, 1]}>
      <mesh position={[0, 2.2, 0]} castShadow>
        <cylinderGeometry args={[2.2, 2.2, 0.15, 32]} />
        <meshStandardMaterial color="#334155" roughness={0.3} />
      </mesh>
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.2, 0.6, 2.2, 16]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Bistro Chairs */}
      {[-3, 3].map((x, i) => (
        <group key={i} position={[x, 0, 0]}>
          <mesh position={[0, 1.4, 0]} castShadow>
            <boxGeometry args={[1.6, 1.4, 1.6]} />
            <meshStandardMaterial color="#475569" roughness={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  </group>
);

export const OfficeFurniture = () => (
  <group position={[0, 0, -1]}>
    {/* Executive Desk */}
    <group position={[0, 0, 0]}>
      <mesh position={[0, 2.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[9.5, 0.35, 4.8]} />
        <meshStandardMaterial color="#1E293B" roughness={0.3} />
      </mesh>
      {/* Gold Desk Legs */}
      {[-4.2, 4.2].map((x, i) => (
        <mesh key={i} position={[x, 1.3, 0]}>
          <boxGeometry args={[0.4, 2.6, 4.2]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
      {/* Laptop on desk */}
      <mesh position={[0, 2.85, 0.5]}>
        <boxGeometry args={[1.4, 0.1, 1.0]} />
        <meshStandardMaterial color="#64748B" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>

    {/* Executive Office Swivel Chair */}
    <group position={[0, 0, -3.2]}>
      <mesh position={[0, 1.8, 0]} castShadow>
        <boxGeometry args={[2.2, 1.6, 2.2]} />
        <meshStandardMaterial color="#0F172A" roughness={0.5} />
      </mesh>
      <mesh position={[0, 3.2, -0.9]}>
        <boxGeometry args={[2.2, 2.8, 0.4]} />
        <meshStandardMaterial color="#0F172A" roughness={0.5} />
      </mesh>
    </group>

    {/* Architectural Bookshelf Wall */}
    <group position={[0, 0, -8]}>
      <mesh position={[0, 4.5, 0]} castShadow>
        <boxGeometry args={[14, 9, 1.4]} />
        <meshStandardMaterial color="#1E293B" roughness={0.5} />
      </mesh>
    </group>
  </group>
);

export const HotelLobbyFurniture = () => (
  <group position={[0, 0, -2]}>
    {/* 5-Star Reception Desk & Gold Logo Wall */}
    <group position={[0, 0, -6]}>
      <mesh position={[0, 2.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[14, 4.4, 3.6]} />
        <meshStandardMaterial color="#0F172A" roughness={0.3} />
      </mesh>
      {/* Glowing Gold Accent Front Panel */}
      <mesh position={[0, 2.2, 1.85]}>
        <boxGeometry args={[12, 3.8, 0.1]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>

    {/* Spectacular Multi-Tiered Golden Chandelier */}
    <group position={[0, 12, 0]}>
      <mesh>
        <cylinderGeometry args={[4.5, 3.0, 1.8, 32]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.15} />
      </mesh>
      <mesh position={[0, -1.2, 0]}>
        <cylinderGeometry args={[2.5, 1.5, 1.2, 32]} />
        <meshStandardMaterial color="#FDE047" metalness={0.6} roughness={0.2} />
      </mesh>
      <pointLight position={[0, -2, 0]} intensity={3.5} distance={25} color="#FEF08A" />
    </group>

    {/* Lobby Centerpiece Floral Table */}
    <group position={[0, 0, 3]}>
      <mesh position={[0, 1.6, 0]} castShadow>
        <cylinderGeometry args={[2.8, 2.8, 0.25, 32]} />
        <meshStandardMaterial color="#1E293B" roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.8, 1.4, 1.6, 24]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  </group>
);

export const RestaurantFurniture = () => (
  <group position={[0, 0, 0]}>
    {/* Multiple Intimate Dining Tables around hall */}
    {[[-4, 0, -3], [4, 0, -3], [-4, 0, 3], [4, 0, 3]].map((pos, i) => (
      <group key={i} position={pos}>
        {/* Table top */}
        <mesh position={[0, 2.4, 0]} castShadow>
          <cylinderGeometry args={[2.2, 2.2, 0.15, 32]} />
          <meshStandardMaterial color="#1E293B" roughness={0.3} />
        </mesh>
        {/* Table pedestal */}
        <mesh position={[0, 1.2, 0]}>
          <cylinderGeometry args={[0.25, 0.6, 2.4, 16]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.85} roughness={0.2} />
        </mesh>
        {/* Warm Pendant Light above table */}
        <pointLight position={[0, 6, 0]} intensity={1.5} distance={10} color="#FDE047" />
      </group>
    ))}
  </group>
);

export const OutdoorFurniture = () => (
  <group position={[0, 0, -2]}>
    {/* Crystal Blue Infinity Swimming Pool */}
    <group position={[0, 0, -2]}>
      {/* Pool Basin Border */}
      <mesh position={[0, 0.4, 0]} receiveShadow>
        <boxGeometry args={[16, 0.8, 10]} />
        <meshStandardMaterial color="#E2E8F0" roughness={0.4} />
      </mesh>
      {/* Pool Water Surface */}
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[15.2, 0.1, 9.2]} />
        <meshStandardMaterial color="#0284C7" roughness={0.1} metalness={0.2} />
      </mesh>
    </group>

    {/* Luxury Cabana Loungers */}
    {[-5, 5].map((x, i) => (
      <group key={i} position={[x, 0, 5]}>
        <mesh position={[0, 0.8, 0]} castShadow>
          <boxGeometry args={[2.4, 1.0, 5.0]} />
          <meshStandardMaterial color="#F8FAFC" roughness={0.5} />
        </mesh>
      </group>
    ))}
  </group>
);
