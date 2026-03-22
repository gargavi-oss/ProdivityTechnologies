import express from 'express';
import Contact from '../models/Contact.js';
import Project from '../models/Project.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// GET /api/dashboard — admin only, aggregated stats
router.get('/', auth, async (req, res) => {
  try {
    // Counts
    const totalContacts = await Contact.countDocuments();
    const newContacts = await Contact.countDocuments({ status: 'new' });
    const respondedContacts = await Contact.countDocuments({ status: 'responded' });

    const totalProjects = await Project.countDocuments();
    const activeProjects = await Project.countDocuments({ status: 'active' });
    const completedProjects = await Project.countDocuments({ status: 'completed' });
    const featuredProjects = await Project.countDocuments({ featured: true });

    // Recent leads (last 10)
    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select('name email status createdAt');

    // Recent projects (last 5)
    const recentProjects = await Project.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title category status featured createdAt');

    // Contacts per month (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const contactsByMonth = await Contact.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);

    const monthNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const leadsChart = contactsByMonth.map((item) => ({
      month: monthNames[item._id.month],
      leads: item.count,
    }));

    res.json({
      stats: {
        totalContacts,
        newContacts,
        respondedContacts,
        totalProjects,
        activeProjects,
        completedProjects,
        featuredProjects,
      },
      recentContacts,
      recentProjects,
      leadsChart,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
