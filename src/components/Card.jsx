import { motion } from "framer-motion";

const Card = ({ title, description, icon, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-white p-6 rounded-lg shadow-md text-center"
    >
      {/* FIXED: If icon is an image, show <img> */}
      <div className="flex justify-center mb-4">
        {typeof icon === "string" && icon.startsWith("/src") ? (
          <img src={icon} alt={title} className="w-14 h-14 object-contain" />
        ) : (
          <img src={icon} alt={title} className="w-14 h-14 object-contain" />
        )}
      </div>

      <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </motion.div>
  );
};

export default Card;
