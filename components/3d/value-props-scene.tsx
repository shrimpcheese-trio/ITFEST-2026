"use client";

import { Suspense, useState } from "react";
import { Html, Line, OrthographicCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { cn } from "@/lib/utils";
import { CarModel, type CarAnchor } from "./car-model";
import { ModelLoader } from "./model-loader";

function TopDownCamera() {
  const { width, height } = useThree((s) => s.size);
  const zoom = Math.min(height / 4.0, width / 6.2);

  return (
    <OrthographicCamera
      makeDefault
      position={[0, 10, 0]}
      up={[0, 0, -1]}
      rotation={[-Math.PI / 2, 0, 0]}
      zoom={zoom}
      near={0.1}
      far={100}
    />
  );
}

function Marker({
  anchor,
  label,
  index,
  side,
}: {
  anchor: CarAnchor;
  label: string;
  index: number;
  side: "left" | "right";
}) {
  return (
    <>
      <Line
        points={[anchor.point, anchor.anchor]}
        color="#9e9ea0"
        lineWidth={1}
        transparent
        opacity={0.75}
        dashed
        dashSize={0.12}
        gapSize={0.07}
      />
      <Html
        position={anchor.anchor}
        center
        transform={false}
        zIndexRange={[30, 0]}
      >
        <div className="flex items-center gap-2.5">
          {side === "right" && <Badge index={index} />}
          <span className="hidden whitespace-nowrap text-sm font-medium text-mute md:inline">
            {label}
          </span>
          {side === "left" && <Badge index={index} />}
        </div>
      </Html>
    </>
  );
}

function Badge({ index }: { index: number }) {
  return (
    <span
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-full",
        "border border-ink/20 bg-canvas font-display text-base text-ink",
      )}
    >
      {index}
    </span>
  );
}

export function ValuePropsScene({ labels }: { labels: string[] }) {
  const [anchors, setAnchors] = useState<CarAnchor[] | null>(null);

  return (
    <>
      <color attach="background" args={["#ffffff"]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 8, 2]} intensity={1.4} color="#ffffff" />
      <TopDownCamera />
      <Suspense fallback={<ModelLoader />}>
        <CarModel targetLength={3.1} onReady={setAnchors} />
        {anchors &&
          labels.map((label, i) => (
            <Marker
              key={i}
              anchor={anchors[i]}
              label={label}
              index={i + 1}
              side={i < 4 ? "left" : "right"}
            />
          ))}
      </Suspense>
    </>
  );
}