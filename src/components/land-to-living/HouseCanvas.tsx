"use client";

import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import HouseModel3D from "./HouseModel3D";

interface HouseCanvasProps {
  stage: number;
  progress: number;
}

export default function HouseCanvas({ stage, progress }: HouseCanvasProps) {
  const [mounted, setMounted] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    setMounted(true);
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full min-h-[380px] flex items-center justify-center bg-[#F5F8EF] rounded-3xl">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-2 border-[#08482D] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-[#5E5E61] font-medium">Preparing 3D Architectural Scene...</p>
        </div>
      </div>
    );
  }

  if (!hasWebGL) {
    return (
      <div className="w-full h-full min-h-[380px] flex flex-col items-center justify-center bg-[#FBFBF7] border border-[#DAE7C7] rounded-3xl p-8 text-center">
        <span className="text-5xl mb-3">🏡</span>
        <h4 className="font-semibold text-[#08482D] text-lg">3D Architectural Preview</h4>
        <p className="text-xs text-[#5E5E61] max-w-xs mt-1">
          Stage {stage + 1} of 7: Interactive 3D visualization active on supported hardware.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[380px] sm:min-h-[460px] relative select-none rounded-3xl overflow-hidden bg-gradient-to-b from-[#F5F8EF] to-[#EDF4E4] border border-[#DAE7C7]/60 shadow-inner">
      <Canvas
        shadows
        camera={{ position: [4.2, 3.2, 4.8], fov: 42 }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.85} />
        <directionalLight
          position={[6, 8, 4]}
          intensity={1.4}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={20}
          shadow-camera-left={-4}
          shadow-camera-right={4}
          shadow-camera-top={4}
          shadow-camera-bottom={-4}
        />
        <directionalLight position={[-4, 3, -4]} intensity={0.4} color="#C9A96E" />

        <Suspense fallback={null}>
          <HouseModel3D stage={stage} progress={progress} />
          <ContactShadows
            position={[0, -0.65, 0]}
            opacity={0.45}
            scale={7}
            blur={2}
            far={4}
          />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.1}
          rotateSpeed={0.6}
        />
      </Canvas>

      {/* Orbit Tip Pill */}
      <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-medium text-[#08482D] border border-[#DAE7C7] flex items-center gap-1.5 shadow-sm pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#08482D] animate-ping" />
        Drag to rotate 3D view
      </div>
    </div>
  );
}
