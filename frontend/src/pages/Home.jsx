import { useState } from "react";
import axios from "axios";

function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // ✅ Use environment variable (works locally + on Render)
  const API_URL = import.meta.env.VITE_API_URL;

  const handleCreate = async () => {
    setError("");
    setResult(null);

    if (!text.trim()) {
      setError("Note cannot be empty.");
      return;
    }

    if (text.length > 500) {
      setError("Note must be under 500 characters.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${API_URL}/api/notes`,
        { text }
      );

      setResult(res.data);
      setText("");
    } catch (err) {
      setError(
        err.response?.data?.error || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result?.url) return;

    try {
      await navigator.clipboard.writeText(result.url);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Create Private Note
        </h1>

        <textarea
          className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          maxLength="500"
          placeholder="Write your note (max 500 characters)"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <p className="text-sm text-gray-500 mb-4 text-right">
          {text.length}/500
        </p>

        <button
          onClick={handleCreate}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Note"}
        </button>

        {error && (
          <p className="text-red-500 mt-4 text-center">
            {error}
          </p>
        )}

        {result && (
          <div className="mt-6 bg-green-100 p-4 rounded-lg">
            <p className="font-semibold mb-2">
              Shareable URL:
            </p>

            <div className="flex items-center gap-2 mb-3">
              <input
                type="text"
                value={result.url}
                readOnly
                className="flex-1 px-2 py-1 border rounded text-sm"
              />

              <button
                onClick={handleCopy}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            <p>
              <span className="font-semibold">
                Password:
              </span>{" "}
              {result.password}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
