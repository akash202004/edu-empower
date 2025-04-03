import React from 'react';

const LoadingScreen = () => {
  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="loading-container">
        <div className="loader"></div>
=======
    <div className="fixed inset-0 bg-white flex flex-col justify-center items-center z-50 overflow-hidden">
      {/* Video background */}
      <video 
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-30"
        autoPlay 
        loop 
        muted 
        playsInline
      >
        <source src="/assets/load.webm" type="video/webm" />
      </video>
      
      <div className="text-center relative z-10">
        {/* Animated text logo */}
        <div className="relative h-24 flex items-center justify-center">
          <div className="text-6xl font-bold text-purple-700 flex">
            {text.split("").map((char, index) => (
              <motion.span
                key={index}
                custom={index}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className={char === "-" ? "mx-2" : ""}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </div>
        
        {/* Progress indicator */}
        <motion.div 
          className="mt-16 w-12 h-12 rounded-full border-3 border-purple-600 border-t-transparent mx-auto"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Tagline */}
        <motion.p 
          className="mt-6 text-purple-700 text-lg tracking-wider font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          Empowering education, one student at a time
        </motion.p>
>>>>>>> 9092c4742d5dd3f83cd7941e330ddf8e2ac41ab5
      </div>
      <p className="mt-4 text-gray-600">Preparing your experience...</p>
    </div>
  );
};

export default LoadingScreen;