import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import SectionTitle from "../components/SectionTitle";
import Card from "../components/Card";

const Facilities = () => {
  const facilities = [
    {
      title: "Science Laboratories",
      description:
        "Well-equipped Physics, Chemistry and Biology labs with modern instruments.",
      icon: "/assets/icons/lab.png",
    },
    {
      title: "Computer Lab",
      description:
        "Fully functional computer lab with updated systems & high-speed internet.",
      icon: "/assets/icons/computer.png",
    },
    {
      title: "Library",
      description:
        "A vast collection of books, journals & e-learning materials.",
      icon: "/assets/icons/library.png",
    },
    {
      title: "Sports Facilities",
      description:
        "Outdoor playground, indoor sports & professional athletic training.",
      icon: "/assets/icons/sports.png",
    },
    {
      title: "Transport Facility",
      description:
        "Safe & reliable school buses and vans covering major routes.",
      icon: "/assets/icons/bus.png",
    },
    {
      title: "Medical Room",
      description:
        "Fully equipped medical room staffed with trained personnel.",
      icon: "/assets/icons/medical.png",
    },
    {
      title: "Security",
      description:
        "24/7 security staffing with controlled entry for complete safety.",
      icon: "/assets/icons/security.png",
    },
    {
      title: "CCTV Surveillance",
      description:
        "Campus-wide CCTV surveillance ensuring child safety.",
      icon: "/assets/icons/cctv.png",
    },
    {
      title: "Mineral Water Facility",
      description:
        "Pure mineral drinking water available for all students & staff.",
      icon: "/assets/icons/water.png",
    },
    {
      title: "Fire Safety",
      description:
        "Fire extinguishers & emergency response system installed on every floor.",
      icon: "/assets/icons/fire.png",
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          Facilities - Jadhavar English Medium School & Jr. College
        </title>
        <meta
          name="description"
          content="Explore world-class school facilities including labs, transport, CCTV safety, sports, library, medical room and more."
        />
        <meta
          name="keywords"
          content="school facilities, science lab, computer lab, CCTV safety, library, transport"
        />
      </Helmet>

      {/* HERO SECTION */}
      <section className="relative w-full bg-gradient-to-r from-blue-900 to-blue-600 text-white py-28 md:py-40">
        <div className="container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-extrabold"
          >
            Our Facilities
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 max-w-2xl mx-auto text-lg md:text-xl opacity-95"
          >
            World-Class Infrastructure Designed for Excellence
          </motion.p>

          <div className="mt-10 w-10 h-1 bg-white rounded-full mx-auto" />
        </div>
      </section>

      {/* FACILITIES GRID */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionTitle
            title="Infrastructure & Facilities"
            subtitle="Providing the best learning environment"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilities.map((facility, index) => (
              <Card
                key={facility.title}
                title={facility.title}
                description={facility.description}
                icon={facility.icon}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* EXTRA INFO */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-8">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <h3 className="text-2xl font-bold text-blue-700 mb-4">
              Safety & Security
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>✓ 24/7 Security Staff</li>
              <li>✓ CCTV Surveillance</li>
              <li>✓ Fire Safety Systems</li>
              <li>✓ Medical Support</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <h3 className="text-2xl font-bold text-blue-700 mb-4">
              Technology Integration
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Smart Classrooms</li>
              <li>✓ High-Speed Internet</li>
              <li>✓ Digital Learning Tools</li>
              <li>✓ Online Library</li>
            </ul>
          </motion.div>

        </div>
      </section>
    </>
  );
};

export default Facilities;
