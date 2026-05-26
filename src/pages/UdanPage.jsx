import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../components/SectionTitle";

// ❌ NO IMPORTS FOR PDFs OR COVER
// ✅ USE PUBLIC PATHS DIRECTLY

const cover = "/assets/books/udan.png";

// -------------------------------
// BOOK DATA
// -------------------------------
const bookData = {
  1: {
    title: "UDAN Book 1",
    author: "Jadhavar Publication",
    cover,
    file: "/assets/books/udan-1.pdf",
    about:
      "Udan 1 introduces foundational concepts, easy grammar rules, vocabulary building, and practice exercises.",
    why:
      "Perfect for beginners and helps children build confidence.",
    highlights: [
      "Basic grammar concepts",
      "Beginner vocabulary",
      "Short moral stories",
      "Fun worksheets",
    ],
  },
  2: {
    title: "UDAN Book 2",
    author: "Jadhavar Publication",
    cover,
    file: "/assets/books/udan-2.pdf",
    about:
      "Udan 2 improves reading comprehension, sentence formation and grammar.",
    why:
      "Strengthens basics and communication skills.",
    highlights: [
      "Story comprehension",
      "Activity-based learning",
      "Grammar worksheets",
      "Vocabulary expansion",
    ],
  },
  3: {
    title: "UDAN Book 3",
    author: "Jadhavar Publication",
    cover,
    file: "/assets/books/udan-3.pdf",
    about:
      "Intermediate reading lessons and creative writing.",
    why: "Develops writing and comprehension skills.",
    highlights: [
      "Intermediate grammar",
      "Creative writing",
      "Reading passages",
      "Revision tests",
    ],
  },
  4: {
    title: "UDAN Book 4",
    author: "Jadhavar Publication",
    cover,
    file: "/assets/books/udan-4.pdf",
    about: "Advanced grammar lessons and long passages.",
    why: "Improves academic writing skills.",
    highlights: [
      "Advanced grammar",
      "Long passages",
      "Skill worksheets",
      "Writing tasks",
    ],
  },
  5: {
    title: "UDAN Book 5",
    author: "Jadhavar Publication",
    cover,
    file: "/assets/books/udan-5.pdf",
    about: "Formal writing formats and vocabulary.",
    why: "Exam-oriented preparation.",
    highlights: [
      "Formal writing",
      "High-level grammar",
      "Vocabulary boosters",
      "Practice sets",
    ],
  },
  6: {
    title: "UDAN Book 6",
    author: "Jadhavar Publication",
    cover,
    file: "/assets/books/udan-6.pdf",
    about: "Essay writing and academic English.",
    why: "Builds academic communication.",
    highlights: [
      "Essay writing",
      "Advanced comprehension",
      "Grammar mastery",
      "Exam focus",
    ],
  },
  7: {
    title: "UDAN Book 7",
    author: "Jadhavar Publication",
    cover,
    file: "/assets/books/udan-7.pdf",
    about: "Analytical reading and critical thinking.",
    why: "Useful for competitive exams.",
    highlights: [
      "Critical reading",
      "Complex grammar",
      "Analysis passages",
      "Projects",
    ],
  },
  8: {
    title: "UDAN Book 8",
    author: "Jadhavar Publication",
    cover,
    file: "/assets/books/udan-8.pdf",
    about: "Most advanced lessons for senior students.",
    why: "Board & college-level preparation.",
    highlights: [
      "Advanced essays",
      "High-level comprehension",
      "Grammar excellence",
      "Final preparation",
    ],
  },
};

// -------------------------------
// PAGE COMPONENT
// -------------------------------
const UdanPage = () => {
  const { id } = useParams();
  const data = bookData[id];

  if (!data) {
    return (
      <h2 className="text-center text-xl py-20">
        Book Not Found
      </h2>
    );
  }

  return (
    <>
      <Helmet>
        <title>{data.title} | Jadhavar</title>
        <meta
          name="description"
          content={`${data.title} – Download and explore book details.`}
        />
      </Helmet>

      <div className="container mx-auto px-6 md:px-10 lg:px-20 py-24">
        <SectionTitle title={data.title} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 mt-10">

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center"
          >
            <img
              src={data.cover}
              alt={data.title}
              className="w-72 md:w-80 rounded-xl shadow-xl"
            />
          </motion.div>

          {/* CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold">{data.title}</h2>

            <p><strong>Author:</strong> {data.author}</p>

            <p><strong>What’s inside:</strong> {data.about}</p>
            <p><strong>Why to read:</strong> {data.why}</p>

            <ul className="list-disc ml-6 space-y-1">
              {data.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>

            {/* DOWNLOAD */}
            <a
              href={data.file}
              download
              className="inline-block mt-4 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg shadow-lg"
            >
              Download Book 📥
            </a>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default UdanPage;
