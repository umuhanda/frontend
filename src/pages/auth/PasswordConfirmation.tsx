import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import axios from '../../config/axios';
import logo from '../../assets/Umuhanda_logo.png';
import authSignin from '../../assets/auth1.png';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PasswordConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const emailOrPhone = location.state?.emailOrPhone || '';
  const resetCode = location.state?.resetCode || '';
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match!');
      toast.error(message);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('/auth/reset-password', {
        emailOrPhone,
        resetCode,
        newPassword: password,
      });
      setMessage(response.data.message);
      toast.success(message);
      navigate('/signin');
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
            <input
              type="password"
              placeholder={t('new_password')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="password"
              placeholder={t('confirm_new_password')}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-3 px-6 rounded-lg"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                </>
              ) : (
                t('reset_password')
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

export default PasswordConfirmation;
