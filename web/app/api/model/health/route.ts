import { NextResponse } from "next/server";
import axios from "axios";

const ML_API =
  process.env.NEXT_PRIVATE_ML_SERVICE_URL || "http://localhost:5000";

export async function GET() {
  try {
    const response = await axios.get(`${ML_API}/health`);

    return NextResponse.json({
      success: true,
      node: "ok",
      ml_service: response.data,
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Health error:", error.message);

    return NextResponse.json(
      {
        success: false,
        node: "ok",
        ml_service: "unreachable",
      },
      { status: 500 }
    );
  }
}