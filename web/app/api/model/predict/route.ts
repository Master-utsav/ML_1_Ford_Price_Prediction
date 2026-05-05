import { NextResponse } from "next/server";
import axios from "axios";

const ML_API =
  process.env.NEXT_PRIVATE_ML_SERVICE_URL! || "http://localhost:5000";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Received prediction request:", body);
    // Basic validation
    if (!body.year || !body.mileage) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
        },
        { status: 400 }
      );
    }

    const response = await axios.post(`${ML_API}/predict`, body);

    return NextResponse.json(response.data);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Prediction error:", error.message);

    return NextResponse.json(
      {
        success: false,
        error: error.response?.data || "Prediction failed",
      },
      { status: 500 }
    );
  }
}