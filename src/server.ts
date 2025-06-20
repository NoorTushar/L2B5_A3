import app from "./app";
import mongoose from "mongoose";
import config from "./config";

let server;

async function main() {
   try {
      await mongoose.connect(config.database_url as string);

      server = app.listen(config.port, () => {
         console.log(`Server listening on port ${config.port}`);
      });
   } catch (error) {
      console.log(error);
   }
}

main();
// C14V9ZgoAMKq7BGZ
