import { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import ModelView from "./ModelView";

const screenImages = [
    "/assets/images/screen1.jpg",
    "/assets/images/screen2.jpg",
    "/assets/images/screen3.jpg",
    "/assets/images/screen4.jpg",
    "/assets/images/screen5.jpg",
    "/assets/images/screen6.jpg",
    "/assets/images/screen7.jpg",
    "/assets/images/screen8.jpg",
];

const HeroPhone = () => {
    const [screenIndex, setScreenIndex] = useState(0);
    // FIX: Use the non-null assertion (!) to satisfy the eventSource prop type.
    const canvasContainerRef = useRef<HTMLDivElement>(null!);

    useEffect(() => {
        const interval = setInterval(() => {
            setScreenIndex((prev) => (prev + 1) % screenImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const modelData = {
        id: 1,
        title: "Hero Phone",
        color: "#fff",
        img: screenImages[screenIndex],
    };

    return (
        <div ref={canvasContainerRef} className="relative h-[75vh] w-full overflow-hidden md:h-[90vh]">
            <Canvas
                className="size-full"
                style={{ position: "absolute", top: 0, left: 0 }}
                eventSource={canvasContainerRef}
            >
                <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={30} />

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    rotateSpeed={0.4}
                    target={[0, 0, 0]}
                    minPolarAngle={Math.PI / 2 - 0.3}
                    maxPolarAngle={Math.PI / 2 + 0.3}
                />

                {/* @ts-expect-error: TypeScript doesn't recognize ambientLight */}
                <ambientLight intensity={1} />
                {/* @ts-expect-error: TypeScript doesn't recognize directionalLight */}
                <directionalLight position={[5, 5, 5]} intensity={1} />

                <ModelView
                    item={modelData}
                    size="small"
                    position={[0, 0, 0]}
                    rotation={[0.15, -0.2, 0]}
                />
            </Canvas>
        </div>
    );
};

export default HeroPhone;