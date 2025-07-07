import { useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Canvas } from "@react-three/fiber";
import ModelView from "./ModelView";
import { categories } from "../constants";

const PhoneModel = () => {
  // Current category state
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const currentCategory = categories[currentCategoryIndex];

  const centerModel = {
    id: 2,
    title: `${currentCategory.name} 2`,
    color: currentCategory.colors[1],
    img: currentCategory.images[1],
  };

  // Add scroll event listener for category switching
  useEffect(() => {
    let lastScrollTime = 0;
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScrollTime < 500) return; // Throttle
      lastScrollTime = now;
      if (e.deltaY > 0) {
        // Scroll down: next category
        const nextIndex = (currentCategoryIndex + 1) % categories.length;
        switchCategory(nextIndex);
      } else if (e.deltaY < 0) {
        // Scroll up: previous category
        const prevIndex = (currentCategoryIndex - 1 + categories.length) % categories.length;
        switchCategory(prevIndex);
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [currentCategoryIndex, categories.length]);

  // Function to switch categories
  const switchCategory = (newCategoryIndex: number) => {
    if (newCategoryIndex === currentCategoryIndex) return;

    // Animate out current models
    gsap.to(".model-view", {
      opacity: 0,
      y: 30,
      duration: 0.3,
      onComplete: () => {
        setCurrentCategoryIndex(newCategoryIndex);
        // Animate in new models
        gsap.fromTo(".model-view", 
          { opacity: 0, y: 30 }, 
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
        );
      }
    });

    // Animate category info change
    gsap.fromTo(".category-info", 
      { opacity: 0, y: -20 }, 
      { opacity: 1, y: 0, duration: 0.5, delay: 0.2 }
    );
  };

  useGSAP(() => {
    gsap.to("#heading", { y: 0, opacity: 1 });
    // Animate all three models into view
    gsap.fromTo(".model-view", 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1, stagger: 0.2 }
    );
  }, [currentCategoryIndex]); // Re-run animation when category changes

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <div className="mt-5 flex flex-col items-center">
          {/* Three Models Container */}
          <div className="relative h-[75vh] w-full overflow-hidden md:h-[90vh] model-grid">
            <Canvas
              className="size-full"
              style={{ position: "fixed", top: 0, left: 0, bottom: 0, right: 0, overflow: "hidden" }}
              eventSource={document.getElementById("root") ?? undefined}
            >
              <ModelView
                item={centerModel}
                size="medium"
                position={[0, 0, 0]}
                rotation={[0, 0, 0]}
              />
            </Canvas>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhoneModel;