"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function MfaStep() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    // Only check auth token on client side
    if (!localStorage.getItem("authToken")) {
      router.push("/login");
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (attempts >= 3) {
        throw new Error("Too many attempts. Please try again later.");
      }

      const response = await axios.post("/api/verifyMfa", {
        code,
        username: localStorage.getItem("username"),
      });

      if (response.data.success) {
        localStorage.setItem("authToken", response.data.token);
        router.push("/dashboard");
      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        throw new Error(
          response.data.message ||
            `Invalid code. Attempts left: ${3 - newAttempts}`
        );
      }
    } catch (err) {
      setError(err.message);
      if (err.response?.status === 401) {
        localStorage.removeItem("authToken");
        router.push("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-6">MFA Verification</h2>
        <div className="animate-pulse h-8 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">MFA Verification</h2>
      <p className="mb-4">Enter your 6-digit code (valid codes start with 1)</p>
      {error && (
        <div className="text-red-500 mb-4 p-2 bg-red-50 rounded">
          {error}
          {attempts >= 3 && (
            <button
              onClick={() => router.push("/login")}
              className="block mt-2 text-blue-600 hover:underline"
            >
              Start over
            </button>
          )}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            value={code}
            onChange={(e) =>
              setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
            }
            className="w-full p-2 border rounded text-center text-xl"
            inputMode="numeric"
            pattern="\d{6}"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading || attempts >= 3}
          className={`w-full p-2 rounded text-white ${
            loading || attempts >= 3
              ? "bg-gray-400"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>
    </div>
  );
}
