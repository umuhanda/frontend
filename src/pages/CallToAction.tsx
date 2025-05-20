import { useTranslation } from 'react-i18next';
import video from '../assets/video1.mp4';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';

const CallToAction = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const start = () => {
    navigate('/client');
  };
  return (
    <div className="relative flex items-center justify-center my-6">
      {/* Video Background */}
      <video
        src={video}
        className="rounded-md w-[80vw] max-h-[600px] max-sm-w:[100vw] object-cover"
        autoPlay
        muted
        loop
      />

      {/* Overlay Content */}
      <div className="absolute flex flex-col items-center text-center space-y-4  p-6 rounded-md">
        <motion.p
          className="text-lg sm:text-4xl font-bold text-blue-700 "
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t('call_to_action')}
        </motion.p>
        <motion.button
          onClick={start}
          className="bg-blue-500 text-white py-3 px-6 rounded-full hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Tangira hano"
        >
          {t('start_now')}
        </motion.button>
      </div>
    </div>
  );
};

export default CallToAction;
