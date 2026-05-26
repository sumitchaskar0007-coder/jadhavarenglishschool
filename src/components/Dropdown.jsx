import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Dropdown = ({ 
  trigger, 
  items, 
  align = 'left',
  className = '' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const alignClasses = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 -translate-x-1/2',
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-full mt-2 ${alignClasses[align]} w-64 bg-white rounded-xl shadow-2xl py-2 border border-gray-100 z-50`}
          >
            {items.map((item, index) => (
              <div key={index}>
                {item.divider ? (
                  <div className="border-t border-gray-200 my-2" />
                ) : item.href ? (
                  <Link
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                  >
                    {item.icon && <span className="mr-3 text-xl">{item.icon}</span>}
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      if (item.onClick) item.onClick();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center px-4 py-3 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                  >
                    {item.icon && <span className="mr-3 text-xl">{item.icon}</span>}
                    <span className="font-medium">{item.label}</span>
                  </button>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;

