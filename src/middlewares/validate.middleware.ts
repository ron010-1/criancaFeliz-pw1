import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import { AppErrorsZod } from "../errors/appErrorZods";

export function validate(schema: AnyZodObject, source: "body" | "params" = "body") {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      throw new AppErrorsZod(result.error.flatten().fieldErrors as Record<string, string[]>, 400);
    }

    req[source] = result.data as any;
    next();
  };
}
