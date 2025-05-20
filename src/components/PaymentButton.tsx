import { useState } from 'react';
import axios from '../config/axios';
import { isAuthenticated } from './ProtectedRoute';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useModal } from '../hooks/useModal';

const PaymentButton = ({
  subscriptionId,
  language,
  disabled,
}: {
  subscriptionId: string;
  language: string;
  disabled?: boolean;
}) => {
  const [loading, setLoading] = useState(false);
  const token = sessionStorage.getItem('token');
  const PUBLIC_KEY = import.meta.env.VITE_IPAY_PUBLIC_KEY;
  const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;
  const { t } = useTranslation();

  const { closeModal } = useModal();

  const handlePayment = async () => {
    setLoading(true);

    if (!isAuthenticated()) {
      window.location.href = `${FRONTEND_URL}/signin`;
      return;
    }

    try {
      // Send request to the backend to generate invoice
      const response = await axios.post(
        '/pay',
        { subscription_id: subscriptionId, language },
        {
          headers: {
            'irembopay-secretKey': PUBLIC_KEY,
            'X-API-Version': '2',
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );
      if (response.data.success) {

        setLoading(false);
        closeModal();
        window.open(response.data.paymentUrl, '_blank');
      } else {
        toast.error('Failed to create invoice. Please try again.');
        setLoading(false);
      }
    } catch (error) {
      toast.error('Un expected error occurred. Please try again.');
      console.error('❌ Error fetching invoice number:', error);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading || disabled}
      className={`w-full flex justify-center px-6 py-3 rounded-lg shadow-md transition-all duration-300 ${
        loading || disabled
          ? 'bg-blue-400 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700 text-white hover:bg-blue-700'
      }`}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
        </>
      ) : (
        t('payButton')
      )}
    </button>
  );
};

export default PaymentButton;
