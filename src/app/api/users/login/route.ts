import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { email, password } = reqBody;

    const prevUser = await User.findOne({ email });
    if (!prevUser) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    //check if password is correct

    const isValidPassword = await bcryptjs.compare(password, prevUser.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Password doesn't matched" },
        { status: 400 }
      );
    }

    //create token data
    const tokenData = {
      id: prevUser._id,
      username: prevUser.username,
      email: prevUser.email,
    };
    //create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });
    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
