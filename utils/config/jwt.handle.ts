import { sign } from "jsonwebtoken";

export const createToken = (id: string): string => {
  return sign({id}, process.env.JWT_SECRET || '', {
    expiresIn: "365d",
  });
};