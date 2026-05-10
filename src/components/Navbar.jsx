import { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { Moon, Sun, Search, Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
  'General', 'Business', 'Technology', 'Science', 'Health', 'Sports', 'Entertainment'
];

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setSearchQuery('');
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed w-full top-0 z-50 glass-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <Globe className="text-white w-6 h-6" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-gradient">Zenith</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {categories.map((cat) => (
              <NavLink
                key={cat}
                to={`/category/${cat.toLowerCase()}`}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative ${
                    isActive ? 'text-primary' : 'text-foreground/80 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {cat}
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative group">
              <input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 pl-10 pr-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800/50 border border-transparent focus:border-primary/50 focus:bg-white dark:focus:bg-[#09090b] focus:ring-2 focus:ring-primary/20 transition-all duration-300 outline-none text-sm group-hover:w-64"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
            </form>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800/50 hover:bg-zinc-200 dark:hover:bg-zinc-700/50 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-50"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-zinc-900 dark:text-zinc-50">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden glass-panel border-t border-white/10"
          >
            <div className="px-4 pt-2 pb-4 space-y-2">
              <form onSubmit={handleSearch} className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-zinc-50 outline-none focus:border-primary"
                />
                <Search className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
              </form>
              {categories.map((cat) => (
                <NavLink
                  key={cat}
                  to={`/category/${cat.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive ? 'bg-primary/10 text-primary' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/50'
                    }`
                  }
                >
                  {cat}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
