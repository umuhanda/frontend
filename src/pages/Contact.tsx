import Layout from '../Layout';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from '../config/axios';
import 'react-toastify/dist/ReactToastify.css';
import { Loader2 } from 'lucide-react';

const Contact = () => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    names: '',
    email: '',
    phone_number: '',
    message: '',
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const initialFormState = {
    names: '',
    email: '',
    phone_number: '',
    message: '',
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const response = await axios.post('/contact/', {
        names: formData.names,
        email: formData.email,
        phone_number: formData.phone_number,
        message: formData.message,
      });
      if (response.status == 201) {
        setFormData(initialFormState);
        toast.success(response.data.message);
      } else {
        toast.success(response.data.message);
      }
    } catch (error: any) {
      console.log(error);

      toast.error(error.response?.data?.error || 'Message was not sent !');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <section className="h-full flex flex-col items-center mt-16 px-4">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-3xl font-bold text-blue-600">{t('contact_header')}</h1>
          <p className="text-gray-600 mt-2">{t('contact_message')}</p>
        </header>

        {/* Contact Form */}
        <div className="mt-10 w-full max-w-md bg-white shadow-lg rounded-lg p-6">
          <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="names" className="block text-sm font-medium text-gray-700">
                {t('fullName')}
              </label>
              <input
                type="text"
                name="names"
                id="names"
                value={formData.names}
                onChange={handleChange}
                placeholder={t('enterFullName')}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t('email')}
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('enterEmail')}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Phone Number Input */}
            <div>
              <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                {t('phone_number')}
              </label>
              <input
                type="text"
                name="phone_number"
                id="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder={t('phone_placeholder')}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                pattern="^\+?(\d.*){3,}$"
              />
            </div>

            {/* Message Input */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                {t('message_label')}
              </label>
              <textarea
                name="message"
                id="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t('message_placeholder')}
                rows={4}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-600 flex justify-center py-3 text-white rounded-md font-medium hover:bg-blue-700 transition duration-300"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                </>
              ) : (
                t('submit_button')
              )}
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="mt-10 text-center">
          <p className="text-gray-700">{t('contact_info')}</p>
          <p className="font-semibold text-blue-600 mt-2">{t('contact_number')}</p>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
