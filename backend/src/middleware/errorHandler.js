import { logger } from "../utils/logger.js";

export const notFoundHandler = (req, res) => {
  res.status(404).json({ error: "Not found" });
};

export const errorHandler = (error, req, res, _next) => {
  logger.error(error.message, { stack: error.stack });
  res.status(error.status || 500).json({
    error: error.message || "Internal server error"
  });
};
