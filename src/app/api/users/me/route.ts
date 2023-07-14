import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);

    const user = await User.findOne(
      { _id: userId },
      {
        username: 1,
        email: 1,
      }
    );

    return NextResponse.json(
      {
        data: user,
        message: "User loaded",
        success: true,
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        message: err.message,
      },
      { status: 400 }
    );
  }
}
