"use client";

import { Environment, Lightformer } from "@react-three/drei";

export function StudioEnvironment() {
  return (
    <Environment resolution={256} frames={1}>
      <Lightformer
        form="rect"
        intensity={3}
        position={[0, 4, 0]}
        rotation-x={Math.PI / 2}
        scale={[12, 8, 1]}
        color="#ffffff"
      />
      <Lightformer
        form="rect"
        intensity={1.3}
        position={[-6, 1.5, 0.5]}
        rotation-y={Math.PI / 2}
        scale={[7, 2.2, 1]}
        color="#f4f6fb"
      />
      <Lightformer
        form="rect"
        intensity={1.3}
        position={[6, 1.5, 0.5]}
        rotation-y={-Math.PI / 2}
        scale={[7, 2.2, 1]}
        color="#ffffff"
      />
      <Lightformer
        form="rect"
        intensity={0.9}
        position={[0, 1.5, 5]}
        rotation-y={Math.PI}
        scale={[9, 2.4, 1]}
        color="#eef2ff"
      />
      <Lightformer
        form="ring"
        intensity={1.4}
        position={[0, 3, -2]}
        rotation-x={Math.PI / 2}
        scale={[3, 3, 1]}
        color="#ffffff"
      />
    </Environment>
  );
}