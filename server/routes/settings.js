import express from 'express';
import SiteSetting from '../models/SiteSetting.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Default stats seeded if none exist
const DEFAULT_SETTINGS = [
  { key: 'stat_projects', value: '4+', label: 'Projects Delivered' },
  { key: 'stat_clients', value: '3+', label: 'Happy Clients' },
  { key: 'stat_satisfaction', value: '98%', label: 'Client Satisfaction' },
  { key: 'stat_support', value: '24/7', label: 'Support Available' },
];

// GET /api/settings — public
router.get('/', async (req, res) => {
  try {
    let settings = await SiteSetting.find();
    // Seed defaults if empty
    if (settings.length === 0) {
      settings = await SiteSetting.insertMany(DEFAULT_SETTINGS);
    }
    res.json({ settings });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/settings/:key — admin only
router.put('/:key', auth, async (req, res) => {
  try {
    const { value } = req.body;
    const setting = await SiteSetting.findOneAndUpdate(
      { key: req.params.key },
      { value },
      { new: true, upsert: true }
    );
    res.json(setting);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/settings — admin only, bulk update
router.put('/', auth, async (req, res) => {
  try {
    const { settings } = req.body; // [{ key, value }]
    const ops = settings.map(({ key, value }) => ({
      updateOne: { filter: { key }, update: { value }, upsert: true },
    }));
    await SiteSetting.bulkWrite(ops);
    const updated = await SiteSetting.find();
    res.json({ settings: updated });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
