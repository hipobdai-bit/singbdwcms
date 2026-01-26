import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebaseAdmin";

export async function POST(request: Request) {
  try {
    const db = getAdminDb();
    const contentType = request.headers.get("content-type") || "";
    let email = "";
    let phone = "";
    let address = "";

    if (contentType.includes("application/json")) {
      const body = await request.json();
      email = body.email ?? "";
      phone = body.phone ?? "";
      address = body.address ?? "";
    } else {
      const formData = await request.formData();
      email = String(formData.get("email") ?? "");
      phone = String(formData.get("phone") ?? "");
      address = String(formData.get("address") ?? "");
    }

    if (!email || !phone || !address) {
      return NextResponse.json(
        { message: "Email, phone, and address are required." },
        { status: 400 }
      );
    }

    const addressLines = String(address)
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    await db.collection("settings").doc("contact").set(
      {
        email,
        phone,
        addressLines,
        updatedAt: new Date(),
      },
      { merge: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to save settings:", error);
    const message = error instanceof Error ? error.message : "Unable to save settings.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
