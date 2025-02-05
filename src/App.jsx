import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { QuizProvider } from './context/QuizContext';
import { Home } from './pages/Home';
import { Quiz } from './pages/Quiz';
import { Results } from './pages/Results';
import { Leaderboard } from './pages/Leaderboard';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <QuizProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/results" element={<Results />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </Router>
      </QuizProvider>
    </QueryClientProvider>
  );
}

export default App;