import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendInvoiceEmail(to, subject, htmlContent) {
  const msg = {
    to,
    from: "no-reply@finza.app",
    subject,
    html: htmlContent,
  };
  try {
    await sgMail.send(msg);
    console.log("Invoice email sent to:", to);
  } catch (error) {
    console.error("SendGrid Error:", error.response?.body || error);
  }
}
