import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import SectionTitle from "../components/SectionTitle";

const SchoolPrograms = () => {
  const programs = [
    {
      level: "Nursery & Kindergarten",
      age: "3–5 years",
      focus: "Play-based learning, motor skills, social development",
      subjects: "Pre-literacy, Pre-numeracy, Art, Music, Physical Activities",
    },
    {
      level: "Primary (1st - 5th)",
      age: "6–10 years",
      focus: "Foundation building, reading, writing, basic math",
      subjects:
        "English, Mathematics, Science, Social Studies, Languages, Art",
    },
    {
      level: "Middle School (6th - 8th)",
      age: "11–13 years",
      focus: "Conceptual understanding, critical thinking",
      subjects:
        "All core subjects with introduction to advanced topics",
    },
    {
      level: "Secondary (9th - 10th)",
      age: "14–15 years",
      focus: "Board preparation, career awareness",
      subjects:
        "Board curriculum with comprehensive preparation",
    },
  ];

  return (
    <>
      {/* ================= SEO ================= */}
      <Helmet>
        <title>
          School Programs | Nursery to 10th | Jadhavar English Medium School
        </title>
        <meta
          name="description"
          content="Jadhavar English Medium School offers Nursery to 10th standard education with a holistic curriculum, experienced faculty, and modern facilities."
        />
        <meta
          name="keywords"
          content="School in Pune, Nursery to 10th school, English medium school, CBSE school Pune, Jadhavar School"
        />
      </Helmet>

      {/* ================= HERO (BLUE, NO IMAGE) ================= */}
      <section className="bg-gradient-to-r from-blue-800 via-blue-700 to-blue-900 text-white">
        <div className="container-custom py-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-heading font-bold mb-4"
          >
            School Programs
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto"
          >
            Nursery to 10th Standard – Nurturing Young Minds with Quality Education
          </motion.p>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <div className="pb-20 bg-gray-50 min-h-screen">
        <div className="container-custom section-padding">

          <SectionTitle
            title="Our School Programs"
            subtitle="Structured learning for every stage of growth"
          />

          <div className="space-y-8">
            {programs.map((program, index) => (
              <motion.div
                key={program.level}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0px 15px 35px rgba(0,0,0,0.15)",
                }}
                className="bg-white p-8 rounded-xl border border-gray-100"
              >
                <h3 className="text-2xl font-heading font-bold text-primary mb-4">
                  {program.level}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <span className="font-semibold text-gray-700">
                      Age Group:
                    </span>{" "}
                    <span className="text-gray-600">{program.age}</span>
                  </div>

                  <div>
                    <span className="font-semibold text-gray-700">
                      Focus:
                    </span>{" "}
                    <span className="text-gray-600">{program.focus}</span>
                  </div>
                </div>

                <div>
                  <span className="font-semibold text-gray-700">
                    Subjects:
                  </span>{" "}
                  <span className="text-gray-600">{program.subjects}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SchoolPrograms;
