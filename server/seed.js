import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';
import Contact from './models/Contact.js';
import Project from './models/Project.js';

dotenv.config();

const ADMIN = {
  email: 'admin@prodivity.tech',
  password: 'admin123',
  name: 'Avi Garg',
};

const PROJECTS = [
  {
    title: 'FinFlow Dashboard',
    category: 'Web Application',
    description: 'A real-time financial analytics dashboard with AI-powered insights for enterprise clients. Built with React and Node.js, serving 50+ financial institutions.',
    tags: ['React', 'Node.js', 'D3.js', 'PostgreSQL'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    liveUrl: 'https://finflow-demo.example.com',
    featured: true,
    status: 'completed',
  },
  {
    title: 'MedSync Mobile',
    category: 'Mobile App',
    description: 'Cross-platform healthcare appointment and records management app serving 100k+ users. HIPAA-compliant with real-time syncing.',
    tags: ['React Native', 'Firebase', 'HIPAA', 'TypeScript'],
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    liveUrl: 'https://medsync-demo.example.com',
    featured: true,
    status: 'completed',
  },
  {
    title: 'CloudNest Platform',
    category: 'Cloud Infrastructure',
    description: 'Multi-tenant SaaS platform with auto-scaling infrastructure and 99.99% uptime guarantee. Manages 200+ microservices.',
    tags: ['AWS', 'Kubernetes', 'Terraform', 'Go'],
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    liveUrl: 'https://cloudnest-demo.example.com',
    featured: false,
    status: 'completed',
  },
  {
    title: 'InsightAI Analytics',
    category: 'AI / Machine Learning',
    description: 'Predictive analytics engine processing 2M+ data points daily for e-commerce personalization. Increased client conversion rates by 34%.',
    tags: ['Python', 'TensorFlow', 'BigQuery', 'GCP'],
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    liveUrl: 'https://insightai-demo.example.com',
    featured: true,
    status: 'completed',
  },
  {
    title: 'ShopEase E-Commerce',
    category: 'Web Application',
    description: 'Full-stack e-commerce platform with headless CMS, payment gateway integration, and real-time inventory management for 500+ products.',
    tags: ['Next.js', 'Stripe', 'Sanity CMS', 'Vercel'],
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    liveUrl: 'https://shopease-demo.example.com',
    featured: false,
    status: 'active',
  },
  {
    title: 'SecureVault',
    category: 'Cybersecurity',
    description: 'Enterprise password management and security audit platform with zero-knowledge encryption. SOC2 and ISO 27001 certified.',
    tags: ['Rust', 'WebAssembly', 'AES-256', 'OAuth2'],
    imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80',
    liveUrl: 'https://securevault-demo.example.com',
    featured: true,
    status: 'completed',
  },
];

const CONTACTS = [
  {
    name: 'Sarah Chen',
    email: 'sarah.chen@finflow.com',
    message: 'We need a complete redesign of our financial dashboard. Looking for a team experienced in React and data visualization. Budget is flexible for the right partner.',
    status: 'responded',
  },
  {
    name: 'Marcus Rivera',
    email: 'marcus@medsync.health',
    message: 'Interested in building a cross-platform healthcare app. We need HIPAA compliance and real-time data syncing. Can we schedule a call this week?',
    status: 'responded',
  },
  {
    name: 'Elena Kowalski',
    email: 'elena.k@cloudnest.io',
    message: 'Our current cloud infrastructure is struggling with scale. We need help migrating to Kubernetes and setting up proper CI/CD pipelines.',
    status: 'read',
  },
  {
    name: 'James Parker',
    email: 'james@parkerventures.com',
    message: 'Looking to build an AI-powered recommendation engine for our e-commerce platform. We have 2M+ products and need real-time suggestions.',
    status: 'new',
  },
  {
    name: 'Priya Sharma',
    email: 'priya.sharma@techstart.in',
    message: 'We are a Series A startup looking for a development partner to build our MVP. We need both mobile app and web dashboard. Timeline is 3 months.',
    status: 'new',
  },
  {
    name: 'David Kim',
    email: 'david.kim@nexagen.co',
    message: 'Need a security audit of our existing platform and implementation of zero-trust architecture. Our user base has grown to 500k+ and security is top priority.',
    status: 'new',
  },
  {
    name: 'Lisa Thompson',
    email: 'lisa@brightedge.marketing',
    message: 'We want to revamp our agency website with modern animations and a CMS for our portfolio. Love your Prodivity website design!',
    status: 'new',
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    // Clear existing data
    await Admin.deleteMany({});
    await Project.deleteMany({});
    await Contact.deleteMany({});
    console.log('✓ Cleared existing data');

    // Seed admin
    await Admin.create(ADMIN);
    console.log(`✓ Admin created: ${ADMIN.email} / ${ADMIN.password}`);

    // Seed projects
    await Project.insertMany(PROJECTS);
    console.log(`✓ ${PROJECTS.length} projects seeded`);

    // Seed contacts
    await Contact.insertMany(CONTACTS);
    console.log(`✓ ${CONTACTS.length} contacts seeded`);

    console.log('\n✅ Database seeded successfully!');
    console.log(`\n  Admin Login: ${ADMIN.email} / ${ADMIN.password}`);
    process.exit(0);
  } catch (err) {
    console.error('✗ Seed error:', err.message);
    process.exit(1);
  }
}

seed();
