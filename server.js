import 'dotenv/config';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

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
    res.status(400).json({ error: 'Invalid token.' });
  }
};

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '7d' });
    await prisma.user.update({ where: { id: user.id }, data: { jwtToken: token } });
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
      data: { profilePicture: file.filename },
    });
    res.json(user);
  } catch (error) {
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
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.put('/profile', authenticateJWT, async (req, res) => {
  const { name, email, password, profilePicture } = req.body;
  const updateData = { name, email, profilePicture };

  if (password) {
    updateData.password = bcrypt.hashSync(password, 8);
  }

  try {
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: updateData,
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/emergency-contacts', authenticateJWT, async (req, res) => {
  try {
    const contacts = await prisma.emergencyContact.findMany({ where: { userId: req.user.id } });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/emergency-contacts', authenticateJWT, async (req, res) => {
  const { name, phone } = req.body;
  try {
    const contact = await prisma.emergencyContact.create({
      data: { name, phone, userId: req.user.id },
    });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/emergency-contacts/:id', authenticateJWT, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.emergencyContact.delete({ where: { id: parseInt(id, 10) } });
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/medical-records', authenticateJWT, async (req, res) => {
  try {
    const records = await prisma.medicalRecord.findMany({ where: { userId: req.user.id } });
    res.json(records);
  } catch (error) {
    console.error('Error fetching records:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/medical-records', authenticateJWT, async (req, res) => {
  const { 
    patientNumber, familyDoctor, familyDoctorPhone, healthCenter, 
    healthCenterLocation, healthInsuranceNumber, allergies, medication, 
    vaccinesUpToDate, vitalWill, vitalWillExpiryDate 
  } = req.body;
  try {
    const record = await prisma.medicalRecord.create({
      data: {
        patientNumber, familyDoctor, familyDoctorPhone, healthCenter, 
        healthCenterLocation, healthInsuranceNumber, allergies, medication, 
        vaccinesUpToDate, vitalWill, vitalWillExpiryDate, userId: req.user.id,
      },
    });
    res.json(record);
  } catch (error) {
    console.error('Error creating record:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/medical-records/:id', authenticateJWT, async (req, res) => {
  const { id } = req.params;
  const { 
    patientNumber, familyDoctor, familyDoctorPhone, healthCenter, 
    healthCenterLocation, healthInsuranceNumber, allergies, medication, 
    vaccinesUpToDate, vitalWill, vitalWillExpiryDate 
  } = req.body;
  try {
    const record = await prisma.medicalRecord.update({
      where: { id: Number(id) },
      data: {
        patientNumber, familyDoctor, familyDoctorPhone, healthCenter, 
        healthCenterLocation, healthInsuranceNumber, allergies, medication, 
        vaccinesUpToDate, vitalWill, vitalWillExpiryDate,
      },
    });
    res.json(record);
  } catch (error) {
    console.error('Error updating record:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/medical-records/:id', authenticateJWT, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.medicalRecord.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting record:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});