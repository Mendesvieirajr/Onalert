require('dotenv').config();
import express, { json } from 'express';
import { PrismaClient } from '@prisma/client';
import { verify, sign } from 'jsonwebtoken';
import { compareSync, hashSync } from 'bcryptjs';
const prisma = new PrismaClient();
const app = express();

app.use(json());

const SECRET_KEY = process.env.JWT_SECRET_KEY;

// Middleware de autenticação
const authenticateJWT = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = verify(token, SECRET_KEY);
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

// Rota de login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (user && compareSync(password, user.password)) {
    const token = sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    await prisma.user.update({
      where: { id: user.id },
      data: { jwtToken: token },
    });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid email or password.' });
  }
});

// Rota de registro
app.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  const hashedPassword = hashSync(password, 8);
  try {
    const user = await prisma.user.create({ data: { email, password: hashedPassword, name } });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'User already exists' });
  }
});

// Rota protegida para obter detalhes do perfil
app.get('/profile', authenticateJWT, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found.' });
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Rota protegida para atualizar o perfil
app.put('/profile', authenticateJWT, async (req, res) => {
  const { name, email, password, profilePicture } = req.body;
  const updateData = { name, email, profilePicture };

  if (password) {
    updateData.password = hashSync(password, 8);
  }

  try {
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: updateData,
    });
    res.json(user);
  } catch (error) {  
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});