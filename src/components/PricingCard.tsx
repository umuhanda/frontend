import { IoCheckmarkSharp } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useModal } from '../hooks/useModal';


interface OptionsProps {
  id: number;
  description: string;
  status: boolean;
}

interface PriceProps {
  header: string;
  description: string;
  price: number;
  options: OptionsProps[];
}

const PricingCard = ({ header, description, price, options }: PriceProps) => {
  const { t } = useTranslation();

  const { openModal } = useModal();

  const handlePaymentModal = () => {
    openModal();
  };

  return (
    <motion.div
      className="shadow-lg p-4 rounded-md min-w-80"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="flex-col">
        <div className="flex-col space-y-4 pb-2">
          <p className="text-blue-500 font-semibold">{header}</p>
          <p>{description}</p>
        </div>
        <div className="pb-2 space-x-4">
          <span className="text-5xl font-bold">{price}</span>
          <span>/rwf</span>
        </div>
        <ul className="space-y-4 py-4 border-y-2 border-y-slate-200">
          {options.map(({ id, description, status }) => (
            <motion.li
              key={id}
              className={`flex items-center space-x-2 ${!status ? 'text-red-600' : ''}`}
              whileHover={{ x: 10, color: !status ? '#dc2626' : '#2563eb' }} // Slide-in effect on hover
              transition={{ duration: 0.2 }}
            >
              <IoCheckmarkSharp />
              <p>{description}</p>
            </motion.li>
          ))}
        </ul>
        <motion.button
          className="bg-blue-700 text-white px-5 py-2 w-full rounded-md mt-4"
          whileHover={{
            scale: 1.1,
            boxShadow: '0px 4px 15px rgba(59, 130, 246, 0.3)',
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
          onClick={handlePaymentModal}
        >
          {t('start_now')}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PricingCard;
