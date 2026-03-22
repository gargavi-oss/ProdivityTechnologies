import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
  },
  category: {
    type: String,
    enum: [
      'Web Application',
      'Mobile App',
      'E-Commerce',
      'AI / Machine Learning',
      'Cloud & DevOps',
      'UI/UX Design',
      'API Development',
      'Other',
    ],
    default: 'Other',
  },
  projectBase: {
    type: String,
    trim: true,
    default: '',
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
  },
  status: {
    type: String,
    enum: ['new', 'read', 'responded', 'archived'],
    default: 'new',
  },
}, {
  timestamps: true,
});

export default mongoose.model('Contact', contactSchema);
