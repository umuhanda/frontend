import mtn from '../assets/mtn.jpg';

const PaymentModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 flex min-h-screen items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="bg-white rounded-lg p-6 shadow-xl">
        <p>Payment Modal</p>
        <img src={mtn} alt="Mtn_Logo" className="w-full h-10 object-cover rounded-md" />
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PaymentModal;
