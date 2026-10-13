import { useEffect, useState } from "react"
import { fetchBackEndApi } from "./services/api";

function App() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBackEndApi("/")
    .then((result) => {
      setData(result);
      setLoading(false);
    }).catch((error) => {
      setError(`Gagal terhubung ke FastAPI Endpoint, err ${error}`);
      setLoading(false);
    });
  }, []);

  return (
    <div style={{padding: '5px'}}>
      <h1>Cek Backend</h1>
      {loading && <p>loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data && <p>{JSON.stringify(data.pesan, null, 2)}</p>}
    </div>
  )
}

export default App
