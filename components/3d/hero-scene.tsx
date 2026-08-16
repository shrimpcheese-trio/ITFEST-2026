"use client";

import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls, MeshReflectorMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useReducedMotion } from "motion/react";
import { CarModel, type MaterialOverrides } from "./car-model";
import { StudioEnvironment } from "./studio-environment";
import { ModelLoader } from "./model-loader";

export type HeroTab = "performance" | "design" | "safety" | "luxury" | "multimedia";

type TabPreset = {
  overrides: MaterialOverrides;
  azimuth: number;
  light: string;
  intensity: number;
};

export const HERO_TABS: Record<HeroTab, TabPreset> = {
  performance: {
    overrides: {
      "Car_Paint": { color: "#c8102e", clearcoat: 0.9, metalness: 0.85, roughness: 0.22 },
      "Carbon_Fiber_Procedural": { metalness: 0.95, roughness: 0.3 },
      "Carbon_Fiber_04": { metalness: 0.95, roughness: 0.32 },
    },
    azimuth: 0,
    light: "#ffffff",
    intensity: 1.1,
  },
  design: {
    overrides: {
      "Car_Paint": { color: "#c9cfd6", clearcoat: 1, metalness: 0.95, roughness: 0.16 },
      "Car_chrome": { color: "#d7dce2", metalness: 1, roughness: 0.12 },
    },
    azimuth: Math.PI * 0.14,
    light: "#ffffff",
    intensity: 0.95,
  },
  safety: {
    overrides: {
      "Car_Paint": { color: "#2b2d31", clearcoat: 0.9, metalness: 0.7, roughness: 0.3 },
      "Red_car_lights_glass": { emissive: "#ff2a1a", emissiveIntensity: 1.4 },
      "11_Break_Disc.001": { color: "#aab1ba", metalness: 0.95, roughness: 0.28 },
    },
    azimuth: Math.PI * -0.14,
    light: "#dbe6ff",
    intensity: 1.2,
  },
  luxury: {
    overrides: {
      "Car_Paint": { color: "#6d5a44", clearcoat: 1, metalness: 0.85, roughness: 0.18 },
      "Car_leather_red.001": { color: "#7c2a2c", roughness: 0.55 },
      "Leather_Small_pads.001": { color: "#8a3131", roughness: 0.55 },
    },
    azimuth: Math.PI * 0.28,
    light: "#ffd9a3",
    intensity: 0.9,
  },
  multimedia: {
    overrides: {
      "Car_Paint": { color: "#3d3f46", clearcoat: 0.9, metalness: 0.8, roughness: 0.24 },
      "Material.002": { emissive: "#7fd8ff", emissiveIntensity: 1.7 },
      "Bulb_Emmision_Light": { emissive: "#ffe9c4", emissiveIntensity: 2.2 },
    },
    azimuth: Math.PI * -0.28,
    light: "#bfe0ff",
    intensity: 1,
  },
};

function CarRig({ tab }: { tab: HeroTab }) {
  const group = useRef<THREE.Group>(null);
  const yaw = useRef(HERO_TABS[tab].azimuth);

  useFrame(() => {
    if (!group.current) return;
    const target = HERO_TABS[tab].azimuth;
    const diff = Math.atan2(
      Math.sin(target - yaw.current),
      Math.cos(target - yaw.current),
    );
    yaw.current += diff * 0.07;
    group.current.rotation.y = yaw.current;
  });

  return (
    <group ref={group} position={[0, 0.55, 0]}>
      <CarModel
        overrides={HERO_TABS[tab].overrides}
        targetLength={3.6}
      />
    </group>
  );
}

function TabLighting({ tab }: { tab: HeroTab }) {
  const preset = HERO_TABS[tab];
  return (
    <>
      <directionalLight
        position={[4, 6, 4]}
        intensity={preset.intensity}
        color={preset.light}
      />
      <directionalLight position={[-6, 2.5, -3]} intensity={0.35} color="#aeb9e8" />
    </>
  );
}

