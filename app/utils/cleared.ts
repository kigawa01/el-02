export function getClearedIds(searchParams: URLSearchParams): number[] {
  return searchParams.getAll("cleared").map(Number).filter(Boolean);
}

export function buildClearedParams(clearedIds: number[], extra?: Record<string, string>): string {
  const params = new URLSearchParams();
  clearedIds.forEach((id) => params.append("cleared", String(id)));
  if (extra) Object.entries(extra).forEach(([k, v]) => params.set(k, v));
  return params.toString();
}
