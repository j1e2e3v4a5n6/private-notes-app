import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function NotePage() {
  const { id } = useParams();

  const [password, setPassword] = useState("");
  const [note, setNote] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const unlockNote = async () => {
    setError("");

    try {
      const res = await axios.post(
        `https://private-notes-app-z53w.onrender.com/api/notes/${id}/unlock`,
        { password }
      );

      setNote(res.data.text);
    } catch (err) {
      setError(err.response?.data?.error || "Invalid password");
    }
  };

  const handleSummarize = async () => {
    setLoading(true);
    setSummary("");

    try {
      const res = await axios.post(
        `https://private-notes-app-z53w.onrender.com/api/notes/${id}/summarize`
      );

      setSummary(res.data.summary);
    } catch (err) {
      setError("Failed to generate summary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-xl">

        {!note ? (
          <>
            <h2 className="text-xl font-bold mb-4 text-center">
              Enter Password
            </h2>

            <input
              type="password"
              className="w-full border rounded-lg p-2 mb-4 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={unlockNote}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Unlock Note
            </button>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">Your Note</h2>

            <p className="mb-4 whitespace-pre-wrap">{note}</p>

            <button
              onClick={handleSummarize}
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
            >
              {loading ? "Generating..." : "Summarize this note"}
            </button>

            {summary && (
              <div className="mt-4 bg-gray-100 p-4 rounded-lg whitespace-pre-wrap">
                {summary}
              </div>
            )}
          </>
        )}

        {error && (
          <p className="text-red-500 mt-4 text-center">{error}</p>
        )}
      </div>
    </div>
  );
}

export default NotePage;
