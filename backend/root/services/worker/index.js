import app from "./app.js";
import { connectDB, ENV } from "@ra/config";

const PORT = ENV.WORKER_PORT;

try {
    await connectDB()

    app.listen(PORT, () => {
        console.log(`🚀💨 Server running on port ${PORT}`)
    })
} catch (error) {
    console.error('❌ Failed to connect DB:', error)
    process.exit(1)
}

