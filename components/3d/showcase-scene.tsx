"use client";

import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { CarModel } from "./car-model";
import { StudioEnvironment } from "./studio-environment";
import { ModelLoader } from "./model-loader";
import { getCarModel } from "@/lib/config/models";

export function ShowcaseScene({
  modelId,
  spinning,
}: {
  modelId: string;
  spinning: boolean;
}) {
  const model = getCarModel(modelId);

  return (
    <>
      <color attach="background" args={["#ffffff"]} />
      <StudioEnvironment />
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 4]} intensity={1.15} color="#ffffff" />
      <directionalLight position={[-6, 2.5, -3]} intensity={0.3} color="#aeb9e8" />
      <Suspense fallback={<ModelLoader />}>
        <CarModel modelUrl={model.modelUrl} targetLength={3.9} />
      </Suspense>
      <OrbitControls
        makeDefault
        enablePan={false}
        autoRotate={spinning}
        autoRotateSpeed={2}
        minDistance={4.2}
        maxDistance={9}
        target={[0, 0.6, 0]}
      />
    </>
  );
}