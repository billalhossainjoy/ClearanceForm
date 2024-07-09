import { NextFunction, Request, Response } from "express";

const asycHandler =
  (fn: (req: Request, res: Response) => void) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res)).catch((err) => next(err));
  };

  export default asycHandler;