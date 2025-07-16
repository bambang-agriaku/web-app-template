import * as v from "valibot";
import { validationMessages as msg } from "./messages.ts";

export const requiredString = v.pipe(v.string(), v.minLength(1, msg.required));
export const number = v.number(msg.number);
export const positiveNumber = v.pipe(
  number,
  v.minValue(0, msg.positiveNumber), // 0 is a valid number
);
export const emailValidator = v.pipe(v.string(), v.email(msg.email));
