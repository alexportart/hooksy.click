import { NextResponse } from 'next/server';

// Кэш на 10 минут
let cache: { data: RatesResult; ts: number } | null = null;
const CACHE_MS = 10 * 60 * 1000;

export interface RatesResult {
  RSD_per_USD: number;
  RSD_per_EUR: number;
  RSD_per_RUB: number;
  USD_per_RUB: number;
  updatedAt: string;
}

export async function GET() {
  try {
    if (cache && Date.now() - cache.ts < CACHE_MS) {
      return NextResponse.json(cache.data);
    }

    // Берём курсы с базой EUR (бесплатный API, без ключа)
    const res = await fetch('https://open.er-api.com/v6/latest/EUR', {
      next: { revalidate: 600 },
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();

    const rates = json.rates as Record<string, number>;

    // EUR→RSD, EUR→USD, EUR→RUB — пересчитываем всё через EUR
    const eurToRsd = rates['RSD'];
    const eurToUsd = rates['USD'];
    const eurToRub = rates['RUB'];

    const result: RatesResult = {
      RSD_per_USD: +(eurToRsd / eurToUsd).toFixed(2),
      RSD_per_EUR: +eurToRsd.toFixed(2),
      RSD_per_RUB: +(eurToRsd / eurToRub).toFixed(4),
      USD_per_RUB: +(eurToUsd / eurToRub).toFixed(5),
      updatedAt: new Date().toISOString(),
    };

    cache = { data: result, ts: Date.now() };
    return NextResponse.json(result);
  } catch (err) {
    console.error('[Rates API]', err);
    return NextResponse.json({ error: 'Не удалось получить курсы' }, { status: 500 });
  }
}
