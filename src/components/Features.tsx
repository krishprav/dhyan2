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
    const globeGroupRef = useRef<THREE.Group>(null!);
    const modelGroupRefs = useRef<{[key: string]: THREE.Group | null}>({});

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            // Only handle scroll if mouse is over the features section
            const featuresSection = document.querySelector('#features');
            if (!featuresSection) return;
            
            const rect = featuresSection.getBoundingClientRect();
            const isOverFeatures = e.clientX >= rect.left && e.clientX <= rect.right && 
                                 e.clientY >= rect.top && e.clientY <= rect.bottom;
            
            if (!isOverFeatures) return;
            
            if (currentCategoryIndex === 0 && e.deltaY < 0) return;
            if (currentCategoryIndex === categories.length - 1 && e.deltaY > 0) return;
            if (isAnimating) return;

            e.preventDefault(); // Only prevent default when interacting with features
            
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
            opacity: 1,
            y: -20,
            duration: 0.4,
            ease: "power2.in",
        });

        gsap.fromTo(
            ".category-info",
            { opacity: 1, y: 20 },
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
        <section id="features" className="common-padding relative">
            <div className="screen-max-width">
                <div className="flex flex-col items-center">
                    {/* Desktop Layout - Unchanged */}
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

                    {/* Mobile Layout - Compact Version */}
                    <div className="mb-4 text-center category-info block md:hidden px-0">
                        <h3
                            className="mb-2 text-2xl xs:text-3xl sm:text-4xl font-normal"
                            style={{
                                fontFamily: "Gelica, sans-serif",
                                color: "black",
                                lineHeight: "1.1",
                            }}
                        >
                            {categories[currentCategoryIndex].name}
                        </h3>
                        <p
                            className="text-sm xs:text-base sm:text-lg px-0"
                            style={{
                                fontFamily: "SF Pro Display, sans-serif",
                                lineHeight: "1.3",
                            }}
                        >
                            {categories[currentCategoryIndex].description}
                        </p>
                    </div>

                    {/* Canvas with adjusted mobile height */}
                    <div className="relative h-[30vh] w-full md:h-[70vh] group cursor-pointer">
                        {/* Scroll indicator */}
                        <div className="absolute top-4 right-4 z-10 opacity-50 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span>Scroll to explore</span>
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 3a1 1 0 011 1v5.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L9 9.586V4a1 1 0 011-1z"/>
                                </svg>
                            </div>
                        </div>
                        <Canvas 
                            className="size-full"
                            gl={{ 
                                antialias: true, 
                                alpha: true, 
                                powerPreference: "high-performance",
                                preserveDrawingBuffer: false,
                                failIfMajorPerformanceCaveat: false
                            }}
                            dpr={[1, 2]}
                        >
                            {/* @ts-expect-error: TypeScript doesn't recognize ambientLight */}
                            <ambientLight intensity={2}/>
                            {/* @ts-expect-error: TypeScript doesn't recognize directionalLight */}
                            <directionalLight position={[3, 5, 4]} intensity={3} />
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
                                    const globeRadius = 3.5; // Reduced radius for mobile
                                    const clusterAngle = 0.4;

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
                                                scale={1} 
                                            >
                                                <ModelView
                                                    item={modelData}
                                                    size="small"
                                                    position={[0,0,0]}
                                                    rotation={[0,0,0]}
                                                />
                                                {/* @ts-expect-error: TypeScript doesn't recognize group */}
                                            </group>
                                        );
                                    });
                                })}
                                {/* @ts-expect-error: TypeScript doesn't recognize group */}
                            </group>
                        </Canvas>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;