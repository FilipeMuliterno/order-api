import { Request, Response, NextFunction } from "express";

export const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

//O que ele faz
// Fluxo:
// Controller
//    ↓
// throw new Error()
//    ↓
// asyncHandler captura
//    ↓
// next(error)
//    ↓
// errorMiddleware
// Ou seja: qualquer erro vai para o middleware global.
