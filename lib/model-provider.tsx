"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { CAR_MODELS, MODEL_ROTATION_INTERVAL_MS } from "@/lib/config/models";

type ModelMessageGetter = {
  (suffix: string): string;
  has(suffix: string): boolean;
  raw(suffix: string): unknown;
};

type ModelContextValue = {
  modelId: string;
  setModelId: (id: string) => void;
};

const ModelContext = createContext<ModelContextValue>({
  modelId: CAR_MODELS[0].id,
  setModelId: () => {},
});

export function ModelProvider({ children }: { children: ReactNode }) {
  const [modelId, setModelId] = useState(CAR_MODELS[0].id);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setModelId(CAR_MODELS[Math.floor(Math.random() * CAR_MODELS.length)].id);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (reduceMotion || CAR_MODELS.length < 2) return;
    const timer = setInterval(() => {
      setModelId((current) => {
        const index = CAR_MODELS.findIndex((car) => car.id === current);
        return CAR_MODELS[(index + 1) % CAR_MODELS.length].id;
      });
    }, MODEL_ROTATION_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [reduceMotion]);

  return (
    <ModelContext.Provider value={{ modelId, setModelId }}>
      {children}
    </ModelContext.Provider>
  );
}

export function useActiveModel() {
  return useContext(ModelContext);
}

export function useModelMessages(): ModelMessageGetter {
  const { modelId } = useActiveModel();
  const t = useTranslations("models");
  type ModelKey = Parameters<typeof t>[0];
  const scope = (suffix: string) => `${modelId}.${suffix}` as ModelKey;
  const getter = Object.assign(
    (suffix: string) => t(scope(suffix)),
    {
      has: (suffix: string) => t.has(scope(suffix)),
      raw: (suffix: string) => t.raw(scope(suffix)),
    },
  );
  return getter;
}
