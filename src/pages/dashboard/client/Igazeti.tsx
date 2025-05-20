import { Fragment, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import englishIgazeti from '../../../assets/igazeti/english igazeti.pdf';
import francaisIgazeti from '../../../assets/igazeti/french igazeti.pdf';
import kinyarwandaIgazeti from '../../../assets/igazeti/kinyarwada igazeti.pdf';
import PdfViewer from '../../../PdfRender';
import Layout from './Layout';
import axios from '../../../config/axios';
import { useTranslation } from 'react-i18next';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './components/Loader';
import { useUser } from '../../../context/userContext';

interface Magazine {
  lang: string;
  ref: string;
  title: string;
  description?: string;
  icon?: string;
}

const magazines: Magazine[] = [
  {
    lang: 'english',
    ref: englishIgazeti,
    title: 'English Book(Igazeti)',
    description: 'Explore our content in English',
    icon: '🇬🇧',
  },
  {
    lang: 'francais',
    ref: francaisIgazeti,
    title: 'French Livre(Igazeti)',
    description: 'Découvrez notre contenu en français',
    icon: '🇫🇷',
  },
  {
    lang: 'kinyarwanda',
    ref: kinyarwandaIgazeti,
    title: 'Kinyarwanda Igazeti',
    description: 'Soma ibitekerezo byacu mu Kinyarwanda',
    icon: '🇷🇼',
  },
];

const Igazeti = () => {
  const [selectedMagazine, setSelectedMagazine] = useState<Magazine>(magazines[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const {
    attempts,
    fetchAttempts,
    hasAccessToDownloadGazette,
    loading: userLoading,
    user,
  } = useUser();
  const { t } = useTranslation();

  const handleGazettePayment = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem('token');
      const PUBLIC_KEY = import.meta.env.VITE_IPAY_PUBLIC_KEY;

      const response = await axios.post(
        '/pay',
        {
          subscription_id: '0',
          language: selectedMagazine.lang.toUpperCase(),
          transactionType: 'gaz',
        },
        {
          headers: {
            'irembopay-secretKey': PUBLIC_KEY,
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );

      if (response.data.success) {
        window.open(response.data.paymentUrl, '_blank');
      } else {
        toast.error('Something Went Wrong');
      }
    } catch (error) {
      console.error('❌ Payment error:', error);
      toast.error('Un expected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchAttempts();
      setLoadingData(false);
    };
    fetchData();
  }, [user?.active_subscription?._id]);

  const handleMagazineChange = (magazine: Magazine) => {
    setIsLoading(true);
    setSelectedMagazine(magazine);
  };

  if (loadingData || userLoading) {
    return <Loader />;
  }

  if (attempts.leftAttempts <= 0 && !attempts.unLimited)
    return (
      <Layout>
        <div className="flex p-6 items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">{t('no_sub')}</h2>
            <p className="text-gray-600 mb-4">{t('upgrade_sub_message')}</p>
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
              onClick={() => {
                window.location.href = '/';
                setTimeout(() => {
                  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                }, 100); // Wait for navigation
              }}
            >
              {t('upgrade_button')}
            </button>
          </div>
        </div>
      </Layout>
    );

  return (
    <Fragment>
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Books(Igazeti)</h1>
            <p className="text-gray-600">Choose your preferred language to read</p>
          </div>

          {/* Magazine Selection */}
          <div className="mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {magazines.map((magazine) => (
                <motion.button
                  key={magazine.lang}
                  onClick={() => handleMagazineChange(magazine)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                  flex items-center p-4 rounded-xl transition-all
                  ${
                    selectedMagazine.lang === magazine.lang
                      ? 'bg-blue-50 border-2 border-blue-500 shadow-md'
                      : 'bg-white border-2 border-gray-200 hover:border-blue-200'
                  }
                `}
                >
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{magazine.icon}</span>
                      <h3 className="font-semibold text-gray-900">{magazine.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{magazine.description}</p>
                  </div>
                  {selectedMagazine.lang === magazine.lang && (
                    <div className="w-3 h-3 bg-blue-500 rounded-full ml-4" />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* PDF Viewer Section */}
          <motion.div
            key={selectedMagazine.lang}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  <p className="mt-4 text-gray-600">Loading magazine...</p>
                </div>
              </div>
            )}

            {!hasAccessToDownloadGazette && (
              <div className="m-2 text-center">
                <p className="text-red-600 mb-4 font-medium">{t('needToPayGazette')}</p>
                <button
                  onClick={handleGazettePayment}
                  disabled={loading}
                  className={`px-6 py-3 rounded-lg shadow-md transition-all duration-300 ${
                    loading
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white hover:bg-blue-700'
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </>
                  ) : (
                    t('needToPayGazetteButton')
                  )}
                </button>
              </div>
            )}

            <PdfViewer
              file={selectedMagazine.ref}
              height="calc(100vh - 400px)"
              className="rounded-lg "
              onLoadSuccess={() => {
                setIsLoading(false);
                console.log('Magazine loaded successfully');
              }}
              onAccessRevoked={() => {
                toast.info('You have downloaded the gazette. Access is now revoked.');
                fetchAttempts();
              }}
              onLoadError={(error) => {
                setIsLoading(false);
                console.error('Failed to load magazine:', error);
              }}
              hideDownload={!hasAccessToDownloadGazette}
              onDownload={() => console.log(`Downloading ${selectedMagazine.title}`)}
            />
          </motion.div>
        </div>
      </Layout>
    </Fragment>
  );
};

export default Igazeti;
