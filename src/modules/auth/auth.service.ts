import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { pool } from "../../db/index.js";
import config from "../../config/index.js";
import type { IAuth } from "./auth.inferface.js";

export const signupUserIntoDB = async (payLoad: IAuth) => {
  const { name, email, password, role } = payLoad;
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `
   INSERT  INTO users (name,email,password,role) VALUES($1,$2,$3,$4)
    RETURNING *
    
    `,
    [name, email, hashPassword, role],
  );
  delete result.rows[0].password;
  return result;
};

export const loginUserIntoDB = async (payLoad: {
  email: string;
  password: string;
}) => {
  const { email, password } = payLoad;
  const userData = await pool.query(
    `
        SELECT * FROM users WHERE email=$1
        `,
    [email],
  );
  if (userData.rows.length === 0) {
    throw Error("Invalid Credentials!");
  }
  const user = userData.rows[0];
  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    throw Error("Invalid Credentials!");
  }

  const jsonpayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(jsonpayload, config.secret as string, {
    expiresIn: "1d",
  });
  delete userData.rows[0].password;
  return { token, user };
};
