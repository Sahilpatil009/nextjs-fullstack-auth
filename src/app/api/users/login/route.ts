import { connect } from "@/src/dbConfig/dbConfig";
import User from "@/src/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
// @ts-expect-error jsonwebtoken does not have TypeScript definitions
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        await connect();

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { error: "User does not exist" },
                { status: 400 }
            );
        }

        const validPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!validPassword) {
            return NextResponse.json(
                { error: "Invalid password" },
                { status: 400 }
            );
        }

        const tokenSecret = process.env.TOKEN_SECRET || process.env.TOKEN_SECRECT;

        if (!tokenSecret) {
            return NextResponse.json(
                { error: "TOKEN_SECRET is not configured" },
                { status: 500 }
            );
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        const token = jwt.sign(
            tokenData,
            tokenSecret,
            { expiresIn: "1d" }
        );

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
        });

        return response;
    } catch (error: unknown) {
        const message =
            error instanceof Error
                ? error.message
                : "Unknown error";

        return NextResponse.json(
            { error: message },
            { status: 500 }
        );
    }
}
