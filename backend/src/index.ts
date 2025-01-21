import dotenv from "dotenv";
import { app } from "./app.ts";

dotenv.config({
  path: "./.env",
});

(async function(): Promise<void> {
  try {
    app.on("Error", (error) => {
      console.log("Error:", error);
    });
    app.listen(process.env.PORT, () => {
      console.log(`⚙️ Server is running at port: ${process.env.PORT}`);
    });
  } catch(error) {
    console.log("PostgreSQL connection failed!!!", error);
  };
})()