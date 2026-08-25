export function getApiUrl() {
  const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
  return base.replace(/\/$/, "");
}

export const API_OFFLINE_MESSAGE =
  "Health check failed. Crate Backend looks offline — start the API and try again.";

export function isHttpOk(res: Response) {
  return res.status === 200;
}

export async function readJson<T>(res: Response): Promise<T | null> {
  try {
    return (await res.json()) as T;
  } catch {
    return null;
  }
}
