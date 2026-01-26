import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebaseAdmin";
import { uploadImageToStorage } from "@/lib/storage";

export async function POST(request: Request) {
  try {
    const db = getAdminDb();
    const contentType = request.headers.get("content-type") || "";
    let name = "";
    let logoUrl = "";

    if (contentType.includes("application/json")) {
      const body = await request.json();
      name = body.name ?? "";
      logoUrl = body.logoUrl ?? "";
    } else {
      const formData = await request.formData();
      name = String(formData.get("name") ?? "");
      const logoFile = formData.get("logo");

      if (logoFile instanceof File && logoFile.size > 0) {
        logoUrl = await uploadImageToStorage(logoFile, "clients", name);
      }
    }

    if (!name || !logoUrl) {
      return NextResponse.json(
        { message: "Client name and logo are required." },
        { status: 400 }
      );
    }

    await db.collection("clients").add({
      name,
      logoUrl,
      isActive: true,
      order: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to save client logo:", error);
    const message = error instanceof Error ? error.message : "Unable to save client logo.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
