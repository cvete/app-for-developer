"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      router.push("/");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm flex flex-col gap-8 border border-gray-200"
      >
        <div className="text-center mb-2 flex flex-col items-center">
          <Image src="/logo.svg" alt="Properti Logo" width={120} height={32} className="mb-4" />
          <div className="text-lg font-medium font-['Roboto'] text-gray-800 mt-4">Login to your account</div>
        </div>
        {/* Username field */}
        <div className="relative mt-2">
          <input
            id="username"
            type="text"
            value={username}
            onChange={e => { setUsername(e.target.value); if (error) setError(""); }}
            className={`peer block w-full border rounded px-4 pt-6 pb-2 text-base text-black caret-black bg-transparent focus:outline-none focus:ring-2 focus:ring-black transition placeholder-transparent ${error ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Username"
            autoComplete="username"
            required
          />
          <label
            htmlFor="username"
            className={`absolute left-4 top-1.5 text-gray-500 text-base pointer-events-none transition-all duration-200
              peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
              peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-black
              ${username ? 'top-1.5 text-xs text-black' : ''}`}
          >
            Username*
          </label>
        </div>
        {/* Password field */}
        <div className="relative mt-2">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={e => { setPassword(e.target.value); if (error) setError(""); }}
            className={`peer block w-full border rounded px-4 pt-6 pb-2 text-base text-black caret-black bg-transparent focus:outline-none focus:ring-2 focus:ring-black transition placeholder-transparent ${error ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Password"
            autoComplete="current-password"
            required
          />
          <label
            htmlFor="password"
            className={`absolute left-4 top-1.5 text-gray-500 text-base pointer-events-none transition-all duration-200
              peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
              peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-black
              ${password ? 'top-1.5 text-xs text-black' : ''}`}
          >
            Password*
          </label>
          <button
            type="button"
            tabIndex={-1}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-black focus:outline-none"
            onClick={() => setShowPassword(v => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "👁️" : "🙈"}
          </button>
        </div>
        {error && <div className="text-red-600 text-sm text-center">{error}</div>}
        <button
          type="submit"
          className="bg-black text-white rounded px-4 py-3 font-semibold hover:bg-gray-900 transition text-lg mt-2"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
