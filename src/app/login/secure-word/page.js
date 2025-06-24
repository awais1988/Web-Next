'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SecureWordDisplay() {
  const router = useRouter();
  const params = useSearchParams();
  const username = params.get('username');
  const [timeLeft, setTimeLeft] = useState(60);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!username) {
      router.push('/login');
      return;
    }

    const secureWord = sessionStorage.getItem(`secureWord-${username}`);
    const expiry = sessionStorage.getItem(`secureWordExpiry-${username}`);

    if (!secureWord || !expiry) {
      router.push('/login');
      return;
    }

    const timer = setInterval(() => {
      const secondsLeft = Math.max(0, Math.floor((parseInt(expiry) - Date.now()) / 1000));
      setTimeLeft(Math.ceil(secondsLeft));

      if (secondsLeft <= 0) {
        clearInterval(timer);
        setError('Secure word has expired');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [username, router]);

  if (!username) {
    return null; // Will redirect
  }

  const secureWord = sessionStorage.getItem(`secureWord-${username}`);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Your Secure Word</h2>
      {error ? (
        <div className="text-red-500 mb-4 p-2 bg-red-50 rounded">{error}</div>
      ) : (
        <>
          <div className="mb-6 p-4 bg-gray-100 rounded">
            <p className="text-center font-mono text-xl">{secureWord}</p>
          </div>
          <div className={`mb-6 text-center ${
            timeLeft < 30 ? 'text-red-500' : 'text-yellow-600'
          }`}>
            Expires in: {timeLeft} seconds
          </div>
          <Link
            href={`/login/password?username=${username}`}
            className="block w-full bg-green-600 text-white p-2 rounded text-center hover:bg-green-700"
          >
            Continue to Password
          </Link>
        </>
      )}
    </div>
  );
}