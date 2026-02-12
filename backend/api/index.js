import app from "./app.js";
import connectDB from "./src/config/db.js";

const PORT = process.env.PORT || 5000;

try {
  await connectDB()

  app.listen(PORT, () => {
    console.log(`🚀💨 Server running on port ${PORT}`)
  })
} catch (error) {
  console.error('❌ Failed to connect DB:', error)
  process.exit(1)
}