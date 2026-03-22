import nodemailer from 'nodemailer';

// Transporter is created lazily inside sendLeadNotification()
// This fixes the ESM hoisting issue where static imports run BEFORE
// dotenv.config() in index.js, leaving EMAIL_USER undefined at module load time.


export const sendLeadNotification = async (contact) => {
  console.log('Sending email...');
  console.log('EMAIL_USER exists?', !!process.env.EMAIL_USER);
  console.log('EMAIL_PASS exists?', !!process.env.EMAIL_PASS);

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('⚠️ Skipping email: EMAIL_USER or EMAIL_PASS is missing in environment.');
    return; // Skip if not configured
  }

  // Create transporter here (not at module level) so dotenv has already run
  const user = process.env.EMAIL_USER?.trim();
  const pass = process.env.EMAIL_PASS?.trim();
  const to = process.env.EMAIL_TO?.trim() || user;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user, pass },
    connectionTimeout: 10000, 
    socketTimeout: 10000,
    // Note: Render's free tier blocks outgoing SMTP connections (Ports 465/587)
    // which results in ENETUNREACH timeouts. 
    family: 4,
    tls: { rejectUnauthorized: false },
  });

  const categoryLabel = contact.category || 'Not specified';
  const projectBaseLabel = contact.projectBase || 'Not specified';

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; border-radius: 8px;">
      <div style="background: linear-gradient(135deg, #6200ee, #004eb5); padding: 24px; border-radius: 8px 8px 0 0; margin-bottom: 24px;">
        <h1 style="color: white; margin: 0; font-size: 20px;">⚡ New Lead — Prodivity Technologies</h1>
      </div>

      <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
        <tr style="border-bottom: 1px solid #f0f0f0;">
          <td style="padding: 14px 20px; font-weight: 600; color: #555; width: 35%;">Name</td>
          <td style="padding: 14px 20px; color: #111;">${contact.name}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f0f0f0; background: #fafafa;">
          <td style="padding: 14px 20px; font-weight: 600; color: #555;">Email</td>
          <td style="padding: 14px 20px;"><a href="mailto:${contact.email}" style="color: #6200ee;">${contact.email}</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #f0f0f0;">
          <td style="padding: 14px 20px; font-weight: 600; color: #555;">Project Category</td>
          <td style="padding: 14px 20px; color: #111;">${categoryLabel}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f0f0f0; background: #fafafa;">
          <td style="padding: 14px 20px; font-weight: 600; color: #555;">Project Base / Budget</td>
          <td style="padding: 14px 20px; color: #111;">${projectBaseLabel}</td>
        </tr>
        <tr>
          <td style="padding: 14px 20px; font-weight: 600; color: #555; vertical-align: top;">Message</td>
          <td style="padding: 14px 20px; color: #111; line-height: 1.6;">${contact.message}</td>
        </tr>
      </table>

      <p style="margin-top: 20px; text-align: center;">
        <a href="${process.env.ADMIN_URL || 'https://your-admin-url.vercel.app'}/contacts" style="background: #6200ee; color: white; padding: 10px 24px; border-radius: 6px; text-decoration: none; font-weight: 600;">
          View in Dashboard →
        </a>
      </p>

      <p style="color: #aaa; font-size: 12px; text-align: center; margin-top: 16px;">
        Prodivity Technologies · Received at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
      </p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Prodivity Technologies" <${user}>`,
      to,
      subject: `🚀 New Lead: ${contact.name} — ${categoryLabel}`,
      html,
    });
    console.log('✅ Email sent successfully!');
  } catch (err) {
    console.error('❌ Nodemailer Error:', err.message);
  }
};
