import { MongoClient, ServerApiVersion } from "mongodb";
import app from "./app";
import mongoose from "mongoose";

const port = 3000;

let server;

async function main() {
   try {
      await mongoose.connect(
         "mongodb+srv://library_admin:library_admin@cluster0.j7c4zww.mongodb.net/mehnoor_library?retryWrites=true&w=majority&appName=Cluster0"
      );

      server = app.listen(port, () => {
         console.log(`Server listening on port ${port}`);
      });
   } catch (error) {
      console.log(error);
   }
}

main();
// C14V9ZgoAMKq7BGZ
