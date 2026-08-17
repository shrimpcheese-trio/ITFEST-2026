"use client";

import { Suspense, useState, type RefObject } from "react";
import { Html, OrthographicCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { CarModel, type CarAnchor } from "./car-model";
import { ModelLoader } from "./model-loader";
import { getCarModel } from "@/lib/config/models";

function TopDownCamera() {
  const { width, height } = useThree((s) => s.size);
  // Narrow screens hide the marker labels, so the car can fill more of the frame
  const divisor = width < 768 ? 4.8 : 6.2;
  const zoom = Math.min(height / 4.0, width / divisor);

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

function SvgOverlay({ 
  anchors, 
  activeMarker,
  onClickMarker,
  portalRef
}: { 
  anchors: CarAnchor[]; 
  activeMarker: number | null;
  onClickMarker: (idx: number) => void;
  portalRef: RefObject<HTMLElement>;
}) {
  const { camera, size } = useThree();

  if (!anchors || anchors.length === 0) return null;

  return (
    <Html
      position={[0, 0, 0]}
      center
      transform={false}
      zIndexRange={[10, 0]}
      portal={portalRef}
      className="pointer-events-none"
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-md:hidden">
        <svg
          width={size.width}
          height={size.height}
          viewBox={`-${size.width / 2} -${size.height / 2} ${size.width} ${size.height}`}
          style={{ overflow: "visible" }}
        >
          {anchors.map((anchor, i) => {
            // Project 3D coordinate to 2D
            const p1 = anchor.point.clone().project(camera);
            const p2 = anchor.anchor.clone().project(camera);

            const x1 = (p1.x * size.width) / 2;
            const y1 = -(p1.y * size.height) / 2;
            const x2 = (p2.x * size.width) / 2;
            const y2 = -(p2.y * size.height) / 2;

            const isActive = activeMarker === i;
            const isDimmed = activeMarker !== null && !isActive;

            return (
              <g key={i}>
                {/* SVG stroke-dashoffset path draw animation */}
                <motion.line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={isActive ? "#111111" : "#9e9ea0"}
                  strokeWidth={isActive ? 2 : 1.2}
                  strokeDasharray={isActive ? "none" : "4 4"}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: isDimmed ? 0.2 : isActive ? 1 : 0.85 }}
                  transition={{ delay: 0.1 * i, duration: 0.8, ease: "easeOut" }}
                />
                
                {/* Dot on the car */}
                <motion.circle
                  cx={x1}
                  cy={y1}
                  r={isActive ? 6 : 4}
                  fill="#111111"
                  stroke="#ffffff"
                  strokeWidth={isActive ? 2 : 1.5}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, opacity: isDimmed ? 0.25 : 1 }}
                  transition={{ delay: 0.1 * i + 0.3, type: "spring", stiffness: 300, damping: 20 }}
                />
                
                {/* Glow ring (Sonar Pulse) when active */}
                <motion.circle
                  cx={x1}
                  cy={y1}
                  r={20}
                  fill="#111111"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isActive ? { scale: [0, 1], opacity: [0.3, 0] } : { scale: 0, opacity: 0 }}
                  transition={isActive ? { repeat: Infinity, duration: 1.5, ease: "easeOut" } : { duration: 0.2 }}
                  className="cursor-pointer pointer-events-auto"
                  onClick={() => onClickMarker(i)}
                />
              </g>
            );
          })}
        </svg>
      </div>
    </Html>
  );
}

