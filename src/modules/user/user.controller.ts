import type { Request, Response } from "express";
import { CreateUserDB, deleteUserFromDB, getSingleUserDB, getUserDB, updateUserDB } from "./user.service.js";
import { sendResponse } from "../../utility/sendResponse.js";

 export const CreateUser=async(req:Request,res:Response)=>{
    try {
    const result=await CreateUserDB(req.body)
       
    sendResponse(res,{
        statusCode:201,
        success:true,
        message:"User Created Successfully",
        data:result.rows[0]
    })
    } catch (error:any) {
       

        sendResponse(res,{statusCode:500,success:false,message:error.message,error:error})
        
    }
}



export const getUser=async(req:Request,res:Response)=>{
    try {
         const result=await getUserDB()
            sendResponse(res,{statusCode:200,success:true,message:"Users retrived successfully",
                data:result.rows

            })
        
    } catch (error:any) {
     
        sendResponse(res,{
            statusCode:500,
            success:false,
            message:error.message,
            error:error
        })
        
    }
}

export const getSingleUser=async(req:Request,res:Response)=>{
    const {id}=req.params;
    try {
       const result=await getSingleUserDB(id as string);
            if(result.rows.length===0){
                return res.status(404).json({
                    success:false,
                    message:"User Not found",
                    data:{}
                })

            }
            sendResponse(res,{statusCode:200,success:true,message:"User retrived Successfully",data:result.rows[0]})
    } catch (error:any) {
        sendResponse(res,{
            statusCode:500,
            success:false,
            message:error.message,
            error:error
        })
        
    }
};

export const updateUser=async(req:Request,res:Response)=>{
    const {id}=req.params;
   try {
      const result=await updateUserDB(id as string,req.body);
        if(result.rows.length===0){
            return res.status(404).json({success:false,message:"User Not found",data:{}})
        }
         sendResponse(res,{statusCode:200,success:true,message:"User Update Successfully",data:result.rows[0]})
   } catch (error:any) {
       sendResponse(res,{
            statusCode:500,
            success:false,
            message:error.message,
            error:error
        })
        
    
   }
};

export const deleteUser=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params;
        const result=await deleteUserFromDB(id as string)
            if(result.rows.length===0){
                return res.status(404).json({success:false,message:"User Not found",data:{}})
            }
            sendResponse(res,{statusCode:200,success:true,message:"User delete successfully",data:{}})
    } catch (error:any) {
        return res.status(500).json({success:false,message:error.message,error:error})
        
    }
};



