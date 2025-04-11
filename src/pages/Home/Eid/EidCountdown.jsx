import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const EidCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const eidDate = new Date(2025, 3, 2).getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eidDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Star SVG component
  const StarShape = () => (
    <svg viewBox="0 0 24 24" className="w-full h-full fill-current text-yellow-300">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );

  return (
    <div className="min-h-[400px] flex items-center justify-center bg-gradient-to-br from-[#2C5364] via-[#203A43] to-[#0F2027] p-8 rounded-2xl shadow-2xl relative overflow-hidden">
      {/* Background Image on Right */}
      <div 
        className="absolute inset-0 w-full h-full opacity-20 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://i.ibb.co/rG1pD2CH/pexels-muhammad-zeshan-667755627-26319343.jpg)' }}
      />

      {/* Floating Stars */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-6 h-6 text-yellow-300 drop-shadow-glow"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.5, 1, 0.5],
            rotate: Math.random() * 360,
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <StarShape />
        </motion.div>
      ))}

    
      

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <motion.div 
          className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full blur-xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-8 right-10 w-28 h-28 bg-[#FFD700] rounded-full blur-xl"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      <div className="text-center z-10">
        <motion.h2 
          className="text-5xl md:text-6xl font-bold text-white mb-8 font-arabic drop-shadow-lg"
          animate={{ y: [0, -5, 0], textShadow: ["0 0 10px rgba(255, 255, 255, 0.3)", "0 0 20px rgba(255, 255, 255, 0.5)", "0 0 10px rgba(255, 255, 255, 0.3)"] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          عيد مبارك!
        </motion.h2>
        
        <div className="grid grid-cols-4 gap-6 mb-10">
          {[
            { value: timeLeft.days, label: 'Days' },
            { value: timeLeft.hours, label: 'Hours' },
            { value: timeLeft.minutes, label: 'Minutes' },
            { value: timeLeft.seconds, label: 'Seconds' },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="p-5 bg-white/20 rounded-xl backdrop-blur-md shadow-md"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-4xl font-bold text-[#FFD700]">{item.value}</div>
              <div className="text-white mt-2 font-medium">{item.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center items-center space-x-6 mb-8">
          <motion.div 
            className="w-14 h-14 bg-[#FFD700] clip-star"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-white text-xl font-semibold">DeshRide is always there to make your Eid day memorable 🚗 </p>


          {/* Running Cycles */}
      




          <motion.div 
            className="w-14 h-14 bg-[#FFD700] clip-star"
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Progress Bar */}
        <div className="mt-8 h-3 bg-white/30 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-[#FFD700] transition-all duration-1000"
            initial={{ width: 0 }}
            animate={{ width: `${(1 - (timeLeft.days / 30)) * 100}%` }}
          />
        </div>
      </div>

      <style jsx>{`
        .font-arabic {
          font-family: 'Amiri', 'Arial', sans-serif;
        }
        
        .clip-star {
          clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
        }

        .clip-moon {
          clip-path: circle(40% at 50% 50%);
        }

        .clip-half-moon {
    clip-path: polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%, 75% 50%);
  }
    .clip-crescent {
  clip-path: polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%, 75% 50%);
}
        .drop-shadow-glow {
          filter: drop-shadow(0 0 5px rgba(255, 221, 0, 0.5));
        }
      `}</style>
    </div>
  );
};

export default EidCountdown;