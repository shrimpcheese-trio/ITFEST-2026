"use client";

import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls, MeshReflectorMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useReducedMotion } from "motion/react";
import { CarModel } from "./car-model";
import { StudioEnvironment } from "./studio-environment";
import { ModelLoader } from "./model-loader";
import {
  getCarModel,
  type CarModelConfig,
  type FeaturePreset,
  type FeatureTabId,
} from "@/lib/config/models";

function CarRig({ model, tab }: { model: CarModelConfig; tab: FeatureTabId }) {
  const group = useRef<THREE.Group>(null);
  const yaw = useRef(model.features[tab].azimuth);

  useFrame(() => {
    if (!group.current) return;
    const target = model.features[tab].azimuth;
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
        modelUrl={model.modelUrl}
        overrides={model.features[tab].overrides}
        targetLength={model.targetLength}
      />
    </group>
  );
}

function TabLighting({ preset }: { preset: FeaturePreset }) {
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

function FloorDynamics({
  modelId,
  tab,
  light,
}: {
  modelId: string;
  tab: FeatureTabId;
  light: string;
}) {
  const reduceMotion = useReducedMotion();
  const glowMaterial = useRef<THREE.MeshBasicMaterial>(null);
  const ring = useRef<THREE.Mesh>(null);
  const ringMaterial = useRef<THREE.MeshBasicMaterial>(null);
  const state = useRef({
    color: new THREE.Color("#ffffff"),
    opacity: 0,
    ripple: -1,
    previousKey: `${modelId}:${tab}`,
  });

  useEffect(() => {
    const snapshot = state.current;
    snapshot.color.set(light);
    snapshot.opacity = 0.2;
    if (!reduceMotion && snapshot.previousKey !== `${modelId}:${tab}`) {
      snapshot.ripple = 0;
    }
    snapshot.previousKey = `${modelId}:${tab}`;
  }, [modelId, tab, light, reduceMotion]);

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

export function HeroScene({
  modelId,
  tab,
}: {
  modelId: string;
  tab: FeatureTabId;
}) {
  const reduceMotion = useReducedMotion();
  const model = getCarModel(modelId);
  const preset = model.features[tab];

  return (
    <>
      <color attach="background" args={["#ffffff"]} />
      <StudioEnvironment />
      <ambientLight intensity={0.55} />
      <TabLighting preset={preset} />
      <Suspense fallback={<ModelLoader />}>
        <CarRig model={model} tab={tab} />
      </Suspense>
      <ShowroomFloor />
      <FloorDynamics modelId={modelId} tab={tab} light={preset.light} />
      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        autoRotate={!reduceMotion}
        autoRotateSpeed={0.9}
        minPolarAngle={Math.PI / 2 - 0.38}
        maxPolarAngle={Math.PI / 2 + 0.05}
        target={[0, 1.0, 0]}
      />
    </>
  );
}
