import { useSearchParams, Link } from 'react-router-dom';
import Layout from '../pages/dashboard/client/Layout';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const PaymentFailure = () => {
  const [searchParams] = useSearchParams();
  const invoiceNumber = searchParams.get('invoice');
  const IPAY_URL = import.meta.env.VITE_IPAY_URL;
  const retryUrl = invoiceNumber ? `${IPAY_URL}/${invoiceNumber}` : null;
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="flex items-center justify-center mt-28  px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full"
        >
          <h2 className="text-2xl font-bold text-red-600 mb-3">❌ {t('payment_failure_title')}</h2>
          <p className="text-gray-700 mb-4">{t('payment_failure_body')}</p>
          {retryUrl && (
            <div className="mb-5">
              <p className="text-yellow-600 mb-2">{t('payment_failure_body2')}</p>
              <a
                href={retryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
              >
                {t('payment_retry_button')}
              </a>
            </div>
          )}
          <Link
            to="/pricing"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 hover:underline"
          >
            {t('payment_change_plan')}
          </Link>
        </motion.div>
      </div>
    </Layout>
  );
};

export default PaymentFailure;
