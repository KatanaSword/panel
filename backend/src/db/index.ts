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
    console.log(`\n PostgreSQL connected !! DB Host: ${connectionInstance}`)
  } catch (error) {
    console.log("PostgreSQL connection failed!", error);
    process.exit(1);
  }
};

export default connectDB;