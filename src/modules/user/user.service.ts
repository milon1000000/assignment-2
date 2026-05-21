import bcrypt from "bcrypt";
import type { IUser, Role } from "./user.interface.js";
import { pool } from "../../db/index.js";

export const CreateUserDB = async (payLoad: IUser) => {
  const { name, email, password, age, role } = payLoad;

  const validRoles: Role[] = ["admin", "agent", "user"];

  if (role && !validRoles.includes(role)) {
    throw new Error("Invalid role!");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `
        INSERT INTO users(name,email,password,age,role) VALUES($1,$2,$3,$4,COALESCE($5, 'user')) RETURNING *
        `,
    [name, email, hashPassword, age, role],
  );
  delete result.rows[0].password;
  return result;
};

export const getUserDB = async () => {
  const result = await pool.query(`
            SELECT * FROM users
            `);
  result.rows.map((users) => {
    delete users.password;
  });
  return result;
};

export const getSingleUserDB = async (id: string) => {
  const result = await pool.query(
    `
            SELECT * FROM users WHERE id=$1
            `,
    [id],
  );
  delete result.rows[0].password;
  return result;
};

export const updateUserDB = async (id: string, payLoad: IUser) => {
  const { name, password, is_active, age } = payLoad;
  const result = await pool.query(
    `
        UPDATE users SET name=COALESCE($1,name),password=COALESCE($2,password),is_active=COALESCE($3,is_active),
        age=COALESCE($4,age) WHERE id=$5 RETURNING *
        `,
    [name, password, is_active, age, id],
  );
  delete result.rows[0].password;
  return result;
};

export const deleteUserFromDB = async (id: string) => {
  const result = await pool.query(
    `
        DELETE FROM users 
        WHERE id=$1
        RETURNING *
        `,
    [id],
  );

  return result;
};
