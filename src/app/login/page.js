"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/getSecureWord", { username });

      // Store secure word in session storage
      sessionStorage.setItem(
        `secureWord-${username}`,
        response.data.secureWord
      );
      sessionStorage.setItem(
        `secureWordExpiry-${username}`,
        (Date.now() + 60000).toString()
      ); // 60 seconds expiry

      // Navigate to secure word display
      router.push(`/login/secure-word?username=${username}`);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to get secure word. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Enter Username</h2>
      {error && (
        <div className="text-red-500 mb-4 p-2 bg-red-50 rounded">{error}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Processing..." : "Get Secure Word"}
        </button>
      </form>
    </div>
  );
}
