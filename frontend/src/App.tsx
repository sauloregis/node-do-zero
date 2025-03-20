import { useState, useEffect } from "react";
import axios from "axios";

function FetchButton() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://node-do-zero-b9lg.onrender.com/videos");
        console.log(response);
        setData(response.data);
      } catch (err) {
        console.log(err);
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Erro ao buscar dados");
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Ocorreu um erro desconhecido.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <button disabled style={{ padding: "10px", fontSize: "16px" }}>Carregando...</button>
      ) : (
        <button onClick={() => window.location.reload()} style={{ padding: "10px", fontSize: "16px" }}>Buscar Dados</button>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data && (
        <pre style={{ textAlign: "left", background: "#f4f4f4", padding: "10px" }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default FetchButton;