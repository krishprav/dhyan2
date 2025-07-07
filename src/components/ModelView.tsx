// src/components/ModelView.tsx

import { Suspense } from "react";
import IphoneModel from "./IphoneModel";
import Loader from "./Loader";

type ModelViewProps = {
  item: any;
  size: string;
  position: [number, number, number];
  rotation: [number, number, number];
};

const ModelView = ({ item, size, position, rotation }: ModelViewProps) => {
  const getScale = (): [number, number, number] => {
    switch (size) {
      case "medium":
        return [16, 16, 16];
      case "large":
        return [17, 17, 17];
      default:
        return [14, 14, 14];
    }
  };

  return (
    // @ts-expect-error: TypeScript doesn't recognize group
    <group position={position} rotation={rotation}>
      <Suspense fallback={<Loader />}>
        <IphoneModel
          scale={getScale()}
          item={item}
          size={size}
        />
      </Suspense>
      {/* @ts-expect-error: TypeScript doesn't recognize group */}
    </group>
  );
};

export default ModelView;