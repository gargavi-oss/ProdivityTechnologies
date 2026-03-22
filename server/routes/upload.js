import express from 'express';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import auth from '../middleware/auth.js';

const router = express.Router();

// POST /api/upload — admin only, returns Cloudinary URL
// Cloudinary config is created inside the handler (lazy) to avoid
// the ESM import-hoisting issue where env vars aren't loaded yet.
router.post('/', auth, (req, res, next) => {
  // Configure Cloudinary lazily — env vars are definitely loaded by now
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: 'prodivity',
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
      transformation: [{ width: 1200, height: 1200, crop: 'limit', quality: 'auto' }],
    },
  });

  const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }).single('image');

  upload(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    res.json({ url: req.file.path, publicId: req.file.filename });
  });
});

export default router;
