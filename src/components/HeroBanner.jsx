import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import schoolImg from "/assets/images/school.png";

const HeroBanner = ({ title, subtitle, image, showCTA = true, showScrollIndicator = true }) => {
  return (
    <div className="relative h-[45vh] sm:h-[50vh] md:h-[55vh] lg:h-[60vh] overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${image || schoolImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Soft Black Dim Layer */}
      <div className="absolute inset-0 bg-black/25" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
        <div className="container-custom max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-3 sm:mb-4 drop-shadow-xl"
            >
              {title || 'Jadhavar English Medium School & Jr. College'}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 text-blue-100 drop-shadow-md max-w-3xl mx-auto"
            >
              {subtitle || 'Empowering Minds, Shaping Futures - Excellence in Education Since Inception'}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
