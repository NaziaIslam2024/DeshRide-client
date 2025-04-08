import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FloatingStar = () => {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Star SVG component
  const StarShape = () => (
    <svg 
      viewBox="0 0 24 24" 
      className="w-full h-full fill-current text-yellow-300"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );

  return (
    <AnimatePresence>
      {showAnimation && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-black/70 via-emerald-900/50 to-black/70 z-50 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Rising Stars with Trail */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-6 h-6 text-yellow-300 drop-shadow-glow"
              style={{
                left: `${Math.random() * 100}%`,
              }}
              initial={{ y: "100vh", opacity: 0, scale: 0.3 }}
              animate={{
                y: "-50vh",
                opacity: [0, 1, 0],
                scale: [0.3, 1.2, 0.3],
                rotate: Math.random() * 720,
                filter: [
                  "drop-shadow(0 0 5px rgba(255, 221, 0, 0))",
                  "drop-shadow(0 0 15px rgba(255, 221, 0, 0.8))",
                  "drop-shadow(0 0 5px rgba(255, 221, 0, 0))",
                ],
              }}
              transition={{
                duration: 2.5,
                delay: Math.random() * 1.5,
                ease: "easeOut",
                repeat: Infinity,
              }}
            >
              <StarShape />
            </motion.div>
          ))}

          {/* Eid Mubarak  */}
          <motion.div
            className="text-center relative z-10"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ 
              scale: 1,
              rotate: 0,
              transition: { 
                delay: 0.5,
                type: "spring",
                stiffness: 260,
                damping: 20
              }
            }}
            exit={{ scale: 0, rotate: 10 }}
          >
            <div className="relative">
              <motion.h1 
                className="text-9xl font-bold text-yellow-300 mb-6 arabic-font drop-shadow-lg"
                animate={{ 
                  y: [0, -10, 0],
                  textShadow: [
                    "0 0 10px rgba(255, 221, 0, 0.3)",
                    "0 0 20px rgba(255, 221, 0, 0.7)",
                    "0 0 10px rgba(255, 221, 0, 0.3)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                عيد مبارك
              </motion.h1>
              
              <motion.h2 
                className="text-7xl font-semibold text-white mb-4 tracking-wide"
                animate={{ 
                  scale: [1, 1.05, 1],
                  textShadow: [
                    "0 0 8px rgba(255, 255, 255, 0.3)",
                    "0 0 16px rgba(255, 255, 255, 0.6)",
                    "0 0 8px rgba(255, 255, 255, 0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Eid Mubarak!
              </motion.h2>

              {/* Desh Ride Message */}
              <motion.p
                className="text-3xl font-medium text-emerald-300 tracking-wider"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    delay: 1,
                    duration: 1,
                    ease: "easeOut"
                  }
                }}
              >
                Let's Move in Eid with Desh Ride
              </motion.p>

              {/* Stars */}
              <motion.div
                className="absolute -top-12 -left-12 w-12 h-12 text-emerald-400/70"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 360],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <StarShape />
              </motion.div>
              <motion.div
                className="absolute -top-12 -right-12 w-12 h-12 text-yellow-400/70"
                animate={{
                  scale: [1, 0.7, 1],
                  rotate: [0, -360],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                <StarShape />
              </motion.div>
            </div>

            {/* Glitter Stars */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 text-yellow-300"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  y: [0, -20, 0],
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                <StarShape />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingStar;