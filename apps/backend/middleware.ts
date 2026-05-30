import type { NextFunction, Request, Response } from "express";

export async function middleware(req: Request, res: Response, next: NextFunction) {
    const token = req.header.authorization;

    const { data: {user}, error} = await supabase.auth.getUser(token) 
 


}   