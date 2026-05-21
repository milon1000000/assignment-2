import jwt, { type JwtPayload } from "jsonwebtoken";
import type { Request, Response } from "express";
import {
  createIssuesIntoDB,
  deleteIssuesIntoDB,
  getAllIssuesIntoDB,
  getSingleIssuesIntoDB,
  updateIssuesIntoDB,
} from "./issues.service.js";
import { sendResponse } from "../../utility/sendResponse.js";
import config from "../../config/index.js";

export const createIssuesController = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      sendResponse(res, {
        statusCode: 401,
        success: false,
        message: "Unauthorized access!",
      });
    }
    const decoded = jwt.verify(
      token as string,
      config.secret as string,
    ) as JwtPayload;
    const userId = decoded.id;
    const result = await createIssuesIntoDB(req.body, userId);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Issue created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const getAllIssuesController = async (req: Request, res: Response) => {
  try {
    const result = await getAllIssuesIntoDB(req.query);

    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Get All issues Successfully",
      data: result,
    });
  } catch (error: any) {
    return sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const getSingleIssuesController = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params;
  try {
    const result = await getSingleIssuesIntoDB(id as string);

    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Get single issue successfully",
      data: result.data,
    });
  } catch (error: any) {
    return sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const updateIssuesController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await updateIssuesIntoDB(req.body, id as string, req.user);

    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issue updated successfully",
      data: result,
    });
  } catch (error: any) {
    return sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const deleteIssuesController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await deleteIssuesIntoDB(id as string, req.user);
    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issue deleted successfully",
    });
  } catch (error: any) {
    return sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};
