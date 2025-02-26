import { NextResponse } from "next/server";

export const GET = () => {
  return NextResponse.json({
    title: "John Doe",
    description: "John Doe's description",
  });
};
