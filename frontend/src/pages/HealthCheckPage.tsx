import { useEffect, useState } from 'react'
import { fetchPing, type PingResponse } from '../api/health'

const HealthCheckPage = () => {
  const [data, setData] = useState<PingResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPing()
      .then(setData)
      .catch((e: Error) => setError(e.message))
  }, [])

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-xl font-bold text-slate-900">Dev Stack Check</h1>
      {error && <p className="text-red-600">Error: {error}</p>}
      {data ? (
        <pre className="overflow-x-auto rounded-md bg-slate-900 p-3 text-xs text-slate-100">
          {JSON.stringify(data, null, 2)}
        </pre>
      ) : (
        !error && <p className="text-slate-500">Loading...</p>
      )}
    </div>
  )
}

export default HealthCheckPage
