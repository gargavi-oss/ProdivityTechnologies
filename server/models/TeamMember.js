import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  role: { type: String, required: true, trim: true },
  bio: { type: String, trim: true, default: '' },
  skills: [{ type: String, trim: true }],
  photoUrl: { type: String, default: '' },
  githubUrl: { type: String, default: '' },
  linkedinUrl: { type: String, default: '' },
  order: { type: Number, default: 0 }, // for display ordering
  active: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('TeamMember', teamMemberSchema);
