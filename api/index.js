import express from 'express';
import cors from 'cors';

const app = express();

// cors
app.use(cors());

app.get('/api/greet', (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: 'Name is required.' });
  }

  return res
    .status(200)
    .json({ message: `Hello, ${name}! Welcome to Younglabs.` });
});

const port = process.env.PORT || 3000;
app.listen(port, console.log(`server is listening on port ${port}...`));
