import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { heroImages } from "../../data/imageAssets";

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader = ({ onComplete }: PreloaderProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const startTime = Date.now();
    const MIN_LOADER_TIME = 2500; // Ensure loader shows for at least 2.5 seconds
    
    // Collect all critical image URLs to preload
    const imagesToPreload = [
      ...Object.values(heroImages),
    ];
    
    let loadedImages = 0;
    let hasCompleted = false;

    // Safety timeout: If images take longer than 8 seconds, forcefully complete
    const safetyTimeout = setTimeout(() => {
      if (!hasCompleted) {
        completePreload();
      }
    }, 8000);

    const completePreload = () => {
      if (hasCompleted) return;
      hasCompleted = true;

      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, MIN_LOADER_TIME - elapsedTime);

      setTimeout(() => {
        setIsVisible(false); // Trigger exit animation
        // Wait for exit animation to finish before notifying parent
        setTimeout(() => {
          onComplete();
        }, 800); 
      }, remainingTime);
    };

    if (imagesToPreload.length === 0) {
      completePreload();
      return;
    }

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
      
      const handleLoadOrError = () => {
        loadedImages++;
        if (loadedImages === imagesToPreload.length && !hasCompleted) {
          clearTimeout(safetyTimeout);
          completePreload();
        }
      };

      img.onload = handleLoadOrError;
      img.onerror = handleLoadOrError; // Even if it fails, we shouldn't block the site
    });

    return () => {
      clearTimeout(safetyTimeout);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-grain-dark flex items-center justify-center pointer-events-auto"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <motion.img
              src="/images/products/DUMUZI.jpeg"
              alt="DUMUZI Luxury Chocolates"
              className="h-24 md:h-32 w-32 md:w-40 object-contain rounded-2xl drop-shadow-xl"
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.8, 1, 0.8] 
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                ease: "easeInOut" 
              }}
            />
            {/* Minimal pulsing progress indicator */}
            <motion.div 
              className="mt-8 flex gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 0.6, 
                    delay: i * 0.15,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
