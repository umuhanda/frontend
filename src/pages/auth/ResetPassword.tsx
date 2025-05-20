import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from '../../config/axios';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/Umuhanda_logo.png';
import authSignin from '../../assets/auth1.png';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/auth/request-reset', { emailOrPhone });
      setMessage(response.data.message);
      navigate('/verificationcode', { state: { emailOrPhone } });
    } catch (error: any) {
      setMessage(error.response?.data?.error || 'Something went wrong.');
      toast.error(message);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="flex-1 bg-gray-50 p-8 flex flex-col">
        <img src={logo} alt="Umuhanda Logo" className="w-40 mb-8" />
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
            {t('resetPassword')}
          </h1>
          <form onSubmit={handleSubmit} className="w-full max-w-md p-6 rounded-lg space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('phone_email_label')}
              </label>
              <input
                type="text"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder={t('phone_email_placeholder')}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                </>
              ) : (
                t('request_reset')
              )}
            </button>
          </form>
        </div>
      </div>
      <div className="flex-1 hidden lg:block">
        <img src={authSignin} alt="Auth Illustration" className="h-full w-full object-cover" />
      </div>
    </div>
  );
};

export default ResetPassword;
