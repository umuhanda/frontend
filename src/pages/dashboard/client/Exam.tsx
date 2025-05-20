import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BsQuestionCircleFill } from 'react-icons/bs';
import { FaLanguage } from 'react-icons/fa';
import { MdCheckCircle, MdOutlineScore, MdTimer } from 'react-icons/md';
import { useNavigate } from 'react-router';
import LanguageSwitcher from '../../../components/LanguageSwitcher';
import Layout from './Layout';


interface ExamInfo {
  label: string;
  value: string | JSX.Element;
  icon: JSX.Element;
}

const LANGUAGE_MAPPING: Record<string, string> = {
  kiny: 'Kinyarwanda',
  en: 'English',
  fr: 'Français',
} as const;

// Animation variants
const fadeInFromTop = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0 },
};

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

const Exam = ({ path }: { path?: string }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const languageStatus = useMemo(() => {
    const language = localStorage.getItem('i18nextLng');
    return (
      LANGUAGE_MAPPING[language as keyof typeof LANGUAGE_MAPPING] || 'Please choose a language'
    );
  }, []);

  console.log(languageStatus);

  const examInfoItems: ExamInfo[] = useMemo(
    () => [
      {
        label: t('question_count'),
        value: '20',
        icon: <BsQuestionCircleFill className="w-6 h-6 text-blue-500" />,
      },
      {
        label: t('time_limit'),
        value: '20 mins',
        icon: <MdTimer className="w-6 h-6 text-green-500" />,
      },
      {
        label: t('total_score'),
        value: '20',
        icon: <MdOutlineScore className="w-6 h-6 text-yellow-500" />,
      },
      {
        label: t('passing_score'),
        value: '20',
        icon: <MdCheckCircle className="w-6 h-6 text-purple-500" />,
      },
      {
        label: t('Choose_language'),
        value: <LanguageSwitcher />,
        icon: <FaLanguage className="w-6 h-6 text-purple-500" />,
      },
    ],
    [t],
  );

  const handleStartExam = () => {
    if (path && typeof path === 'string' && path.trim().length > 0) {
      navigate('questions');
    } else {
      navigate('questions');
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center px-4 py-10 space-y-6 md:space-y-12">
        <motion.p
          className="text-3xl font-extrabold text-blue-600 sm:text-5xl md:text-6xl"
          variants={fadeInFromTop}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8 }}
        >
          {t('exam_title')}
        </motion.p>

        <motion.div
          className="w-full max-w-2xl space-y-8 bg-white p-6 rounded-2xl shadow-lg sm:p-8"
          variants={fadeInScale}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6 }}
        >
          {examInfoItems.map((item, index) => (
            <div
              key={`exam-info-${index}`}
              className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0"
            >
              <div className="flex items-center space-x-3">
                {item.icon}
                <p className="text-lg font-medium text-gray-700">{item.label}</p>
              </div>
              <div className="text-lg font-semibold text-gray-800">{item.value}</div>
            </div>
          ))}
        </motion.div>

        <motion.button
          className="px-6 py-3 text-lg font-bold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
          variants={fadeInScale}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
          // variants={buttonAnimation}
          onClick={handleStartExam}
        >
          {t('start_exam')}
        </motion.button>
      </div>
    </Layout>
  );
};

export default Exam;
