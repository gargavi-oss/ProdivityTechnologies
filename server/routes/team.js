import express from 'express';
import TeamMember from '../models/TeamMember.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// GET /api/team — public
router.get('/', async (req, res) => {
  try {
    const members = await TeamMember.find({ active: true }).sort({ order: 1, createdAt: 1 });
    res.json({ members });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/team — admin only
router.post('/', auth, async (req, res) => {
  try {
    const { name, role, bio, skills, photoUrl, githubUrl, linkedinUrl, order, active } = req.body;
    if (!name || !role) return res.status(400).json({ error: 'Name and role are required' });
    const member = await TeamMember.create({ name, role, bio, skills, photoUrl, githubUrl, linkedinUrl, order, active });
    res.status(201).json(member);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/team/:id — admin only
router.put('/:id', auth, async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!member) return res.status(404).json({ error: 'Member not found' });
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/team/:id — admin only
router.delete('/:id', auth, async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ error: 'Member not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
