import nodemailer from "nodemailer";

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransporter({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendEmail(to, subject, html, text) {
    try {
      const mailOptions = {
        from: `"Student Collaboration Platform" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
        text,
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log("Email sent successfully:", result.messageId);
      return result;
    } catch (error) {
      console.error("Email sending failed:", error);
      throw error;
    }
  }

  async sendWelcomeEmail(user) {
    const subject = "Welcome to Student Collaboration Platform!";
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Welcome, ${user.name}!</h1>
        <p>Thank you for joining the Student Collaboration Platform. We're excited to have you on board!</p>
        <p>You can now:</p>
        <ul>
          <li>Browse and apply to exciting projects</li>
          <li>Post your own project ideas</li>
          <li>Connect with talented students</li>
          <li>Build your portfolio</li>
        </ul>
        <p>Get started by exploring projects in your area of interest.</p>
        <p>Best regards,<br>The Student Collaboration Team</p>
      </div>
    `;
    const text = `Welcome, ${user.name}! Thank you for joining the Student Collaboration Platform.`;

    return await this.sendEmail(user.email, subject, html, text);
  }

  async sendApplicationNotification(projectOwner, applicant, project) {
    const subject = `New Application for "${project.title}"`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">New Application Received!</h1>
        <p>Hi ${projectOwner.name},</p>
        <p><strong>${applicant.name}</strong> has applied to your project "<strong>${project.title}</strong>".</p>
        <p><strong>Applicant Details:</strong></p>
        <ul>
          <li>Department: ${applicant.department}</li>
          <li>Year: ${applicant.year}</li>
          <li>Rating: ${applicant.rating}/5</li>
        </ul>
        <p>Log in to your dashboard to review the application and contact the applicant.</p>
        <p>Best regards,<br>The Student Collaboration Team</p>
      </div>
    `;
    const text = `${applicant.name} has applied to your project "${project.title}". Log in to review the application.`;

    return await this.sendEmail(projectOwner.email, subject, html, text);
  }

  async sendApplicationStatusUpdate(applicant, project, status, message) {
    const statusText = status === "accepted" ? "Accepted" : "Reviewed";
    const subject = `Application ${statusText}: "${project.title}"`;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Application Update</h1>
        <p>Hi ${applicant.name},</p>
        <p>Your application to "<strong>${
          project.title
        }</strong>" has been ${status}.</p>
        ${
          message
            ? `<p><strong>Message from project owner:</strong></p><p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${message}</p>`
            : ""
        }
        ${
          status === "accepted"
            ? "<p>Congratulations! You can now collaborate on this project.</p>"
            : ""
        }
        <p>Log in to your dashboard for more details.</p>
        <p>Best regards,<br>The Student Collaboration Team</p>
      </div>
    `;
    const text = `Your application to "${project.title}" has been ${status}. ${
      message || ""
    }`;

    return await this.sendEmail(applicant.email, subject, html, text);
  }

  async sendProjectInterestNotification(projectOwner, interestedUser, project) {
    const subject = `New Interest in "${project.title}"`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Someone is Interested in Your Project!</h1>
        <p>Hi ${projectOwner.name},</p>
        <p><strong>${interestedUser.name}</strong> showed interest in your project "<strong>${project.title}</strong>".</p>
        <p>This could be a potential collaborator! Consider reaching out to them.</p>
        <p>Best regards,<br>The Student Collaboration Team</p>
      </div>
    `;
    const text = `${interestedUser.name} showed interest in your project "${project.title}".`;

    return await this.sendEmail(projectOwner.email, subject, html, text);
  }
}

export default new EmailService();
