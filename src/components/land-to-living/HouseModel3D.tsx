"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface HouseModelProps {
  stage: number; // 0 to 6
  progress: number; // 0 to 1 overall progress
}

export default function HouseModel3D({ stage, progress }: HouseModelProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Subtle continuous architectural turntable rotation
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  // Calculate layer opacities and scales based on active stage
  // stage 0: Land
  // stage 1: Foundation
  // stage 2: Structure (Columns/Beams)
  // stage 3: Brick Enclosure & Roof
  // stage 4: Finishing & Windows
  // stage 5: Interior Lighting & Glow
  // stage 6: Handover & Landscaping
  const hasFoundation = stage >= 1;
  const hasStructure = stage >= 2;
  const hasWallsRoof = stage >= 3;
  const hasFinishing = stage >= 4;
  const hasInterior = stage >= 5;
  const hasHandover = stage >= 6;

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      {/* ─── STAGE 0: LAND & PLOT ────────────────────────────────────────── */}
      {/* Base Plot Terrain */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[4.2, 0.1, 4.2]} />
        <meshStandardMaterial
          color={stage === 0 ? "#789262" : "#8DA875"}
          roughness={0.9}
        />
      </mesh>

      {/* Plot Boundary Markings (Pegs & Grid) */}
      <gridHelper
        args={[4.2, 14, "#08482D", "#C9A96E"]}
        position={[0, 0.01, 0]}
      />

      {/* Survey corner boundary pegs */}
      {[
        [-1.9, 0.2, -1.9],
        [1.9, 0.2, -1.9],
        [-1.9, 0.2, 1.9],
        [1.9, 0.2, 1.9],
      ].map(([x, y, z], idx) => (
        <group key={idx} position={[x, y, z]}>
          <mesh>
            <cylinderGeometry args={[0.04, 0.04, 0.4, 8]} />
            <meshStandardMaterial color="#C9A96E" metalness={0.2} roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.22, 0]}>
            <coneGeometry args={[0.07, 0.1, 8]} />
            <meshStandardMaterial color="#08482D" />
          </mesh>
        </group>
      ))}

      {/* ─── STAGE 1: FOUNDATION & EXCAVATION ──────────────────────────── */}
      {hasFoundation && (
        <group position={[0, 0.05, 0]}>
          {/* Excavated Trenches / Plinth Beam */}
          <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.8, 0.16, 2.4]} />
            <meshStandardMaterial color="#55585C" roughness={0.8} />
          </mesh>

          {/* RCC Isolated Footings */}
          {[
            [-1.2, 0.04, -1.0],
            [1.2, 0.04, -1.0],
            [-1.2, 0.04, 1.0],
            [1.2, 0.04, 1.0],
            [0, 0.04, -1.0],
            [0, 0.04, 1.0],
          ].map(([x, y, z], idx) => (
            <mesh key={idx} position={[x, y, z]} castShadow>
              <boxGeometry args={[0.45, 0.12, 0.45]} />
              <meshStandardMaterial color="#737880" roughness={0.7} />
            </mesh>
          ))}
        </group>
      )}

      {/* ─── STAGE 2: RCC STRUCTURE (COLUMNS & BEAMS) ──────────────────── */}
      {hasStructure && (
        <group position={[0, 0.2, 0]}>
          {/* 6 Vertical RCC Columns */}
          {[
            [-1.2, 0.65, -1.0],
            [1.2, 0.65, -1.0],
            [-1.2, 0.65, 1.0],
            [1.2, 0.65, 1.0],
            [0, 0.65, -1.0],
            [0, 0.65, 1.0],
          ].map(([x, y, z], idx) => (
            <mesh key={idx} position={[x, y, z]} castShadow>
              <boxGeometry args={[0.16, 1.3, 0.16]} />
              <meshStandardMaterial color="#9AA0A6" roughness={0.6} />
            </mesh>
          ))}

          {/* Roof Framing Beams */}
          <mesh position={[0, 1.3, -1.0]} castShadow>
            <boxGeometry args={[2.6, 0.14, 0.16]} />
            <meshStandardMaterial color="#80868B" />
          </mesh>
          <mesh position={[0, 1.3, 1.0]} castShadow>
            <boxGeometry args={[2.6, 0.14, 0.16]} />
            <meshStandardMaterial color="#80868B" />
          </mesh>
          <mesh position={[-1.2, 1.3, 0]} castShadow>
            <boxGeometry args={[0.16, 0.14, 2.16]} />
            <meshStandardMaterial color="#80868B" />
          </mesh>
          <mesh position={[1.2, 1.3, 0]} castShadow>
            <boxGeometry args={[0.16, 0.14, 2.16]} />
            <meshStandardMaterial color="#80868B" />
          </mesh>
        </group>
      )}

      {/* ─── STAGE 3: BRICK ENCLOSURE & ROOF SLAB ──────────────────────── */}
      {hasWallsRoof && (
        <group position={[0, 0.2, 0]}>
          {/* Terracotta/Red Clay Brick Walls */}
          {/* Back Wall */}
          <mesh position={[0, 0.65, -1.0]} castShadow>
            <boxGeometry args={[2.4, 1.2, 0.12]} />
            <meshStandardMaterial
              color={hasFinishing ? "#F5EFE6" : "#A64D3B"}
              roughness={0.8}
            />
          </mesh>

          {/* Left Wall with window cutout aesthetic */}
          <mesh position={[-1.2, 0.65, 0]} castShadow>
            <boxGeometry args={[0.12, 1.2, 2.0]} />
            <meshStandardMaterial
              color={hasFinishing ? "#F5EFE6" : "#A64D3B"}
              roughness={0.8}
            />
          </mesh>

          {/* Right Wall */}
          <mesh position={[1.2, 0.65, 0]} castShadow>
            <boxGeometry args={[0.12, 1.2, 2.0]} />
            <meshStandardMaterial
              color={hasFinishing ? "#F5EFE6" : "#A64D3B"}
              roughness={0.8}
            />
          </mesh>

          {/* Front Wall (Sectioned for Door & Window) */}
          <mesh position={[-0.7, 0.65, 1.0]} castShadow>
            <boxGeometry args={[0.9, 1.2, 0.12]} />
            <meshStandardMaterial
              color={hasFinishing ? "#F5EFE6" : "#A64D3B"}
              roughness={0.8}
            />
          </mesh>
          <mesh position={[0.7, 0.65, 1.0]} castShadow>
            <boxGeometry args={[0.9, 1.2, 0.12]} />
            <meshStandardMaterial
              color={hasFinishing ? "#F5EFE6" : "#A64D3B"}
              roughness={0.8}
            />
          </mesh>
          {/* Lintel above door */}
          <mesh position={[0, 1.05, 1.0]} castShadow>
            <boxGeometry args={[0.6, 0.4, 0.12]} />
            <meshStandardMaterial
              color={hasFinishing ? "#F5EFE6" : "#A64D3B"}
              roughness={0.8}
            />
          </mesh>

          {/* Weatherproof Concrete Roof Slab */}
          <mesh position={[0, 1.38, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.8, 0.14, 2.4]} />
            <meshStandardMaterial
              color={hasFinishing ? "#E0D7C6" : "#555A60"}
              roughness={0.5}
            />
          </mesh>

          {/* Parapet Wall */}
          <mesh position={[0, 1.55, -1.14]} castShadow>
            <boxGeometry args={[2.8, 0.22, 0.08]} />
            <meshStandardMaterial color={hasFinishing ? "#E0D7C6" : "#8A9096"} />
          </mesh>
          <mesh position={[-1.34, 1.55, 0]} castShadow>
            <boxGeometry args={[0.08, 0.22, 2.36]} />
            <meshStandardMaterial color={hasFinishing ? "#E0D7C6" : "#8A9096"} />
          </mesh>
          <mesh position={[1.34, 1.55, 0]} castShadow>
            <boxGeometry args={[0.08, 0.22, 2.36]} />
            <meshStandardMaterial color={hasFinishing ? "#E0D7C6" : "#8A9096"} />
          </mesh>
        </group>
      )}

      {/* ─── STAGE 4: FINISHING, DOORS, GLASS WINDOWS ──────────────────── */}
      {hasFinishing && (
        <group position={[0, 0.2, 0]}>
          {/* Luxury Teak Main Entrance Door */}
          <mesh position={[0, 0.45, 1.04]} castShadow>
            <boxGeometry args={[0.54, 0.82, 0.04]} />
            <meshStandardMaterial color="#4A2511" roughness={0.4} />
          </mesh>
          {/* Brass Door Handle */}
          <mesh position={[0.2, 0.45, 1.07]}>
            <sphereGeometry args={[0.02, 12, 12]} />
            <meshStandardMaterial color="#C9A96E" metalness={0.9} roughness={0.2} />
          </mesh>

          {/* Large Architectural Glass Windows */}
          {/* Front Window Left */}
          <mesh position={[-0.7, 0.65, 1.02]}>
            <boxGeometry args={[0.55, 0.6, 0.02]} />
            <meshStandardMaterial
              color="#A0D8EF"
              transparent
              opacity={0.65}
              roughness={0.1}
              metalness={0.8}
            />
          </mesh>
          {/* Front Window Right */}
          <mesh position={[0.7, 0.65, 1.02]}>
            <boxGeometry args={[0.55, 0.6, 0.02]} />
            <meshStandardMaterial
              color="#A0D8EF"
              transparent
              opacity={0.65}
              roughness={0.1}
              metalness={0.8}
            />
          </mesh>

          {/* Contemporary Wood Cladding Feature Accent */}
          <mesh position={[-0.7, 1.1, 1.05]}>
            <boxGeometry args={[0.8, 0.15, 0.03]} />
            <meshStandardMaterial color="#C9A96E" roughness={0.4} />
          </mesh>
        </group>
      )}

      {/* ─── STAGE 5: INTERIOR DESIGN & WARM AMBIENT GLOW ─────────────── */}
      {hasInterior && (
        <group position={[0, 0.4, 0]}>
          {/* Warm interior point light */}
          <pointLight
            position={[0, 0.7, 0]}
            color="#FFD699"
            intensity={2.8}
            distance={3.5}
            decay={2}
          />

          {/* Minimalist Interior Furniture Silhouettes */}
          {/* Dining / Living table */}
          <mesh position={[0, 0.15, 0]} castShadow>
            <boxGeometry args={[0.8, 0.08, 0.5]} />
            <meshStandardMaterial color="#2B1E16" />
          </mesh>
          {/* Warm Rug */}
          <mesh position={[0, 0.02, 0]} receiveShadow>
            <boxGeometry args={[1.2, 0.01, 0.9]} />
            <meshStandardMaterial color="#E8D5B0" roughness={0.9} />
          </mesh>
          {/* Interior Sofa */}
          <mesh position={[-0.5, 0.22, -0.4]} castShadow>
            <boxGeometry args={[0.7, 0.25, 0.4]} />
            <meshStandardMaterial color="#1B4332" />
          </mesh>
        </group>
      )}

      {/* ─── STAGE 6: HANDOVER, LANDSCAPING & CELEBRATION ─────────────── */}
      {hasHandover && (
        <group position={[0, 0, 0]}>
          {/* Cobblestone Paved Pathway */}
          <mesh position={[0, 0.02, 1.5]} receiveShadow>
            <boxGeometry args={[0.8, 0.02, 1.0]} />
            <meshStandardMaterial color="#D3CBC0" roughness={0.8} />
          </mesh>

          {/* Landscaped Decorative Bushes / Trees */}
          {[
            [-1.5, 0.25, 1.4],
            [1.5, 0.25, 1.4],
            [-1.5, 0.25, -1.4],
            [1.5, 0.25, -1.4],
          ].map(([x, y, z], idx) => (
            <group key={idx} position={[x, y, z]}>
              <mesh position={[0, -0.1, 0]}>
                <cylinderGeometry args={[0.04, 0.05, 0.2, 8]} />
                <meshStandardMaterial color="#5C3A21" />
              </mesh>
              <mesh position={[0, 0.12, 0]}>
                <sphereGeometry args={[0.22, 12, 12]} />
                <meshStandardMaterial color="#2D6A4F" roughness={0.7} />
              </mesh>
            </group>
          ))}

          {/* Golden Floating "Dream Home Key" Symbolic Emblem */}
          <group position={[0, 2.1, 0]}>
            <mesh>
              <torusGeometry args={[0.2, 0.04, 16, 32]} />
              <meshStandardMaterial
                color="#C9A96E"
                metalness={0.9}
                roughness={0.2}
                emissive="#947438"
                emissiveIntensity={0.3}
              />
            </mesh>
            <mesh position={[0, -0.22, 0]}>
              <boxGeometry args={[0.07, 0.28, 0.04]} />
              <meshStandardMaterial
                color="#C9A96E"
                metalness={0.9}
                roughness={0.2}
              />
            </mesh>
            <mesh position={[0.08, -0.3, 0]}>
              <boxGeometry args={[0.1, 0.06, 0.04]} />
              <meshStandardMaterial
                color="#C9A96E"
                metalness={0.9}
                roughness={0.2}
              />
            </mesh>
          </group>
        </group>
      )}
    </group>
  );
}
