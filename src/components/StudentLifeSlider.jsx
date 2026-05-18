import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";

const slides = [
  {
    title: "Clubs & Societies",
    desc: "Science, Literary, Eco and Arts clubs to encourage student passions."
  },
  {
    title: "Cultural Events",
    desc: "Annual day, cultural fests and talent shows to celebrate creativity."
  },
  {
    title: "Community Initiatives",
    desc: "Social outreach and environment programs fostering civic sense."
  }
];

const StudentLifeSlider = () => {
  return (
    <section
      className="
        relative
        py-40
        min-h-[500px]
        bg-cover
        bg-center
      "
      style={{
        backgroundImage: "url('/assets/images/student12.png')"
      }}
    >
      {/* Gray Overlay */}
      {/* <div className="absolute inset-0 bg-gray-800/80"></div> */}

      <div className="relative container-custom">
        <SectionTitle
          title="Student Life at Jadhavar"
          subtitle="A nurturing environment beyond academics"
          textColor="text-white"
        />

        {/* Infinite Slider */}
        <div className="mt-20 overflow-hidden">
          <motion.div
            className="flex gap-8"
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              repeat: Infinity,
              duration: 22,
              ease: "linear"
            }}
          >
            {[...slides, ...slides].map((item, index) => (
              <div
                key={index}
                className="
                  min-w-[340px]
                  md:min-w-[420px]
                  bg-white/95
                  backdrop-blur
                  rounded-2xl
                  p-8
                  shadow-xl
                "
              >
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StudentLifeSlider;
