import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import HeroBanner from "../components/HeroBanner";
import SectionTitle from "../components/SectionTitle";

const JuniorCollegePrograms = () => {
  const streams = [
    {
      name: "Science Stream",
      subjects:
        "Physics, Chemistry, Biology/Mathematics, English, Additional Subject",
      career: "Engineering, Medicine, Research, Technology",
      description:
        "Advanced science education supported by modern laboratories and expert faculty.",
    },
    {
      name: "Commerce Stream",
      subjects:
        "Accountancy, Economics, Business Studies, English, Mathematics/Statistics",
      career: "CA, MBA, Finance, Business Management, Banking",
      description:
        "Industry-focused commerce education with strong analytical and financial foundations.",
    },
    {
      name: "Arts Stream",
      subjects:
        "History, Political Science, Geography, Languages, Psychology/Sociology",
      career: "Law, Journalism, Civil Services, Social Work, Teaching",
      description:
        "Creative and analytical learning that builds leadership and communication skills.",
    },
  ];

  return (
    <>
      {/* ================= SEO ================= */}
      <Helmet>
        <title>
          Junior College Programs | Science, Commerce & Arts | Jadhavar Junior
          College
        </title>
        <meta
          name="description"
          content="Jadhavar English Medium School & Junior College offers 11th and 12th Science, Commerce, and Arts programs with expert faculty, modern facilities, and career guidance."
        />
        <meta
          name="keywords"
          content="Junior College Pune, 11th 12th admission, Science Commerce Arts junior college, best junior college in Pune, HSC junior college"
        />
      </Helmet>

      {/* ================= HERO (NO IMAGE, BLUE BG) ================= */}
      <section className="bg-gradient-to-r from-blue-800 via-blue-700 to-blue-900 text-white">
        <div className="container-custom py-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-heading font-bold mb-4"
          >
            Junior College Programs
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto"
          >
            11th & 12th Standard – Building Strong Academic Foundations for a
            Successful Future
          </motion.p>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <div className="pb-20 bg-gray-50 min-h-screen">
        <div className="container-custom section-padding">

          <SectionTitle
            title="Our Academic Streams"
            subtitle="Choose the right pathway for your future"
          />

          {/* ================= STREAM CARDS ================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {streams.map((stream, index) => (
              <motion.div
                key={stream.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 20px 40px rgba(0,0,0,0.15)",
                }}
                className="bg-white p-8 rounded-xl border border-gray-100"
              >
                <h3 className="text-2xl font-heading font-bold text-primary mb-3">
                  {stream.name}
                </h3>

                <p className="text-gray-600 mb-5 leading-relaxed">
                  {stream.description}
                </p>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-1">
                    Subjects Offered
                  </h4>
                  <p className="text-gray-600 text-sm">{stream.subjects}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">
                    Career Opportunities
                  </h4>
                  <p className="text-gray-600 text-sm">{stream.career}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ================= WHY CHOOSE US ================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0px 25px 60px rgba(0, 64, 255, 0.35)",
            }}
            className="rounded-2xl p-10 bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white"
          >
            <h3 className="text-3xl font-heading font-bold mb-6">
              Why Choose Our Junior College?
            </h3>

            <ul className="space-y-3 text-blue-100 text-lg">
              <li>✔ Experienced faculty with subject expertise</li>
              <li>✔ Well-equipped laboratories and libraries</li>
              <li>✔ Regular assessments and mock tests</li>
              <li>✔ Career counseling and guidance</li>
              <li>✔ Competitive exam preparation support</li>
              <li>✔ Safe and supportive learning environment</li>
            </ul>
          </motion.div>

        </div>
      </div>
    </>
  );
};

export default JuniorCollegePrograms;
