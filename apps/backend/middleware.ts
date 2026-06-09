import type { NextFunction, Request, Response } from "express";
import { prisma } from "db";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "octamarket_jwt_super_secret_key_2024_solana_phantom";

export async function middleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    try {
        if (!token) {
            res.status(403).json({ message: "No token provided" });
            return;
        }

        // Verify our self-signed JWT
        const payload = jwt.verify(token, JWT_SECRET) as any;
        const address: string = payload?.user_metadata?.custom_claims?.address || payload?.sub;

        if (!address) {
            res.status(403).json({ message: "Invalid token claims" });
            return;
        }

        const userDb = await prisma.user.upsert({
            where: { address },
            update: { address },   // existing user — balance unchanged
            create: {
                address,
                usdBalance: 1000000  // new user gets $10,000 (stored as cents)
            }
        });

        req.userId = userDb.id;
        next();
    } catch (e) {
        res.status(403).json({ message: "Incorrect credentials" });
    }
}