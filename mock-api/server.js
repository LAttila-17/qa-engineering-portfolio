const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

// In-memory DB
const users = [
  { id: 1, name: 'Test User', username: 'testlll', email: 'testlll@example.com', password: '123' }
];

let posts = [
  { id: 1, userId: 1, title: 'First Post', content: 'Hello World', createdAt: new Date() }
];

let tokens = new Map();

// --- LOGIN ---
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = `token-${uuidv4()}`;
  tokens.set(token, { userId: user.id, createdAt: new Date() });

  res.json({ token });
});

// --- AUTH MIDDLEWARE ---
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  if (!tokens.has(token)) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  next();
};

// --- HEALTH CHECK ---
app.get('/', (req, res) => {
  res.status(200).send('OK');
});

// --- USERS ---
app.get('/users', authenticate, (req, res) => {
  res.json(users);
});

// --- POSTS ---
app.get('/posts', authenticate, (req, res) => {
  res.json(posts);
});

app.post('/posts', authenticate, (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const newPost = {
    id: posts.length + 1,
    userId: 1,
    title,
    content,
    createdAt: new Date()
  };

  posts.push(newPost);

  res.status(201).json(newPost);
});

app.put('/posts/:id', authenticate, (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);

  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const { title, content } = req.body;

  if (title !== undefined) post.title = title;
  if (content !== undefined) post.content = content;

  res.json(post);
});

app.delete('/posts/:id', authenticate, (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }

  posts.splice(index, 1);

  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Mock API running on http://localhost:${PORT}`);
});