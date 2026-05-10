import { motion } from 'framer-motion';
import { ExternalLink, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function ArticleCard({ article, index }) {
  const { title, description, url, urlToImage, publishedAt, source } = article;

  const defaultImage = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800';

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative flex flex-col bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
    >
      <div className="relative h-56 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
        <img
          src={urlToImage || defaultImage}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          onError={(e) => { e.target.src = defaultImage; }}
        />
        <div className="absolute bottom-4 left-4 z-20 flex items-center space-x-2">
          <span className="px-3 py-1 text-xs font-semibold bg-primary/90 text-white rounded-full backdrop-blur-sm">
            {source?.name || 'News Source'}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-grow p-6">
        <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-3">
          <Clock className="w-3.5 h-3.5" />
          <span>
            {publishedAt ? formatDistanceToNow(new Date(publishedAt), { addSuffix: true }) : 'Recently'}
          </span>
        </div>

        <h3 className="font-serif text-xl font-bold leading-tight mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-grow">
          {description || 'No description available for this article. Click to read the full story.'}
        </p>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 text-sm font-semibold text-primary group/link mt-auto w-fit"
        >
          <span>Read Full Story</span>
          <ExternalLink className="w-4 h-4 transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
        </a>
      </div>
    </motion.article>
  );
}
