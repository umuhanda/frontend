import { useTranslation } from 'react-i18next';
import PricingCard from '../components/PricingCard';
import { pricingOptions } from '../utils/pricingOptions';
import { useEffect, useState } from 'react';

interface OptionsProps {
  id: number;
  description: string;
  status: boolean;
}

interface PriceProps {
  id: number;
  header: string;
  description: string;
  price: number;
  options: OptionsProps[];
}

const Pricing = () => {
  const { t } = useTranslation();

  const language = localStorage.getItem('i18nextLng');
  const [filteredPrices, setFilteredPrices] = useState<PriceProps[]>([]);

  useEffect(() => {
    const pricing = pricingOptions.filter((prices) => prices.status === language);
    setFilteredPrices(pricing);
  }, [language]);

  return (
    <section className="p-4" id="pricing">
      <p className="text-center text-3xl font-bold underline py-4">{t('choosePlan')}</p>
      <div className="flex items-center justify-center my-6 space-x-6 max-md:flex-col max-md:space-y-4 flex-wrap">
        {filteredPrices.map(({ id, header, description, price, options }) => (
          <PricingCard
            key={id}
            header={t(header)}
            description={t(description)}
            price={price}
            options={options.map((option) => ({
              ...option,
              description: t(option.description),
            }))}
          />
        ))}
      </div>
    </section>
  );
};

export default Pricing;
