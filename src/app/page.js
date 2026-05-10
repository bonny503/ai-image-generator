"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt) return;

    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      setImage(data.image);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-6">
        AI Image Generator
      </h1>

      <div className="w-full max-w-xl flex gap-2">
        <input
          type="text"
          placeholder="Enter your prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-1 p-3 rounded text-black"
        />

        <button
          onClick={generateImage}
          className="bg-blue-600 px-6 py-3 rounded"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>

      {image && (
        <img
          src={image}
          alt="Generated"
          className="mt-8 rounded-lg w-full max-w-2xl"
        />
      )}
    </main>
  );
}
