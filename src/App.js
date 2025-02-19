import './App.css';
import Quiz from './components/Quiz';
import { quizData } from './data/quizData';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-6">🚀 Interactive Quiz Platform</h1>
      <Quiz />
    </div>
  );
}

export default App;
