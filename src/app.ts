import express, { Application, NextFunction, Request, Response } from "express";

import routes from "./app/routes";

const app: Application = express();

app.use(express.json());

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
