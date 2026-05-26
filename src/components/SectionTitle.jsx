import { motion } from 'framer-motion';

const SectionTitle = ({ title, subtitle, center = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={center ? 'text-center mb-6 sm:mb-8' : 'mb-6 sm:mb-8'}
    >
      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2 sm:mb-3"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-2"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: '100%' }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="h-1 w-20 bg-gradient-to-r from-blue-600 to-blue-700 mx-auto mt-4 rounded-full"
      />
    </motion.div>
  );
};

export default SectionTitle;
