import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  if (!isOpen) return null; // Don't render if modal is closed

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center"
      >
        {/* Close Button */}
        <button
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-green-600 mb-3">🎉 {t('payment_success_title')}</h2>
        <p className="text-gray-700 mb-6">{t('payment_success_body')}</p>
        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Ok
        </button>
      </motion.div>
    </div>
  );
};

export default PaymentSuccessModal;
