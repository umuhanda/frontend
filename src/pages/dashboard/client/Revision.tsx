import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import image from '../../../assets/ibyapa/Picture1.png';

interface question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

interface questionsStudy {
  id: number;
  title: string;
  author: string;
  description: string;
  status: string;
  contact: string[];
  questions: question[];
}

const Revision = ({ questions }: { questions: questionsStudy[] }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-6"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {questions?.map((course) => (
          <motion.div
            key={course.id}
            variants={itemVariants}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative">
              <img src={image} alt="image" className="h-48 w-full object-cover" />
              <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                {course.status}
              </span>
            </div>

            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                {course.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course?.description}</p>

              <div className="mt-4 flex justify-between items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium text-sm transition-colors duration-200 flex items-center space-x-2"
                  onClick={() => navigate(`/client/lessons/revision/${course.id}`)}
                >
                  <span>{t('start_learning')}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Revision;
