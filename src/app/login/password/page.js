"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import CryptoJS from "crypto-js";

export default function PasswordStep() {
  const router = useRouter();
  const params = useSearchParams();
  const username = params.get("username");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!username) throw new Error("Session expired");

      // Get secure word from session storage
      const secureWord = sessionStorage.getItem(`secureWord-${username}`);
      const expiry = sessionStorage.getItem(`secureWordExpiry-${username}`);

      if (!secureWord || !expiry || Date.now() > parseInt(expiry)) {
        throw new Error("Secure word expired. Please start over.");
      }

      // Hash the password
      const hashedPassword = CryptoJS.SHA256(password).toString();

      // Call login API
      const response = await axios.post("/api/login", {
        username,
        hashedPassword,
        secureWord,
      });

      // Store token and proceed to MFA
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("username", username);
      router.push("/login/mfa");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Login failed");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!username) {
    router.push("/login");
    return null;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Enter Password</h2>
      {error && (
        <div className="text-red-500 mb-4 p-2 bg-red-50 rounded">
          {error}
          <button
            onClick={() => router.push("/login")}
            className="block mt-2 text-blue-600 hover:underline"
          >
            Start over
          </button>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