function ShowroomFloor() {
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, 0.52, 0]}>
      <planeGeometry args={[60, 42]} />
      <MeshReflectorMaterial
        blur={[300, 100]}
        resolution={1024}
        mixBlur={1}
        mixStrength={42}
        roughness={0.95}
        depthScale={1.1}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#121212"
        metalness={0.6}
        mirror={0.75}
      />
    </mesh>
  );
}

let glowTexture: THREE.Texture | null = null;

function getGlowTexture() {
  if (glowTexture) return glowTexture;
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const context = canvas.getContext("2d");
  if (!context) {
    glowTexture = new THREE.Texture();
    return glowTexture;
  }
  const gradient = context.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.55, "rgba(255,255,255,0.45)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);
  glowTexture = new THREE.CanvasTexture(canvas);
  glowTexture.colorSpace = THREE.SRGBColorSpace;
  return glowTexture;
}

function FloorDynamics({ tab }: { tab: HeroTab }) {
  const reduceMotion = useReducedMotion();
  const glowMaterial = useRef<THREE.MeshBasicMaterial>(null);
  const ring = useRef<THREE.Mesh>(null);
  const ringMaterial = useRef<THREE.MeshBasicMaterial>(null);
  const state = useRef({
    color: new THREE.Color("#ffffff"),
    opacity: 0,
    ripple: -1,
    previousTab: null as HeroTab | null,
  });

  useEffect(() => {
    const snapshot = state.current;
    snapshot.color.set(HERO_TABS[tab].light);
    snapshot.opacity = 0.2;
    if (!reduceMotion && snapshot.previousTab !== null) {
      snapshot.ripple = 0;
    }
    snapshot.previousTab = tab;
  }, [tab, reduceMotion]);

  useFrame((_, delta) => {
    const snapshot = state.current;
    const glow = glowMaterial.current;
    const ringMesh = ring.current;
    const ringPaint = ringMaterial.current;
    if (!glow || !ringMesh || !ringPaint) return;

    if (!glow.color.equals(snapshot.color)) {
      glow.color.lerp(snapshot.color, 0.08);
    }
    if (Math.abs(glow.opacity - snapshot.opacity) > 0.01) {
      glow.opacity += (snapshot.opacity - glow.opacity) * 0.08;
    }

    if (snapshot.ripple >= 0 && snapshot.ripple < 1) {
      snapshot.ripple += delta / 0.9;
      const progress = Math.min(snapshot.ripple, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      ringMesh.visible = true;
      ringMesh.scale.setScalar(1 + eased * 4.5);
      ringPaint.opacity = Math.pow(1 - progress, 1.4) * 0.55;
    } else if (snapshot.ripple >= 1) {
      snapshot.ripple = -1;
      ringMesh.visible = false;
    }
  });

  return (
    <>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.521, 0]}>
        <circleGeometry args={[5.5, 48]} />
        <meshBasicMaterial
          ref={glowMaterial}
          map={getGlowTexture()}
          color="#ffffff"
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <mesh
        ref={ring}
        rotation-x={-Math.PI / 2}
        position={[0, 0.523, 0]}
        visible={false}
      >
        <ringGeometry args={[1, 1.06, 64]} />
        <meshBasicMaterial
          ref={ringMaterial}
          color="#ffffff"
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </>
  );
}

export function HeroScene({ tab }: { tab: HeroTab }) {
  return (
    <>
      <color attach="background" args={["#ffffff"]} />
      <StudioEnvironment />
      <ambientLight intensity={0.55} />
      <TabLighting tab={tab} />
      <Suspense fallback={<ModelLoader />}>
        <CarRig tab={tab} />
      </Suspense>
      <ShowroomFloor />
      <FloorDynamics tab={tab} />
      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.9}
        minPolarAngle={Math.PI / 2 - 0.38}
        maxPolarAngle={Math.PI / 2 + 0.05}
        target={[0, 1.0, 0]}
      />
    </>
  );
}