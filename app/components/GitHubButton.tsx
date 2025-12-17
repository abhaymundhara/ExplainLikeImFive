"use client";

import { useEffect, useState } from "react";

interface GitHubButtonProps {
  repoUrl?: string;
}

export default function GitHubButton({
  repoUrl = "https://github.com/vercel/next.js",
}: GitHubButtonProps) {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    // Extract owner/repo from URL
    try {
      const url = new URL(repoUrl);
      const pathParts = url.pathname.split("/").filter(Boolean);
      if (pathParts.length >= 2) {
        const owner = pathParts[0];
        const repo = pathParts[1];
        fetch(`https://api.github.com/repos/${owner}/${repo}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.stargazers_count !== undefined) {
              setStars(data.stargazers_count);
            }
          })
          .catch((err) => console.error("Failed to fetch stars", err));
      }
    } catch (e) {
      console.error("Invalid URL", e);
    }
  }, [repoUrl]);

  return (
    <div className="relative group inline-block">
      {/* Animated background glow/stars effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full opacity-20 blur transition duration-500"></div>

      {/* Floating stars animation elements */}
      <div className="absolute -top-2 -right-2 text-yellow-400 animate-bounce delay-100">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="none"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>
      <div className="absolute -bottom-1 -left-2 text-yellow-400 animate-bounce delay-300">
        <svg
          width="8"
          height="8"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="none"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>

      <a
        href={repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center gap-2 px-4 py-2 bg-[#1e293b] text-white rounded-full font-bold text-sm shadow-xl hover:transform hover:-translate-y-1 transition-all duration-300 border border-gray-700"
      >
        {/* GitHub Logo */}
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
        >
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>

        <span>GitHub</span>

        {/* Divider */}
        <div className="w-px h-4 bg-gray-600 mx-1"></div>

        {/* Star Count */}
        <div className="flex items-center gap-1 text-yellow-400">
          <span className="font-mono">
            {stars !== null ? stars.toLocaleString() : "..."}
          </span>
        </div>
      </a>
    </div>
  );
}
