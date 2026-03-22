import express from 'express';
import Testimonial from '../models/Testimonial.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// GET /api/testimonials — public
router.get('/', async (req, res) => {
  try {
    const { featured } = req.query;
    const filter = {};
    if (featured === 'true') filter.featured = true;

    const testimonials = await Testimonial.find(filter).sort({ createdAt: -1 });
    res.json({ testimonials });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/testimonials — admin only
router.post('/', auth, async (req, res) => {
  try {
    const { name, role, company, avatarUrl, content, rating, featured } = req.body;
    if (!name || !role || !content) {
      return res.status(400).json({ error: 'Name, role, and content are required' });
    }
    const testimonial = await Testimonial.create({ name, role, company, avatarUrl, content, rating, featured });
    res.status(201).json(testimonial);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/testimonials/:id — admin only
router.put('/:id', auth, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!testimonial) return res.status(404).json({ error: 'Testimonial not found' });
    res.json(testimonial);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/testimonials/:id — admin only
router.delete('/:id', auth, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) return res.status(404).json({ error: 'Testimonial not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
