import express from 'express';
import axios from 'axios';

const router = express.Router();

const mockQuotes = [
  { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { content: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  { content: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { content: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { content: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { content: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { content: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
  { content: "Dream big and dare to fail.", author: "Norman Vaughan" },
  { content: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { content: "What you do today can improve all your tomorrows.", author: "Ralph Marston" }
];

router.get('/', async (req, res) => {
  try {
    try {
      const response = await axios.get('https://api.quotable.io/random');
      res.json({
        content: response.data.content,
        author: response.data.author,
        mock: false
      });
    } catch (apiError) {
      const randomQuote = mockQuotes[Math.floor(Math.random() * mockQuotes.length)];
      res.json({
        ...randomQuote,
        mock: true
      });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quote' });
  }
});

export default router;
