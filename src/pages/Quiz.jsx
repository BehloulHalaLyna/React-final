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
  const [timeLeft, setTimeLeft] = useState(15); // ⏳ Timer de 15 secondes par question

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
      handleNextQuestion(""); // Passe à la question suivante si le temps est écoulé
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    
    return () => clearInterval(timer); // Nettoie le timer à chaque changement de question
  }, [timeLeft]);

  if (isLoading) return <div>Chargement des questions...</div>;
  if (error) return <div>Erreur: {error.message}</div>;
  if (!questions) return null;

  const saveScore = () => {
    if (scoreSaved) return;

    const newEntry = {
      playerName: playerName || "Joueur Anonyme", 
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
    setTimeLeft(15); // ⏳ Reset le timer pour la prochaine question

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
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-4xl font-bold mb-6">🎉 Quiz Terminé !</h2>
        <p className="text-2xl mb-4">🏆 Score Final: <span className="font-bold text-blue-600">{score} / {questions.length}</span></p>
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => navigate("/answers", { state: { questions, userAnswers } })}
            className="px-5 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
          >
            📜 Voir les Réponses
          </button>
          <button
            onClick={() => navigate("/leaderboard")}
            className="px-5 py-3 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600"
          >
            🏅 Voir Classement
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-5 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
          >
            🔄 Rejouer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4 text-center">
        <p className="text-lg">
          Question {currentQuestion + 1} sur {questions.length}
        </p>
        <p className="text-lg">Score: {score}</p>
        <p className="text-lg font-bold text-red-500">⏳ Temps restant : {timeLeft} sec</p>
      </div>
      
      <Question
        key={currentQuestion}
        question={questions[currentQuestion]}
        onNextQuestion={handleNextQuestion}
      />
    </div>
  );
};
