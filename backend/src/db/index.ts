import { drizzle } from 'drizzle-orm/node-postgres';
import { DB_NAME } from "../constants.ts";

const connectDB = async () => {
  try {
    const connectionInstance = drizzle({
      connection: { 
        connectionString: `${process.env.DATABASE_URL}/${DB_NAME}`,
        ssl: true
      }
    })
    console.log(`\n MongoDB connected !! DB Host: ${connectionInstance}`)
  } catch (error) {
    console.log("MongoDB connection failed!", error);
    process.exit(1);
  }
};

export default connectDB;