const express = require('express');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();
const app = express();

app.use(express.json());

const SECRET_KEY = 'your_secret_key';

// Middleware de autenticação
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

// Rota de login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid email or password.' });
  }
});

// Rota de registro
app.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  try {
    const user = await prisma.user.create({ data: { email, password: hashedPassword, name } });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'User already exists' });
  }
});

// Rota protegida
app.get('/medical-records', authenticateJWT, async (req, res) => {
  const records = await prisma.medicalRecord.findMany({ where: { userId: req.user.id } });
  res.json(records);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
