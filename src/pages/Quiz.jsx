import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchQuestions } from '../api/quizApi';
import { Question } from '../components/Question';
import { useQuiz } from '../context/QuizContext';

export const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { category, difficulty, playerName } = location.state || {}; 
  const { 
    currentQuestion, 
    setCurrentQuestion, 
    score, 
    gameOver, 
    setGameOver, 
    resetQuiz 
  } = useQuiz();

  const [userAnswers, setUserAnswers] = useState([]);
  const [scoreSaved, setScoreSaved] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15); 

  const { data: questions, isLoading, error } = useQuery({
    queryKey: ['questions', category, difficulty],
    queryFn: () => fetchQuestions({ category, difficulty }),
  });

  useEffect(() => {
    resetQuiz();
    return () => {
      setCurrentQuestion(0);
      setGameOver(false);
    };
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion(""); 
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    
    return () => clearInterval(timer); 
  }, [timeLeft]);

  if (isLoading) return <div className="text-center text-cyan-400">Chargement des questions...</div>;
  if (error) return <div className="text-center text-red-500">Erreur: {error.message}</div>;
  if (!questions) return null;

  const saveScore = () => {
    if (scoreSaved) return;

    const newEntry = {
      playerName: playerName || "Joueur", 
      score,
      difficulty,
      date: new Date().toISOString(),
    };

    const scores = JSON.parse(localStorage.getItem("leaderboard")) || [];
    scores.push(newEntry);
    scores.sort((a, b) => b.score - a.score); 
    localStorage.setItem("leaderboard", JSON.stringify(scores));

    console.log("🔥 Score enregistré :", newEntry);
    console.log("📊 Classement mis à jour :", scores);

    setScoreSaved(true);
  };

  const handleNextQuestion = (selectedAnswer) => {
    setUserAnswers((prev) => [...prev, selectedAnswer]);
    setTimeLeft(15); 

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setGameOver(true);
      saveScore();
    }
  };

  if (gameOver) {
    saveScore();

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
        <div className="max-w-4xl w-full bg-opacity-10 backdrop-blur-lg border border-gray-600 p-8 rounded-2xl shadow-2xl text-white text-center">
          <h2 className="text-4xl font-extrabold text-cyan-400">🎉 Quiz Terminé !</h2>
          <p className="text-2xl mb-4">🏆 Score Final: <span className="font-bold text-cyan-300">{score} / {questions.length}</span></p>
          <div className="flex justify-center gap-4 mt-6">
          <button
              onClick={() => navigate("/answers", { state: { questions} })}
              className="px-5 py-3 bg-green-500 text-black font-bold text-lg rounded-lg shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105"
            >
              📜 Voir les Réponses
            </button>
            <button
              onClick={() => navigate("/leaderboard")}
              className="px-5 py-3 bg-yellow-500 text-black font-bold text-lg rounded-lg shadow-lg hover:bg-yellow-600 transition-transform transform hover:scale-105"
            >
              🏅 Voir Classement
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-5 py-3 bg-cyan-500 text-black font-bold text-lg rounded-lg shadow-lg hover:bg-cyan-600 transition-transform transform hover:scale-105"
            >
              🔄 Rejouer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="max-w-4xl w-full bg-opacity-10 backdrop-blur-lg border border-gray-600 p-8 rounded-2xl shadow-2xl text-white text-center">
        <p className="text-lg text-cyan-400">Question {currentQuestion + 1} sur {questions.length}</p>
        <p className="text-lg text-cyan-300">Score: {score}</p>
        <p className="text-lg font-bold text-red-500">⏳ Temps restant : {timeLeft} sec</p>
        
        <Question
          key={currentQuestion}
          question={questions[currentQuestion]}
          onNextQuestion={handleNextQuestion}
        />
      </div>
    </div>
    
  );
};
