import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import ModelView from "./ModelView";
import { categories } from "../constants";
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const globeGroupRef = useRef<THREE.Group>(null!);
    const modelGroupRefs = useRef<{[key: string]: THREE.Group | null}>({});
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const scrollProgressRef = useRef(0);

    useEffect(() => {
        const container = containerRef.current;
        const content = contentRef.current;
        if (!container || !content) return;

        // Set the container height to create scroll space for all models
        const totalScrollHeight = categories.length * 100; // 100vh per model
        gsap.set(container, { height: `${totalScrollHeight}vh` });

        // Create the main ScrollTrigger for pinning
        const scrollTrigger = ScrollTrigger.create({
            trigger: container,
            start: "top top",
            end: `+=${(categories.length - 1) * 100}%`, // Scroll through all models
            pin: content,
            pinSpacing: false,
            scrub: 1,
            onUpdate: (self) => {
                scrollProgressRef.current = self.progress;
                const newIndex = Math.min(
                    Math.floor(self.progress * categories.length),
                    categories.length - 1
                );
                
                if (newIndex !== currentCategoryIndex && !isAnimating) {
                    switchCategory(newIndex);
                }
            }
        });

        return () => {
            scrollTrigger.kill();
        };
    }, [categories.length]);

    const switchCategory = (newCategoryIndex: number) => {
        if (newCategoryIndex === currentCategoryIndex || isAnimating) return;
        setIsAnimating(true);
        
        // Animate text transition
        gsap.to(".category-info", {
            opacity: 0,
            y: -20,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                setCurrentCategoryIndex(newCategoryIndex);
                gsap.fromTo(
                    ".category-info",
                    { opacity: 0, y: 20 },
                    { 
                        opacity: 1, 
                        y: 0, 
                        duration: 0.4, 
                        ease: "power2.out",
                        onComplete: () => setIsAnimating(false)
                    }
                );
            }
        });

        // Rotate the globe
        if (globeGroupRef.current) {
            const angleStep = (2 * Math.PI) / categories.length;
            const targetRotationY = -newCategoryIndex * angleStep;
            
            gsap.to(globeGroupRef.current.rotation, {
                y: targetRotationY,
                duration: 0.8,
                ease: "power3.inOut"
            });
        }
    };

    return (
        <div ref={containerRef} className="relative">
            <section 
                ref={contentRef}
                id="features" 
                className="min-h-screen flex items-center justify-center"
            >
                <div className="screen-max-width w-full">
                    <div className="flex flex-col items-center">
                        {/* Desktop Layout */}
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

                        {/* Mobile Layout */}
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

                        {/* Canvas */}
                        <div className="relative h-[30vh] w-full md:h-[70vh] group">
                            {/* Progress indicator */}
                            <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-2">
                                <div className="text-sm text-gray-600">
                                    {currentCategoryIndex + 1} / {categories.length}
                                </div>
                                <div className="w-1 h-20 bg-gray-200 rounded-full overflow-hidden">
                                    <div 
                                        className="w-full bg-gray-600 rounded-full transition-all duration-300"
                                        style={{ 
                                            height: `${((currentCategoryIndex + 1) / categories.length) * 100}%` 
                                        }}
                                    />
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
                                {/* @ts-expect-error */}
                                <ambientLight intensity={2}/>
                                {/* @ts-expect-error */}
                                <directionalLight position={[3, 5, 4]} intensity={3} />
                                <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={30} />
                                <OrbitControls
                                    enableZoom={false}
                                    enablePan={false}
                                    enableRotate={false}
                                />
                                {/* @ts-expect-error */}
                                <group ref={globeGroupRef}>
                                    {categories.map((category, catIndex) => {
                                        if (catIndex !== currentCategoryIndex) return null;

                                        const categoryAngle = (catIndex / categories.length) * Math.PI * 2;
                                        const globeRadius = 3.5;
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
                                                // @ts-expect-error
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
                                                {/* @ts-expect-error */}
                                                </group>
                                            );
                                        });
                                    })}
                                    {/* @ts-expect-error */}
                                </group>
                            </Canvas>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Features;