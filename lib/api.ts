export function getApiUrl() {
  const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
  return base.replace(/\/$/, "");
}
