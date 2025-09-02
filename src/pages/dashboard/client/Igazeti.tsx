import { motion } from 'framer-motion';
import { Fragment, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import englishIgazeti from '../../../assets/igazeti/english igazeti.pdf';
import francaisIgazeti from '../../../assets/igazeti/french igazeti.pdf';
import kinyarwandaIgazeti from '../../../assets/igazeti/kinyarwada igazeti.pdf';
import PdfViewer from '../../../PdfRender';
import Layout from './Layout';

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


  const handleMagazineChange = (magazine: Magazine) => {
    setIsLoading(true);
    setSelectedMagazine(magazine);
  };


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

        
            <PdfViewer
              file={selectedMagazine.ref}
              height="calc(100vh - 400px)"
              className="rounded-lg "
              onLoadSuccess={() => {
                setIsLoading(false);
                console.log('Magazine loaded successfully');
              }}
              onAccessRevoked={() => {
              }}
              onLoadError={(error) => {
                setIsLoading(false);
                console.error('Failed to load magazine:', error);
              }}
              onDownload={() => console.log(`Downloading ${selectedMagazine.title}`)}
            />
          </motion.div>
        </div>
      </Layout>
    </Fragment>
  );
};

export default Igazeti;
