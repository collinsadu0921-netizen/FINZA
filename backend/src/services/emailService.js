import sendgrid from "@sendgrid/mail";
import { config } from "../config/env.js";
import { logger } from "../utils/logger.js";

if (config.sendGridKey) {
  sendgrid.setApiKey(config.sendGridKey);
}

export const sendInvoiceEmail = async ({ to, subject, html }) => {
  if (!config.sendGridKey) {
    logger.warn("SENDGRID_API_KEY not configured; skipping email send.");
    return;
  }

  const message = {
    to,
    from: config.emailFrom,
    subject,
    html
  };

  try {
    await sendgrid.send(message);
    logger.info("Invoice email queued", { to, subject });
  } catch (error) {
    logger.error("Failed to send invoice email", { error: error.message });
  }
};
