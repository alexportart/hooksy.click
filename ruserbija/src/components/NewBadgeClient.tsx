"use client";

import { isNew } from "@/lib/freshness";
import NewBadge from "@/components/NewBadge";

// Клиентская обёртка: дата свежести вычисляется в браузере при каждом заходе,
// поэтому бейдж исчезает точно через 4 дня без пересборки сайта.
export default function NewBadgeClient({
  publishedAt,
  style,
}: {
  publishedAt?: string;
  style?: React.CSSProperties;
}) {
  if (!isNew(publishedAt)) return null;
  return <NewBadge style={style} />;
}
