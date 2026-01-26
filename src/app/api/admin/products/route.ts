import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebaseAdmin";
import { uploadImageToStorage } from "@/lib/storage";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function POST(request: Request) {
  try {
    const db = getAdminDb();
    const contentType = request.headers.get("content-type") || "";
    let name = "";
    let shortDescription = "";
    let productCode = "";
    let categorySlug = "";
    let image = "";

    if (contentType.includes("application/json")) {
      const body = await request.json();
      name = body.name ?? "";
      shortDescription = body.shortDescription ?? "";
      productCode = body.productCode ?? "";
      categorySlug = body.categorySlug ?? "";
      image = body.image ?? "";
    } else {
      const formData = await request.formData();
      name = String(formData.get("name") ?? "");
      shortDescription = String(formData.get("shortDescription") ?? "");
      productCode = String(formData.get("productCode") ?? "");
      categorySlug = String(formData.get("categorySlug") ?? "");
      const imageFile = formData.get("image");

      if (imageFile instanceof File && imageFile.size > 0) {
        image = await uploadImageToStorage(
          imageFile,
          "products",
          productCode || name
        );
      }
    }

    if (!name || !shortDescription || !image || !categorySlug) {
      return NextResponse.json(
        { message: "Name, short description, image, and category are required." },
        { status: 400 }
      );
    }

    const slug = slugify(productCode || name);

    await db.collection("products").add({
      name,
      shortDescription,
      description: shortDescription,
      productCode: productCode || "",
      image,
      categorySlug,
      slug,
      isActive: true,
      order: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to save product:", error);
    const message = error instanceof Error ? error.message : "Unable to save product.";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = getAdminDb();
    const snapshot = await db.collection("products").get();
    const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Failed to load products:", error);
    const message = error instanceof Error ? error.message : "Unable to load products.";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const db = getAdminDb();
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("id");

    if (!productId) {
      return NextResponse.json(
        { message: "Product ID is required." },
        { status: 400 }
      );
    }

    await db.collection("products").doc(productId).delete();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete product:", error);
    const message = error instanceof Error ? error.message : "Unable to delete product.";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const db = getAdminDb();
    const formData = await request.formData();
    
    const productId = String(formData.get("id") ?? "");
    const name = String(formData.get("name") ?? "");
    const shortDescription = String(formData.get("shortDescription") ?? "");
    const productCode = String(formData.get("productCode") ?? "");
    const categorySlug = String(formData.get("categorySlug") ?? "");
    const imageFile = formData.get("image");

    if (!productId) {
      return NextResponse.json(
        { message: "Product ID is required." },
        { status: 400 }
      );
    }

    if (!name || !shortDescription || !categorySlug) {
      return NextResponse.json(
        { message: "Name, short description, and category are required." },
        { status: 400 }
      );
    }

    const updateData: any = {
      name,
      shortDescription,
      description: shortDescription,
      productCode: productCode || "",
      categorySlug,
      slug: slugify(productCode || name),
      updatedAt: new Date(),
    };

    // Only upload new image if provided
    if (imageFile instanceof File && imageFile.size > 0) {
      const image = await uploadImageToStorage(
        imageFile,
        "products",
        productCode || name
      );
      updateData.image = image;
    }

    await db.collection("products").doc(productId).update(updateData);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update product:", error);
    const message = error instanceof Error ? error.message : "Unable to update product.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
