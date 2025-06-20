import express, { Application, NextFunction, Request, Response } from "express";

const app: Application = express();

app.use(express.json());

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
         message: "Something went wrong",
         error: error,
      });
   }
});

export default app;
