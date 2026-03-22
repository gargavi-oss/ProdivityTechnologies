import mongoose from 'mongoose';

// Simple key-value store for site-wide settings (hero stats, etc.)
const siteSettingSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true, trim: true },
  value: { type: String, required: true },
  label: { type: String, default: '' }, // Human-readable label for admin UI
}, { timestamps: true });

export default mongoose.model('SiteSetting', siteSettingSchema);
