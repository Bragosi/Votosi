import { transporter } from "./mailer.js";

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export const sendEmail = async ({
  to,
  subject,
  html,
  text,
}: SendEmailParams) => {
  try {
    console.log("📨 Sending email via SMTP...");
    const info = await transporter.sendMail({
      from: `"Votosi App" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("Email sent:", info.messageId);
    console.log("📨 SMTP response:", info);
    return info;
  } catch (error: any) {
    console.error("Email error:", error.message);
    throw new Error("Email could not be sent");
  }
};