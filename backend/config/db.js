import mongoose from "mongoose";

export const connectDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    
    console.log("✅ Database Connected!");
    console.log("📍 Host:", mongoose.connection.host);
    console.log("🗄️  Database:", mongoose.connection.name);
    
    // List all collections to verify
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("📚 Collections:", collections.map(c => c.name));
    
  } catch (error) {
    console.log("❌ Error in Connecting:", error.message);
    process.exit(1); // Exit if can't connect
  }
};
