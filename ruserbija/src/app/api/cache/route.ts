// ============================================================
// GET /api/cache — статус кэшей для всех топиков
// Используется для админки/дебага
// ============================================================

import { NextResponse } from 'next/server';
import { getAllCacheStatus } from '@/lib/cache';

export async function GET() {
  try {
    const status = getAllCacheStatus();
    return NextResponse.json({
      status: 'ok',
      caches: status,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json(
      {
        status: 'error',
        message: err instanceof Error ? err.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}