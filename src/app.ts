import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import routes from "./app/routes";

const app: Application = express();

app.use(express.json());

app.use(
   cors({
      origin: [
         "https://mehnoor-library-frontend.vercel.app",
         "http://localhost:5173",
         "http://localhost:5174",
      ],
   })
);

app.use(routes);

app.get("/", (req: Request, res: Response) => {
   res.send("Hello from server");
});

app.use((req: Request, res: Response, next: NextFunction) => {
   res.status(404).send({
      message: "Route not found 😔",
   });
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
   if (error) {
      res.status(400).send({
         success: false,
         message: error.message,
         error: error,
      });
   }
});

export default app;
