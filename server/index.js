import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import contactRoutes from './routes/contacts.js';
import projectRoutes from './routes/projects.js';
import dashboardRoutes from './routes/dashboard.js';
import testimonialRoutes from './routes/testimonials.js';
import teamRoutes from './routes/team.js';
import settingsRoutes from './routes/settings.js';
import uploadRoutes from './routes/upload.js';
import Admin from './models/Admin.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
// CORS — allow Vercel deploys, prodivity.in, and localhost
app.use(cors({
  origin: (origin, callback) => {
    const allowed = [
      /\.vercel\.app$/,
      /prodivity\.in$/,
      /localhost/,
    ];
    if (!origin || allowed.some((p) => p.test(origin))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/upload', uploadRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Seed default admin if none exists
const seedAdmin = async () => {
  try {
    const count = await Admin.countDocuments();
    if (count === 0) {
      await Admin.create({
        email: process.env.ADMIN_EMAIL || 'admin@prodivity.tech',
        password: process.env.ADMIN_PASSWORD || 'admin123',
        name: 'Admin',
      });
      console.log('✓ Default admin created');
    }
  } catch (err) {
    console.error('Error seeding admin:', err.message);
  }
};

// Connect to MongoDB & start server
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('✓ Connected to MongoDB');
    await seedAdmin();
    app.listen(PORT, () => {
      console.log(`✓ Server running on port ${PORT}`);
      console.log(`  API: http://localhost:${PORT}/api`);
    });
  })
  .catch((err) => {
    console.error('✗ MongoDB connection error:', err.message);
    process.exit(1);
  });
