export default async function handler(req, res) {
  const { category, q } = req.query;
  const apiKey = process.env.VITE_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ status: 'error', message: 'API key is not configured' });
  }

  try {
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
    
    if (q) {
      url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&apiKey=${apiKey}`;
    } else if (category && category !== 'general') {
      url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to fetch news from server' });
  }
}
