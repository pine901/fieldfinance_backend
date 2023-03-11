require("dotenv").config();

import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { LoginObject, RegistryObject } from "../interfaces/global";
import controllers from "../controllers";



// Normal Auth
const registry = async (req: Request, res: Response) => {

    try {
        const {
            firstName,
            secondName,
            dateBirth,
            phoneNumber,
            email,
            homeAddress,
            nationalNumber,
            branch,
            rank,
            regiment,
            isRegular,
            serviceNumber,
            workAddress,
            password, }: RegistryObject = req.body;


        let encryptedPassword = await bcrypt.hash(password, 10); // Encrypt password

        const result = await controllers.Auth.create({
            firstName,
            secondName,
            dateBirth,
            phoneNumber,
            email,
            homeAddress,
            nationalNumber,
            branch,
            rank,
            regiment,
            isRegular,
            serviceNumber,
            workAddress,
            encryptedPassword,
        }); // Save user data

        if (result) {
            res.status(200).json({
                success: true,
            });
        }
        else {
            throw new Error("Server Error");
        }


    } catch (err: any) {
        console.log("create error : ", err.message);
        res.status(500).send(err.message);
    }
};


const login = async (req: Request, res: Response) => {
    try {
        const { email, password }: LoginObject = req.body;

        if (!(email.trim() && password.trim())) {
            return res.status(400).send("Please Enter All Required Data.");
        }

        const user = await controllers.Auth.find({
            filter: { email: email.toLowerCase().trim() },
        });

        if (!user) {
            // User check
            return res.status(404).send("User Not Exist. Please Registry");
        }

        const pass = await bcrypt.compare(password, user.encryptedPassword);

        if (pass) {
            // Password check
            const token = jwt.sign(
                { user_id: user._id, email: email.toLowerCase().trim() },
                String(process.env.TOKEN_KEY),
                {
                    expiresIn: "2h",
                }
            ); // Create token

            res.status(200).json({ token: token });
        } else {
            return res.status(400).send("Password or Username Is Not Correct");
        }
    } catch (err: any) {
        console.log("login error: ", err);
        res.status(500).send(err.message);
    }
};


const passwordreset = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        const user = await controllers.Auth.find({ filter: { email: email } });
        if (!user)
            return res.status(400).send("User With Given Email Doesn't Exist");

        let token = await controllers.Token.find({
            filter: { userId: user._id },
        });

        if (!token) {
            token = await controllers.Token.create({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            });
        }

        const link = `${process.env.BASE_URL}api/reset/${user._id}/${token.token}`;
        const result = await Utils.sendEmail(user.email, "Password reset", link);

        if (result) {
            res.status(200).json({
                success: true
            });
        } else {
            throw new Error("Mailing Error");
        }
    } catch (err: any) {
        console.log(err);
        res.status(500).send(err.message);
    }
};



// Middleware
const middleware = async (req: any, res: Response, next: NextFunction) => {
    try {
        const token = <string>req.headers["authorization"] || "";
        console.log(token);

        jwt.verify(
            token,
            String(process.env.TOKEN_KEY),
            async (err: any, userData: any) => {
                if (err) return res.status(403).end();

                const user: any = await controllers.Auth.find({
                    filter: {
                        email: userData.email,
                    },
                });
                req.user = user; // Save user data

                next();
            }
        );
    } catch (err: any) {
        console.log(err.message);
        res.status(401).end();
    }
};




export default {
    login,
    registry,
    middleware
};
