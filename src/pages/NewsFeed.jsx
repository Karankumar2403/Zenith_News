import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import ArticleCard from '../components/ArticleCard';
import { Loader2, AlertCircle } from 'lucide-react';

export default function NewsFeed({ isHome = false }) {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q');
  
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        let url;
        const isDev = import.meta.env.DEV;
        
        if (isDev) {
          // In local development, fetch directly from NewsAPI
          url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
          if (searchQuery) {
            url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchQuery)}&apiKey=${apiKey}`;
          } else if (category && category !== 'general') {
            url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
          }
        } else {
          // In production, use Vercel Serverless Function to bypass CORS and Free Tier restrictions
          url = `/api/news?`;
          if (searchQuery) {
            url += `q=${encodeURIComponent(searchQuery)}`;
          } else if (category && category !== 'general') {
            url += `category=${category}`;
          }
        }

        const response = await axios.get(url);
        
        if (response.data.status === 'ok') {
          // Filter out removed articles
          const validArticles = response.data.articles.filter(
            article => article.title && article.title !== '[Removed]' && article.url
          );
          setArticles(validArticles);
        } else {
          throw new Error(response.data.message || 'Failed to fetch news');
        }
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Failed to load news. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category, searchQuery]);

  let title = 'Top Stories';
  if (searchQuery) title = `Search Results for "${searchQuery}"`;
  else if (category) title = category.charAt(0).toUpperCase() + category.slice(1) + ' News';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{title}</h1>
        <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full" />
      </motion.div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="text-muted-foreground font-medium animate-pulse">Curating the latest stories...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-64 space-y-4 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mb-2" />
          <h3 className="text-xl font-bold">Oops! Something went wrong</h3>
          <p className="text-muted-foreground max-w-md">{error}</p>
        </div>
      ) : articles.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800/50 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">📰</span>
          </div>
          <h3 className="text-xl font-bold mb-2">No articles found</h3>
          <p className="text-muted-foreground">Try adjusting your search or exploring a different category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <ArticleCard key={`${article.url}-${index}`} article={article} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
