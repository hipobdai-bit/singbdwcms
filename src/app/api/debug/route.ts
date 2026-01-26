import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebaseAdmin';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const envStatus = {
      projectId: !!process.env.FIREBASE_PROJECT_ID,
      clientEmail: !!process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: !!process.env.FIREBASE_PRIVATE_KEY,
      privateKeyLength: process.env.FIREBASE_PRIVATE_KEY?.length || 0,
    };

    const db = getAdminDb();
    
    // Attempt a lightweight read
    try {
        await db.listCollections();
    } catch (dbError: any) {
        return NextResponse.json({
            status: 'error',
            message: 'Firebase connection failed',
            envStatus,
            error: dbError.message
        }, { status: 500 });
    }

    return NextResponse.json({
      status: 'ok',
      message: 'Firebase connected successfully',
      envStatus,
      timestamp: new Date().toISOString(),
    });

  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      message: 'Unexpected error in debug route',
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}
