import { useEffect, useState } from 'react'
import { fetchPing, type PingResponse } from './api/health'

function App() {
  const [data, setData] = useState<PingResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPing()
      .then(setData)
      .catch((e: Error) => setError(e.message))
  }, [])

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>PickleMatch — Dev Stack Check</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        !error && <p>Loading...</p>
      )}
    </div>
  )
}

export default App
