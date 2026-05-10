import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import NewsFeed from './pages/NewsFeed';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen relative transition-colors duration-300">
          {/* Subtle animated background gradient */}
          <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
          
          <Navbar />
          
          <main>
            <Routes>
              <Route path="/" element={<Navigate to="/category/general" replace />} />
              <Route path="/category/:category" element={<NewsFeed />} />
              <Route path="/search" element={<NewsFeed />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
