import { useLocation, useNavigate } from "react-router-dom";
import he from "he";

const Answers = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { questions } = location.state || {}; 

  if (!questions) {
    return <div className="text-center text-xl text-white">Aucune donnée disponible.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="max-w-4xl w-full bg-opacity-10 backdrop-blur-lg border border-gray-600 p-8 rounded-2xl shadow-2xl text-white">
        <h1 className="text-4xl font-extrabold text-cyan-400 text-center mb-6">📜 Réponses du Quiz</h1>

        <div className="space-y-6">
          {questions.map((question, index) => (
            <div key={index} className="p-6 bg-gray-800 bg-opacity-60 rounded-lg shadow-lg border border-gray-700">
              <h2 className="font-bold text-lg text-white mb-2">{he.decode(question.question)}</h2>
              <p className="mt-2 text-lg">
                <span className="font-semibold text-gray-300">Bonne réponse :</span> 
                <span className="text-green-400 font-bold"> {he.decode(question.correct_answer)}</span>
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/")}
            className="w-full px-6 py-3 bg-cyan-500 text-black font-bold text-lg rounded-lg shadow-lg hover:bg-cyan-600 transition-transform transform hover:scale-105"
          >
            🔄 Rejouer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Answers;
