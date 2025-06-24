"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("No authentication token");
        }

        const response = await axios.get("/api/transaction-history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTransactions(response.data);
      } catch (err) {
        console.error("Dashboard error:", err);
        setError("Failed to load transactions. Please login again.");
        localStorage.removeItem("authToken");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [router]);

  if (!isClient) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Transaction History</h1>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse h-16 bg-gray-200 rounded"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Transaction History</h1>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse h-16 bg-gray-200 rounded"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Transaction History</h1>
        <div className="text-red-500 p-4 bg-red-50 rounded">
          {error}
          <button
            onClick={() => router.push("/login")}
            className="mt-2 text-blue-600 hover:underline"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Transaction History</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Reference ID</th>
              <th className="py-3 px-4 text-left">To</th>
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.map((txn, index) => (
              <tr key={index}>
                <td className="py-3 px-4">{txn.date}</td>
                <td className="py-3 px-4">{txn.referenceId}</td>
                <td className="py-3 px-4">{txn.to}</td>
                <td className="py-3 px-4">{txn.type}</td>
                <td className="py-3 px-4">{txn.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
