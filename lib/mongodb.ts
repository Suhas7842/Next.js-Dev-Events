import mongoose from "mongoose";

/**
 * MongoDB Connection Types
 * Defines the structure for caching the mongoose connection
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

/**
 * Extend the global namespace to include our mongoose cache
 * This prevents TypeScript errors when accessing global.mongoose
 */
declare global {
  var mongoose: MongooseCache | undefined;
}

// Get MongoDB connection string from environment variables
// Validation is deferred to allow environment variables to be loaded by scripts
const getMongoDatabaseURI = (): string => {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.length === 0) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }

  return uri;
};

/**
 * Global cache for the mongoose connection
 * In development, Next.js hot reloading can cause multiple connections
 * This cache ensures we reuse the existing connection instead of creating new ones
 */
const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

/**
 * Connect to MongoDB using Mongoose
 *
 * @returns Promise<typeof mongoose> - Returns the mongoose instance
 *
 * Features:
 * - Connection caching to prevent multiple connections in development
 * - Automatic reconnection on connection loss
 * - Optimized connection pooling
 * - Proper error handling
 */
async function connectToDatabase(): Promise<typeof mongoose> {
  // Return cached connection if it exists
  if (cached.conn) {
    return cached.conn;
  }

  // If no cached connection exists, create a new one
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable mongoose buffering to handle errors immediately
    };

    // Create new connection promise
    const uri = getMongoDatabaseURI();

    // Add DNS resolution workaround for Windows
    const connectionOptions = {
      ...opts,
      family: 4, // Force IPv4 to avoid IPv6 DNS issues on Windows
      directConnection: false, // Required for mongodb+srv://
      tls: true, // Ensure TLS/SSL is enabled
    };

    cached.promise = mongoose.connect(uri, connectionOptions).then((mongoose) => {
      console.log("✅ MongoDB connected successfully");
      return mongoose;
    });
  }

  try {
    // Wait for the connection promise to resolve
    cached.conn = await cached.promise;
  } catch (error) {
    // Reset the cached promise on error so next call attempts a fresh connection
    cached.promise = null;
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }

  return cached.conn;
}

/**
 * Disconnect from MongoDB
 * Useful for cleaning up connections in serverless environments or during testing
 *
 * @returns Promise<void>
 */
async function disconnectFromDatabase(): Promise<void> {
  if (!cached.conn) {
    return;
  }

  await mongoose.disconnect();
  cached.conn = null;
  cached.promise = null;
  console.log("✅ MongoDB disconnected");
}

/**
 * Check if MongoDB is connected
 *
 * @returns boolean - True if connected, false otherwise
 */
function isConnected(): boolean {
  return mongoose.connection.readyState === 1;
}

// Export the connection function as default
export default connectToDatabase;

// Export additional utility functions
export { disconnectFromDatabase, isConnected };
