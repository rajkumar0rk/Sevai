import express from 'express';
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoSanitize from 'express-mongo-sanitize'
import hpp from 'hpp'
import {pinoHttp} from 'pino-http'

import { globalErrorHandler } from './middlewares/globalErrorHandler.js';
import env from './config/env.js';
import { logger } from './utils/logger.js';

const app = express();

// Security header
app.use(helmet())
app.use(cors({
  origin: env.ALLOWED_ORIGINS,
  credentials: true, // needed for cookies
  methods: ["GET", "PUT", "POST", "PATCH", "DELETE"]
}))

// Request parsing
app.use(express.json({ limit: "10kb" }))
app.use(express.urlencoded({ extended: true, limit: "10kb" }))
app.use(cookieParser(env.COOKIE_SECRET))

// Sanitization
app.use(mongoSanitize())
app.use(hpp())

// Observability
app.use(pinoHttp({logger}))

// Rate limiting

// Routes
app.use("/api/v1/")

// Health check
app.get("/health", (_, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime()
  })
})

// Global error handler
app.use(globalErrorHandler)

export default app
