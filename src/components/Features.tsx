import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import ModelView from "./ModelView";
import { categories } from "../constants";
import * as THREE from 'three';

const Features = () => {
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const globeGroupRef = useRef<THREE.Group>(null!); // Add non-null assertion
    const modelGroupRefs = useRef<{[key: string]: THREE.Group | null}>({});

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (currentCategoryIndex === 0 && e.deltaY < 0) return;
            if (currentCategoryIndex === categories.length - 1 && e.deltaY > 0) return;

            e.preventDefault();
            if (isAnimating) return;

            if (e.deltaY > 0) {
                switchCategory((currentCategoryIndex + 1) % categories.length);
            } else if (e.deltaY < 0) {
                switchCategory(
                    (currentCategoryIndex - 1 + categories.length) % categories.length
                );
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: false });
        return () => window.removeEventListener("wheel", handleWheel);
    }, [currentCategoryIndex, isAnimating]);

    const switchCategory = (newCategoryIndex: number) => {
        if (newCategoryIndex === currentCategoryIndex || isAnimating) return;
        setIsAnimating(true);
        setCurrentCategoryIndex(newCategoryIndex);

        gsap.to(".category-info", {
            opacity: 0,
            y: -20,
            duration: 0.4,
            ease: "power2.in",
        });

        gsap.fromTo(
            ".category-info",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.8 }
        );

        const angleStep = (2 * Math.PI) / categories.length;
        const targetRotationY = -newCategoryIndex * angleStep;

        const tl = gsap.timeline({
            defaults: { duration: 1.2, ease: "power3.inOut" },
            onComplete: () => setIsAnimating(false),
        });

        if (globeGroupRef.current) {
            tl.to(globeGroupRef.current.rotation, { y: targetRotationY }, 0);
        }
    };

    return (
        <section className="common-padding relative">
            <div className="screen-max-width">
                <div className="flex flex-col items-center">
                    <div className="mt-[60px] mb-8 text-center category-info hidden md:block px-2">
                        <h3
                            className="features-title mb-6 text-5xl lg:text-7xl xl:text-8xl font-normal"
                            style={{
                                fontFamily: "Gelica, sans-serif",
                                textAlign: "center",
                                color: "black"
                            }}
                        >
                            {categories[currentCategoryIndex].name}
                        </h3>
                        <p
                            className="features-description md:px-[80px] lg:px-[160px] xl:px-[240px] text-lg lg:text-2xl xl:text-3xl"
                            style={{
                                fontFamily: "SF Pro Display, sans-serif",
                                lineHeight: "1.4",
                            }}
                        >
                            {categories[currentCategoryIndex].description}
                        </p>
                    </div>

                    <div className="mb-8 text-center category-info block md:hidden px-2">
                        <h3
                            className="mb-4 text-3xl xs:text-4xl sm:text-5xl font-normal"
                            style={{
                                fontFamily: "Gelica, sans-serif",
                                color: "black",
                                lineHeight: "1.1",
                            }}
                        >
                            {categories[currentCategoryIndex].name}
                        </h3>
                        <p
                            className="text-base xs:text-lg sm:text-xl"
                            style={{
                                fontFamily: "SF Pro Display, sans-serif",
                                lineHeight: "1.4",
                            }}
                        >
                            {categories[currentCategoryIndex].description}
                        </p>
                    </div>

                    <div className="relative h-[40vh] w-full md:h-[70vh]">
                        <Canvas className="size-full">
                            {/* @ts-expect-error: TypeScript doesn't recognize ambientLight */}
                            <ambientLight intensity={1}/>
                            {/* @ts-expect-error: TypeScript doesn't recognize directionalLight */}
                            <directionalLight position={[3, 5, 4]} intensity={1.5} />
                            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={30} />
                            <OrbitControls
                                enableZoom={false}
                                enablePan={false}
                                enableRotate={false}
                            />

                            {/* @ts-expect-error: TypeScript doesn't recognize group */}
                            <group ref={globeGroupRef}>
                                {categories.map((category, catIndex) => {
                                    if (catIndex !== currentCategoryIndex) return null;

                                    const categoryAngle = (catIndex / categories.length) * Math.PI * 2;
                                    const globeRadius = 4;
                                    const clusterAngle = 0.3;

                                    return category.images.map((img, modelIndex) => {
                                        const modelAngleOffset = (modelIndex - 1) * clusterAngle;
                                        const finalAngle = categoryAngle + modelAngleOffset;

                                        const position: [number, number, number] = [
                                            globeRadius * Math.sin(finalAngle),
                                            0,
                                            globeRadius * Math.cos(finalAngle),
                                        ];
                                        
                                        const baseRotation: [number, number, number] = [0, finalAngle, 0];
                                        const key = `cat-${catIndex}-model-${modelIndex}`;
                                        const modelData = {
                                            id: key,
                                            title: `${category.name} ${modelIndex + 1}`,
                                            color: category.colors[modelIndex],
                                            img: img,
                                        };

                                        return (
                                            // @ts-expect-error: TypeScript doesn't recognize group
                                            <group
                                                key={key}
                                                ref={(el: THREE.Group | null) => {
                                                    if (el) modelGroupRefs.current[key] = el;
                                                }}
                                                position={position}
                                                rotation={baseRotation}
                                                scale={0.85}
                                            >
                                                <ModelView
                                                    item={modelData}
                                                    size="small"
                                                    position={[0,0,0]}
                                                    rotation={[0,0,0]}
                                                />
                                                {/* @ts-ignore */}
                                            </group>
                                        );
                                    });
                                })}
                                {/* @ts-ignore */}
                            </group>
                        </Canvas>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;