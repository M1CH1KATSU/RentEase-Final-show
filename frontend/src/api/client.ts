export const API_URL = `${import.meta.env.VITE_API_URL ?? 'http://localhost:5000'}/api`

export async function readError(response: Response, fallback: string): Promise<string> {
  try {
    const body = await response.json()
    return body?.message ?? fallback
  } catch {
    return fallback
  }
}
