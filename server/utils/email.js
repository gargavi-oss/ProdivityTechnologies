import { Resend } from 'resend';

export const sendLeadNotification = async (contact) => {
  if (!process.env.RESEND_API_KEY) {
    console.log('⚠️ Skipping email: RESEND_API_KEY is missing in environment.');
    return;
  }

  // Initialize Resend API client
  const resend = new Resend(process.env.RESEND_API_KEY.trim());

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
        <a href="${process.env.ADMIN_URL || 'https://admin.prodivity.in'}/contacts" style="background: #6200ee; color: white; padding: 10px 24px; border-radius: 6px; text-decoration: none; font-weight: 600;">
          View in Dashboard →
        </a>
      </p>

      <p style="color: #aaa; font-size: 12px; text-align: center; margin-top: 16px;">
        Prodivity Technologies · Received at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
      </p>
    </div>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: 'Prodivity Leads <onboarding@resend.dev>', // Resend's free testing domain
      to: process.env.EMAIL_TO?.trim() || 'info.prodivity@gmail.com', // MUST be the email you used to sign up for Resend
      subject: `🚀 New Lead: ${contact.name} — ${categoryLabel}`,
      html,
    });

    if (error) {
      console.error('❌ Resend API Error:', error);
    } else {
      console.log('✅ Email sent successfully via Resend!', data);
    }
  } catch (err) {
    console.error('❌ Resend API Exception:', err.message);
  }
};