function MarkerLabel({
  anchor,
  label,
  description,
  index,
  side,
  isActive,
  isDimmed,
  onHover,
  onClick,
  portalRef,
}: {
  anchor: CarAnchor;
  label: string;
  description: string;
  index: number;
  side: "left" | "right";
  isActive: boolean;
  isDimmed: boolean;
  onHover: (active: boolean) => void;
  onClick: () => void;
  portalRef: RefObject<HTMLElement>;
}) {
  const { camera, size } = useThree();

  const projected = anchor.anchor.clone().project(camera);
  const tooltipAbove = -(projected.y * size.height) / 2 > size.height / 2;

  return (
    <Html
      position={anchor.anchor}
      center
      transform={false}
      zIndexRange={[30, 0]}
      portal={portalRef}
    >
      <motion.div
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
        onClick={onClick}
        initial={{ opacity: 0, x: side === "left" ? "calc(-50% - 20px)" : "calc(50% + 20px)" }}
        animate={{ opacity: 1, x: side === "left" ? "-50%" : "50%" }}
        transition={{ delay: 0.1 * index + 0.2, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={cn(
          "group relative flex items-center gap-2.5 cursor-pointer transition-all duration-300 max-md:hidden",
          isDimmed ? "opacity-30" : "opacity-100",
          side === "left" ? "pr-2" : "pl-2"
        )}
      >
        {side === "right" && (
          <span
            className={cn(
              "flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold leading-none transition-colors duration-300",
              isActive
                ? "bg-ink text-canvas"
                : "border border-hairline bg-canvas text-ink/60 group-hover:border-ink/40 group-hover:text-ink",
            )}
          >
            {index < 10 ? `0${index}` : index}
          </span>
        )}

        <span
          className={cn(
            "max-w-[220px] truncate rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition-colors duration-300",
            isActive
              ? "border-ink bg-ink text-canvas"
              : "border-hairline bg-canvas/90 text-ink group-hover:border-ink/40",
          )}
        >
          {label}
        </span>

        {side === "left" && (
          <span
            className={cn(
              "flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold leading-none transition-colors duration-300",
              isActive
                ? "bg-ink text-canvas"
                : "border border-hairline bg-canvas text-ink/60 group-hover:border-ink/40 group-hover:text-ink",
            )}
          >
            {index < 10 ? `0${index}` : index}
          </span>
        )}

        <div
          className={cn(
            "pointer-events-none absolute left-1/2 z-50 -translate-x-1/2",
            tooltipAbove ? "bottom-full mb-3" : "top-full mt-3",
          )}
        >
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, y: tooltipAbove ? 8 : -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: tooltipAbove ? 8 : -8, scale: 0.95 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="w-max max-w-[280px] rounded-lg border border-hairline bg-canvas p-4 shadow-lg"
              >
                <p className="font-display text-base uppercase leading-tight text-ink">{label}</p>
                <p className="mt-1 text-xs leading-relaxed text-mute">{description}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </Html>
  );
}

export function ValuePropsScene({ 
  modelId,
  labels,
  descriptions,
  activeMarker,
  setActiveMarker,
  onClickMarker,
  portalRef
}: { 
  modelId: string;
  labels: string[];
  descriptions: string[];
  activeMarker: number | null;
  setActiveMarker: (idx: number | null) => void;
  onClickMarker: (idx: number) => void;
  portalRef: RefObject<HTMLElement>;
}) {
  const [anchors, setAnchors] = useState<CarAnchor[] | null>(null);
  const model = getCarModel(modelId);

  return (
    <>
      <color attach="background" args={["#ffffff"]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 8, 2]} intensity={1.4} color="#ffffff" />
      <TopDownCamera />
      
      <Suspense fallback={<ModelLoader />}>
        <CarModel
          modelUrl={model.modelUrl}
          targetLength={3.1}
          onReady={setAnchors}
        />
        
        {/* The blueprint lines are drawn via SVG overlay mapped to 3D coordinates */}
        {anchors && (
          <SvgOverlay anchors={anchors} activeMarker={activeMarker} onClickMarker={onClickMarker} portalRef={portalRef} />
        )}
        
        {anchors &&
          labels.map((label, i) => (
            <MarkerLabel
              key={i}
              anchor={anchors[i]}
              label={label}
              description={descriptions[i]}
              index={i + 1}
              side={i < 4 ? "left" : "right"}
              isActive={activeMarker === i}
              isDimmed={activeMarker !== null && activeMarker !== i}
              onHover={(active) => setActiveMarker(active ? i : null)}
              onClick={() => onClickMarker(i)}
              portalRef={portalRef}
            />
          ))}
      </Suspense>
    </>
  );
}