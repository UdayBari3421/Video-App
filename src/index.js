import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
dotenv.config({ path: "./.env" });
connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.error(err);
      process.exit(1);
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(
        `Server is running on port http://localhost:${process.env.PORT || 8000}`
      );
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed !!! ", err);
  });
