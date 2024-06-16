import 'dotenv/config';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import path from 'path';

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Diretório onde as imagens serão salvas
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const authenticateJWT = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (user && user.jwtToken === token) {
      req.user = decoded;
      next();
    } else {
      res.status(401).json({ error: 'Invalid token.' });
    }
  } catch (err) {
    console.error('Token verification error:', err);
    res.status(400).json({ error: 'Invalid token.' });
  }
};

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '7d' });
    await prisma.user.update({
      where: { id: user.id },
      data: { jwtToken: token },
    });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid email or password.' });
  }
});

app.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Email, password, and name are required' });
  }
  const hashedPassword = bcrypt.hashSync(password, 8);
  try {
    const user = await prisma.user.create({ data: { email, password: hashedPassword, name } });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'User already exists' });
  }
});

app.post('/upload', authenticateJWT, upload.single('profilePicture'), async (req, res) => {
  const { file } = req;
  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: { profilePicture: file.path },
    });
    res.json(user);
  } catch (error) {
    console.error('Error updating profile picture:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/profile', authenticateJWT, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});