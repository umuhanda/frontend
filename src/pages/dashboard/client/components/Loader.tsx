import Layout from '../Layout';

const Loader = () => {
  return (
    <Layout>
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
        <span className="ml-4 text-gray-600">Loading data, Please wait...</span>
      </div>
    </Layout>
  );
};

export default Loader;
