"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

export const DEFAULT_MODEL_URL = "/models/car.glb";

export type MaterialOverride = {
  color?: string;
  emissive?: string;
  emissiveIntensity?: number;
  metalness?: number;
  roughness?: number;
  clearcoat?: number;
};

export type MaterialOverrides = Record<string, MaterialOverride>;

export type CarAnchor = {
  point: THREE.Vector3;
  anchor: THREE.Vector3;
};

type StagedModel = {
  root: THREE.Object3D;
  anchors: CarAnchor[];
};

/**
 * Normalizes the model so it sits on the floor (min.y = 0), centered on the
 * origin, length axis along Z, scaled to a target length.
 */
function fitToStage(root: THREE.Object3D, targetLength: number): StagedModel {
  const box = new THREE.Box3().setFromObject(root);
  const size = box.getSize(new THREE.Vector3());

  if (size.x > size.z) {
    root.rotation.y = -Math.PI / 2;
  }
  root.updateMatrixWorld(true);

  const boxAfter = new THREE.Box3().setFromObject(root);
  const sizeAfter = boxAfter.getSize(new THREE.Vector3());
  const center = boxAfter.getCenter(new THREE.Vector3());
  const scale = targetLength / Math.max(sizeAfter.x, sizeAfter.z);

  root.scale.setScalar(scale);
  root.position.set(-center.x * scale, -boxAfter.min.y * scale, -center.z * scale);
  root.updateMatrixWorld(true);

  const staged = new THREE.Box3().setFromObject(root);
  const s = staged.getSize(new THREE.Vector3());
  const w = s.x;
  const h = s.y;
  const l = s.z;
  const off = w / 2 + 1.15;

  const zones = [
    { x: -1, y: 0.16, z: 0.46 },
    { x: -1, y: 0.4, z: 0.2 },
    { x: -1, y: 0.82, z: -0.04 },
    { x: -1, y: 0.32, z: -0.46 },
    { x: 1, y: 0.16, z: 0.46 },
    { x: 1, y: 0.4, z: 0.2 },
    { x: 1, y: 0.82, z: -0.04 },
    { x: 1, y: 0.32, z: -0.46 },
  ];

  const anchors: CarAnchor[] = zones.map((zone) => ({
    point: new THREE.Vector3((zone.x * w) / 2, zone.y * h, (zone.z * l) / 2),
    anchor: new THREE.Vector3(
      zone.x * off,
      Math.max(0.55, zone.y * h),
      (zone.z * l) / 2,
    ),
  }));

  return { root, anchors };
}

export function CarModel({
  overrides = {},
  targetLength = 3.4,
  modelUrl = DEFAULT_MODEL_URL,
  onReady,
}: {
  overrides?: MaterialOverrides;
  targetLength?: number;
  modelUrl?: string;
  onReady?: (anchors: CarAnchor[]) => void;
}) {
  const { scene } = useGLTF(modelUrl, false, true);

  const staged = useMemo(() => {
    const clone = scene.clone(true) as THREE.Group;
    clone.traverse((obj) => {
      if (!(obj as THREE.Mesh).isMesh) return;
      const mesh = obj as THREE.Mesh;
      mesh.material = Array.isArray(mesh.material)
        ? mesh.material.map((m) => m.clone())
        : mesh.material.clone();
    });
    return fitToStage(clone, targetLength);
  }, [scene, targetLength]);

  const { root, anchors } = staged;

  useEffect(() => {
    root.traverse((obj) => {
      if (!(obj as THREE.Mesh).isMesh) return;
      const mesh = obj as THREE.Mesh;
      const materials = Array.isArray(mesh.material)
        ? mesh.material
        : [mesh.material];
      for (const raw of materials) {
        const mat = raw as THREE.MeshPhysicalMaterial;
        const override = overrides[mat.name];
        if (!override) continue;
        if (override.color) mat.color = new THREE.Color(override.color);
        if (override.emissive)
          mat.emissive = new THREE.Color(override.emissive);
        if (typeof override.emissiveIntensity === "number")
          mat.emissiveIntensity = override.emissiveIntensity;
        if (typeof override.metalness === "number")
          mat.metalness = override.metalness;
        if (typeof override.roughness === "number")
          mat.roughness = override.roughness;
        if (typeof override.clearcoat === "number")
          mat.clearcoat = override.clearcoat;
      }
    });
  }, [root, overrides]);

  useEffect(() => {
    onReady?.(anchors);
  }, [anchors, onReady]);

  return <primitive object={root} />;
}