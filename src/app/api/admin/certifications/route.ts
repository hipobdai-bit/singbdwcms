import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebaseAdmin";
import { uploadImageToStorage } from "@/lib/storage";

export async function POST(request: Request) {
  try {
    const db = getAdminDb();
    const contentType = request.headers.get("content-type") || "";
    let name = "";
    let status = "";
    let description = "";
    let image = "";

    if (contentType.includes("application/json")) {
      const body = await request.json();
      name = body.name ?? "";
      status = body.status ?? "";
      description = body.description ?? "";
      image = body.image ?? "";
    } else {
      const formData = await request.formData();
      name = String(formData.get("name") ?? "");
      status = String(formData.get("status") ?? "");
      description = String(formData.get("description") ?? "");
      const imageFile = formData.get("image");

      if (imageFile instanceof File && imageFile.size > 0) {
        image = await uploadImageToStorage(imageFile, "certifications", name);
      }
    }

    if (!name || !status || !description || !image) {
      return NextResponse.json(
        { message: "Name, status, description, and image are required." },
        { status: 400 }
      );
    }

    await db.collection("certifications").add({
      name,
      status,
      description,
      image,
      isActive: true,
      order: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to save certification:", error);
    const message = error instanceof Error ? error.message : "Unable to save certification.";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = getAdminDb();
    const snapshot = await db.collection("certifications").orderBy("order", "asc").get();
    const certifications = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json({ certifications });
  } catch (error) {
    console.error("Failed to load certifications:", error);
    const message = error instanceof Error ? error.message : "Unable to load certifications.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
