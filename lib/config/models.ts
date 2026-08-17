import type { MaterialOverrides } from "@/components/3d/car-model";
import rawCarModels from "./models.json";

export type FeatureTabId =
  | "performance"
  | "design"
  | "safety"
  | "luxury"
  | "multimedia";

export const FEATURE_TABS: FeatureTabId[] = [
  "performance",
  "design",
  "safety",
  "luxury",
  "multimedia",
];

export type FeaturePreset = {
  overrides: MaterialOverrides;
  azimuth: number;
  light: string;
  intensity: number;
};

export type CarModelConfig = {
  id: string;
  modelUrl: string;
  heroFallback: string;
  showcaseFallback: string;
  heroCamera: { position: [number, number, number]; fov: number };
  targetLength: number;
  defaultFeature: FeatureTabId;
  features: Record<FeatureTabId, FeaturePreset>;
};

export const CAR_MODELS = rawCarModels as unknown as CarModelConfig[];

export function getCarModel(modelId: string): CarModelConfig {
  return CAR_MODELS.find((car) => car.id === modelId) ?? CAR_MODELS[0];
}

export const MODEL_ROTATION_INTERVAL_MS = 8 * 60 * 1000;
