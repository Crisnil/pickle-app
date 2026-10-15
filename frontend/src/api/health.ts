export interface PingResponse {
  status: string
  service: string
  db_connected: boolean
  db_time: string
}

export async function fetchPing(): Promise<PingResponse> {
  const base = import.meta.env.VITE_API_BASE_URL ?? '/api'
  const res = await fetch(`${base}/ping`)
  if (!res.ok) throw new Error(`Health check failed: ${res.status}`)
  return res.json()
}
