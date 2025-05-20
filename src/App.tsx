import { useLocation } from 'react-router-dom';
import Layout from './Layout';
import { Hero, FeatureNumber, Pricing } from './pages';
import CallToAction from './pages/CallToAction';
import Testimonial from './pages/Testimonial';
import { useEffect } from 'react';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo === 'pricing') {
      setTimeout(() => {
        const el = document.getElementById('pricing');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // allow layout to render
    }
  }, [location]);
  return (
    <>
      <Layout>
        <Hero />
        <FeatureNumber />
        <Pricing />
        <Testimonial />
        <CallToAction />
      </Layout>
    </>
  );
};

export default App;
