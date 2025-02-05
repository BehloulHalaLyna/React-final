import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchQuestions } from '../api/quizApi';
import { Question } from '../components/Question';
import { useQuiz } from '../context/QuizContext';

export const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { category, difficulty } = location.state || {};
  const { 
    currentQuestion, 
    setCurrentQuestion, 
    score, 
    gameOver, 
    setGameOver, 
    resetQuiz 
  } = useQuiz();

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

  if (isLoading) return <div>Chargement des questions...</div>;
  if (error) return <div>Erreur: {error.message}</div>;
  if (!questions) return null;

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setGameOver(true);
      navigate('/results', { state: { category, difficulty } });
    }
  };

  if (gameOver) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4 text-center">
        <p className="text-lg">
          Question {currentQuestion + 1} sur {questions.length}
        </p>
        <p className="text-lg">Score: {score}</p>
      </div>
      
      <Question
        key={currentQuestion}
        question={questions[currentQuestion]}
        onNextQuestion={handleNextQuestion}
      />
    </div>
  );
};