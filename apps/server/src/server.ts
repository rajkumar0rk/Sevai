import app from './app.js'
import env from '@/config/env.js'

const PORT = env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log("Server running on port: ", PORT)
})

// Handle server startup errors
server.on("error", (err: NodeJS.ErrnoException) => {
  console.error("Server failed to start: ", err.message);
  process.exit(1)
})

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection: ", reason);
  shutdown();
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception: ", err)
  shutdown()
})

// Graceful shutdown function
function shutdown() {
  console.log("Shutting down server...")

  server.close(() => {
    console.log("Server Closed");
    process.exit(1)
  })

  setTimeout(() => {
    console.log("Forcefully shutting down");
    process.exit(1)
  }, 10000)
}

// Handle termination signals (Docker/k8s)
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown)