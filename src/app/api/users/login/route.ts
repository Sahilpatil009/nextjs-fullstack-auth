import {connect} from "@/src/dbConfig/dbConfig"
import User from "@/src/models/userModel"
import { NextRequest, NextResponse} from "next/server"
import bcrypt from "bcryptjs"
// @ts-expect-error jsonwebtoken does not have TypeScript definitions
import jwt from "jsonwebtoken"
connect()

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;

        const user = await User.findOne({email});

        if(!user) {
            return NextResponse.json({error: "User does not exits"}, {status: 400})
        }
        
        const validPassword = await bcrypt.compare(password, user.password);
        
        if(!validPassword){
            return NextResponse.json({error: "Invalid Password"}, {status: 400})
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!,{expiresIn: '1d'})
        
        const response = NextResponse.json({message: "Login successfull", success: true});

        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({error: message}, {status: 500})
    }
}
