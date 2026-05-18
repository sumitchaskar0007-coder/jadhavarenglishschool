import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SectionTitle from "../components/SectionTitle";
import { Link } from "react-router-dom";

const AnimatedCounter = ({ value }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value.replace(/\D/g, "")); // Extract digits
    const duration = 2000;
    const stepTime = 20;

    const timer = setInterval(() => {
      start += end / (duration / stepTime);
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(Math.floor(start));
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {count}
      {value.includes("+") && "+"}
      {value.includes("%") && "%"}
    </span>
  );
};

const AboutUs = () => {
  const leadership = [
    {
      name: "Prin. Dr. Sudhakarrao Jadhavar",
      position: "President",
      image: "/assets/images/president.png",
      description:
        "Visionary leader with extensive experience in education. Committed to providing value-based education that transforms youth into confident, capable individuals.",
      qualifications:
        "M.Com, M.A., L.L.M., M.P.M., D.T.L., D.L.L. & L.W., G.D.C. & A., Ph.D.",
    },
    {
      name: "Adv. Shardul Sudhakarrao Jadhavar",
      position: "Vice-President",
      image: "/assets/images/vicepresident.png",
      description:
        "Focused on developing competent, committed, and compassionate students through modern educational approaches and comprehensive support systems.",
      qualifications:
        "M.B.A., P.G.D.H.R.M., B.Com., D.H.R.&L., D.C.L., D.CP.L., APCL",
    },
    {
      name: "Shakil Daud Shaikh",
      position: "Principal",
      image: "/assets/images/principal.jpg",
      description:
        "A dedicated Principal with an M.Sc. and B.Ed., committed to fostering academic excellence and holistic development among students. Demonstrates strong leadership, effective administration, and a student-centered approach to building a progressive learning environment.",
      qualifications: "M.Sc., B.Ed.",
    },
  ];

  const achievements = [
    { number: "8+", label: "Years of Excellence" },
    { number: "500+", label: "Students Transformed" },
    { number: "27+", label: "Expert Faculty" },
    { number: "100%", label: "Success Rate" },
  ];

  const teacherPodcasts = [
    {
      id: 1,
      title:
        "Centre for Public Prosecutor Exam Preparation, Training & Research",
      teacher: "Dr.Sapna Sukrut Dev ",
      subject: "Exam Preparation & Training Research",
      thumbnail: "/src/assets/images/podcast1.jpg",
      videoUrl: "https://youtu.be/q_UtiAo0E_g?si=5bMLrUVHeppQ9O7g",
      duration: "4:29",
      description:
        "Iauguration Ceremony of the Centre for Public Prosecutor – Exam Preparation, Training & Research at Jadhavar College of Law.",
      views: "1.2K",
      date: "Sep 8, 2025",
    },
    {
      id: 2,
      title: "Technology is a Lifeline of Education ",
      teacher: "Prof. Priyanka Patil",
      subject: "Technology is a Lifeline of Education",
      thumbnail: "/src/assets/images/poducast2.jpg",
      videoUrl: "https://youtu.be/jzdJhX-y7Gc?si=uDMVccxFazH4qnNL",
      duration: "6:57",
      description:
        "💻Technology is a Lifeline of Education. It bridges the gap between teachers and students, making education interactive, accessible & creative.",
      views: "2.1K",
      date: "Oct 7, 2025",
    },
    {
      id: 3,
      title: "Parents' Role in Children's Education",
      teacher: "Sarika Shevale ",
      subject: "Parents' Role in Children's Education",
      thumbnail: "/src/assets/images/poducast3.jpg",
      videoUrl: "https://youtu.be/oWIxgYgBLp8?si=C80aQDIxF0Gzmt4J",
      duration: "5:08",
      description:
        "A child's first school is home. Their encouragement, guidance, and values shape lifelong learning & success. 🌱",
      views: "1.8K",
      date: "Oct 11, 2025",
    },
  ];

  const youtubeChannelUrl =
    "https://www.youtube.com/@jadhavargroupofinstitutespune";

  const handleWatchVideo = (videoUrl) => {
    window.open(videoUrl, "_blank", "noopener,noreferrer");
  };

  const handleViewAllPodcasts = () => {
    window.open(youtubeChannelUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Helmet>
        <title>
          About Us - Jadhavar English Medium School & Jr. College | Pune
        </title>
        <meta
          name="description"
          content="Jadhavar English Medium School & Jr. College - 28+ years of educational excellence in Pune. Quality education with visionary leadership since 1995."
        />
      </Helmet>

      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            About Jadhavar
          </motion.h1>

          <p className="text-xl text-blue-100 mb-8">
            Excellence in Education Since 1995
          </p>

          {/* COUNTER SECTION */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {achievements.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-white/20 px-6 py-3 rounded-lg backdrop-blur-sm"
              >
                <div className="text-2xl font-bold">
                  <AnimatedCounter value={item.number} />
                </div>
                <div className="text-sm">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Our Story" 
            subtitle="28+ Years of Educational Excellence"
          />
          
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-700 mb-6">
              Established in 1995, Jadhavar English Medium School & Junior College has been a beacon of quality education in Pune. 
              We provide value-based education that transforms young minds into confident, capable individuals.
            </p>
            <p className="text-lg text-gray-700">
              Our vision <strong>"Education for strength, wisdom and intellect"</strong> guides our commitment to holistic development 
              and accessible education for all.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-3xl mb-4">👁️</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Vision</h3>
              <p className="text-gray-700">
                Education for strength, intellect & wisdom - preparing students to become productive, responsible, 
                ethical, creative & compassionate members of society.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Mission</h3>
              <p className="text-gray-700">
                To encourage students to embrace a world view while maintaining cultural values, dream big, 
                and achieve their highest potential through inclusive education.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Our Leadership"
            subtitle="Visionary Leaders Driving Excellence"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {leadership.map((leader, index) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-gray-50 rounded-2xl p-6 text-center"
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <h3 className="text-xl font-bold mb-2">{leader.name}</h3>
                <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold mb-3 inline-block">
                  {leader.position}
                </div>
                
                <p className="text-gray-600 mb-3">{leader.description}</p>
                <p className="text-sm text-gray-500">{leader.qualifications}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Teacher Podcasts Section */}
      

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Join Our Legacy</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Become part of an institution that has been shaping futures for over 28 years.
          </p>
{/*           
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Explore Admissions
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Visit Campus
            </button>
          </div> */}
          
<div className="flex flex-col sm:flex-row gap-4 justify-center">

  {/* Explore Admissions → Admission Page */}
  <Link to="/admissions">
    <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
      Explore Admissions
    </button>
  </Link>

  {/* Visit Campus → Departments Page */}
  <Link to="/departments">
    <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
      Visit Campus
    </button>
  </Link>

</div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;