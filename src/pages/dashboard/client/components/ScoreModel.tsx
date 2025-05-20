import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router";

interface ScoreProp {
    score: number,
    total: number,
    onClose: () => void
}

const ScoreModel = ({ score, total, onClose }: ScoreProp) => {
    const navigate  = useNavigate()
  return (
    <div className="bg-white p-10 rounded-md shadow-lg max-w-sm">
      <div className="flex justify-between items-center mb-4 space-x-10">
        <h2 className="text-xl font-bold">Amanota Wagize</h2>
        <button onClick={onClose} className="text-red-500">
          <IoMdClose size={24} />
        </button>
      </div>

      <p className="text-gray-700 text-lg">Wagerageje Kizami</p>
      <p className="text-2xl font-semibold text-green-600">{score} / {total}</p>

      {/* <button
        onClick={onClose}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        Fungura
      </button> */}
      <button
        onClick={() => navigate("/client/exam/answers")}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        Reba ibisubizo
      </button>
    </div>
  );
};

export default ScoreModel;
