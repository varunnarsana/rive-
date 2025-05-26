import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header/Header';
import { HomePage } from './pages/Home/HomePage';
import TrendsPage from './pages/TrendsPage/TrendsPage';
import { AestheticsPage } from './pages/Aesthetics/AestheticsPage';
import { QuizPage } from './pages/Quiz/QuizPage';
import { SocialPage } from './pages/Social/SocialPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen">
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/trends" element={<TrendsPage />} />
              <Route path="/aesthetics" element={<AestheticsPage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/social" element={<SocialPage />} />
              <Route path="/profile" element={<div>Profile Page Coming Soon</div>} />
              <Route path="/profile/settings" element={<div>Settings Page Coming Soon</div>} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
