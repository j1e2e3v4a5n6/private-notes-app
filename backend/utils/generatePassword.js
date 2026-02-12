import { nanoid } from "nanoid";

export const generatePassword = () => {
  return nanoid(8); // 8 character password
};
