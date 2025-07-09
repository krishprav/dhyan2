import { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import ModelView from "./ModelView";
import gsap from "gsap";

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
    const controlsRef = useRef<any>(null);
    const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    

    useEffect(() => {
        const interval = setInterval(() => {
            setScreenIndex((prev) => (prev + 1) % screenImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Reset to original position after interaction ends
    const resetToOriginalPosition = () => {
        if (controlsRef.current) {
            gsap.to(controlsRef.current.object.position, {
                x: 0,
                y: 0,
                z: 5,
                duration: 1.5,
                ease: "power2.out"
            });
            gsap.to(controlsRef.current.target, {
                x: 0,
                y: 0,
                z: 0,
                duration: 1.5,
                ease: "power2.out"
            });
        }
    };

    const handleInteractionStart = () => {
        if (resetTimeoutRef.current) {
            clearTimeout(resetTimeoutRef.current);
            resetTimeoutRef.current = null;
        }
    };

    const handleInteractionEnd = () => {
        // Reset after 2 seconds of no interaction
        resetTimeoutRef.current = setTimeout(() => {
            resetToOriginalPosition();
        }, 2000);
    };

    useEffect(() => {
        return () => {
            if (resetTimeoutRef.current) {
                clearTimeout(resetTimeoutRef.current);
            }
        };
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
                    ref={controlsRef}
                    enableZoom={false}
                    enablePan={false}
                    rotateSpeed={0.4}
                    target={[0, 0, 0]}
                    minPolarAngle={Math.PI / 2 - 0.3}
                    maxPolarAngle={Math.PI / 2 + 0.3}
                    minAzimuthAngle={-0.3}
                    maxAzimuthAngle={0.3}
                    enableDamping={true}
                    dampingFactor={0.05}
                    onStart={handleInteractionStart}
                    onEnd={handleInteractionEnd}
                />

                {/* @ts-expect-error: TypeScript doesn't recognize ambientLight */}
                <ambientLight intensity={2} />
                {/* @ts-expect-error: TypeScript doesn't recognize directionalLight */}
                <directionalLight position={[5, 5, 5]} intensity={3} />

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