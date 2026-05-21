import { pool } from "../../db/index.js";
import type { QueryParams } from "../../types/index.js";
import type { IIssues } from "./issues.interface.js";

export const createIssuesIntoDB = async (
  payload: IIssues,
  reporter_id: number,
) => {
  const { title, description, type } = payload;

  const result = await pool.query(
    `
      INSERT INTO issues(title,description,type,reporter_id) VALUES($1,$2,$3,$4) RETURNING *
    `,
    [title, description, type, reporter_id],
  );
  return result;
};

export const getAllIssuesIntoDB = async (query: QueryParams) => {
  const { sort = "newest", type, status } = query;

  let sql = `SELECT * FROM issues WHERE 1=1`;
  const values: any[] = [];

  if (type) {
    values.push(type);
    sql += ` AND type = $${values.length}`;
  }

  if (status) {
    values.push(status);
    sql += ` AND status = $${values.length}`;
  }

  sql +=
    sort === "oldest"
      ? ` ORDER BY created_at ASC`
      : ` ORDER BY created_at DESC`;

  const result = await pool.query(sql, values);
  const issues = result.rows;

  const finalData = await Promise.all(
    issues.map(async (issue) => {
      const userResult = await pool.query(
        `SELECT id, name, role FROM users WHERE id=$1`,
        [issue.reporter_id],
      );

      return {
        id: issue.id,
        title: issue.title,
        description: issue.description,
        type: issue.type,
        status: issue.status,
        reporter: userResult.rows[0] || null,
        created_at: issue.created_at,
        updated_at: issue.updated_at,
      };
    }),
  );

  return finalData;
};

export const getSingleIssuesIntoDB = async (id: string) => {
  const issueResult = await pool.query(`SELECT * FROM issues WHERE id=$1`, [
    id,
  ]);

  const issue = issueResult.rows[0];

  if (!issue) {
    throw new Error("Issue not found");
  }

  const userResult = await pool.query(
    `SELECT id, name, role FROM users WHERE id=$1`,
    [issue.reporter_id],
  );

  const reporter = userResult.rows[0];

  if (!reporter) {
    throw new Error("User not found");
  }

  return {
    data: {
      id: issue.id,
      title: issue.title,
      description: issue.description,
      type: issue.type,
      status: issue.status,
      reporter: {
        id: reporter.id,
        name: reporter.name,
        role: reporter.role,
      },
      created_at: issue.created_at,
      updated_at: issue.updated_at,
    },
  };
};

export const updateIssuesIntoDB = async (
  payLoad: IIssues,
  id: string,
  user: any,
) => {
  const { title, description, type } = payLoad;

  const issueResult = await pool.query(`SELECT * FROM issues WHERE id=$1`, [
    id,
  ]);

  const issue = issueResult.rows[0];

  if (!issue) {
    throw new Error("Issue not found");
  }

  if (user.role === "maintainer") {
    // sob kisu update korte parbe maintainer
  } else if (user.role === "contributor") {
    if (issue.reporter_id !== user.id) {
      throw new Error("You can only update your own issue");
    }

    if (issue.status !== "open") {
      throw new Error("You can only update open issues");
    }
  }

  const updated = await pool.query(
    `
    UPDATE issues
    SET
      title = COALESCE($1, title),
      description = COALESCE($2, description),
      type = COALESCE($3, type),
      updated_at = NOW()
    WHERE id = $4
    RETURNING *
    `,
    [title, description, type, id],
  );

  return updated.rows[0];
};
