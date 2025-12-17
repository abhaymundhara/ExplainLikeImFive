"use client";

import { useState } from "react";
import GitHubButton from "./components/GitHubButton";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [explanation, setExplanation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const quotes = [
    "I am running away from my responsibilities. And it feels good.",
    "Identity theft is not a joke, Jim! Millions of families suffer every year!",
    "I’m not superstitious, but I am a little stitious.",
    "And I knew exactly what to do. But in a much more real sense, I had no idea what to do.",
    "Would I rather be feared or loved? Easy. Both. I want people to be afraid of how much they love me.",
    "Sometimes I'll start a sentence and I don't even know where it's going. I just hope I find it along the way.",
    "Bears. Beets. Battlestar Galactica.",
    "That's what she said.",
    "I declare BANKRUPTCY!",
    "Why are you the way that you are?",
    "I talk a lot, so I’ve learned to tune myself out.",
    "I love inside jokes. I’d love to be a part of one someday.",
    "I am Beyoncé, always.",
    "I wish there was a way to know you’re in the good old days before you’ve actually left them.",
    "I feel God in this Chili’s tonight.",
    "You miss 100% of the shots you don’t take. – Wayne Gretzky – Michael Scott",
    "I’m an early bird and a night owl. So I’m wise and I have worms.",
    "I don’t hate it. I just don’t like it at all and it’s terrible.",
    "I am faster than 80% of all snakes.",
    "Sometimes the clothes at GapKids are just too flashy.",
    "I have cause. It is beCAUSE I hate him.",
    "I understand nothing.",
    "I am dead inside.",
    "I have very little patience for stupidity.",
    "I’m always thinking one step ahead. Like a carpenter… who makes stairs.",
    "I’m not usually the butt of the joke. I’m usually the face of the joke.",
    "I am aware of the effect I have on women.",
    "I hate so much about the things that you choose to be.",
    "I am a black belt in gift wrapping.",
    "You cheated on me? When I specifically asked you not to?",
    "I’m not great at advice. Can I interest you in a sarcastic comment?",
    "I love how many different kinds of bears there are.",
    "This is an environment of welcoming, and you should just get the hell out of here.",
    "I consider myself a good person, but I’m going to try to make him cry.",
    "I don’t believe in ghosts. But I do believe in spirits.",
    "I am declining to speak first.",
    "I am an adult.",
    "Explain it to me like I’m five.",
    "I would not miss it for the world. But if something else came up, I would definitely not go.",
    "I am not a bad person.",
    "I don’t care what they say about me. I just want to eat.",
    "I have been Michael Scott for 42 years.",
    "I am running out of things to say.",
    "I don’t come up with this stuff. I just forward it along.",
    "I am not a hero. I just put my bra on one boob at a time.",
    "I don’t trust you, Phyllis!",
    "I don’t understand. Explain this.",
    "I hate being disappointed.",
    "I just want to lie on the beach and eat hot dogs.",
  ];

  const handleExplain = async () => {
    if (!inputText.trim()) {
      setError("Please enter some text to explain.");
      return;
    }
    if (inputText.trim().length < 10) {
      setError("Please enter a bit more text for a better explanation.");
      return;
    }

    setError("");
    setIsLoading(true);
    setExplanation("");

    try {
      const response = await fetch("/api/explain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setExplanation(data.explanation);
    } catch (err: any) {
      setError(err.message || "Failed to get explanation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(explanation);
  };

  const clearAll = () => {
    setInputText("");
    setExplanation("");
    setError("");
  };

  return (
    <main className="min-h-screen md:h-screen bg-[#f0f0f0] text-black font-sans selection:bg-yellow-200 relative overflow-y-auto md:overflow-hidden flex flex-col md:flex-row">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Left Panel - Branding & Info */}
      <div className="w-full md:w-1/3 bg-white border-b-4 md:border-b-0 md:border-r-4 border-black p-8 flex flex-col justify-center items-center text-center relative z-10 shadow-xl">
        <div className="mb-8">
          <div className="bg-black text-white px-6 py-3 font-bold text-2xl uppercase tracking-widest border-4 border-gray-800 shadow-lg transform -rotate-2 hover:rotate-0 transition-transform duration-300 cursor-default inline-block">
            Dunder Mifflin
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-6 text-black uppercase font-serif leading-tight">
          Explain like
          <br />
          I'm FIVE
        </h1>

        {/* Scrolling Quotes */}
        <div
          className="h-64 overflow-hidden relative w-full max-w-xs mx-auto mb-8"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <div className="animate-scroll-up flex flex-col gap-8">
            {[...quotes, ...quotes].map((quote, i) => (
              <p
                key={i}
                className="text-lg text-gray-700 font-mono leading-relaxed italic"
              >
                "{quote}"
              </p>
            ))}
          </div>
        </div>

        <div className="mb-8 w-full max-w-xs mx-auto">
          <img
            src="/image.jpg"
            alt="The Office Scene"
            className="w-full h-auto border-4 border-black shadow-lg transform rotate-1 hover:rotate-0 transition-transform duration-300"
          />
        </div>

        <div className="mt-auto pt-8 border-t-2 border-gray-100 w-full">
          <p className="text-xs text-gray-500 font-mono">
            DISCLAIMER: This is an explanation, not legal advice. Identity theft
            is not a joke, Jim!
          </p>
        </div>
      </div>

      {/* Right Panel - Tool */}
      <div className="w-full md:w-2/3 p-4 md:p-8 overflow-hidden relative z-10 flex flex-col min-h-[600px] md:h-full">
        {/* GitHub Button - Responsive Placement */}
        <div className="flex justify-end mb-4 w-full max-w-3xl mx-auto">
          <GitHubButton repoUrl="https://github.com/abhay0811/ExplainLike" />
        </div>

        <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] flex-1 flex flex-col max-w-3xl mx-auto w-full overflow-hidden">
          {/* Input Area - Reverted to White/Paper Theme but with Computron Reference */}
          <div className="p-6 border-b-2 border-black flex-shrink-0 relative">
            <div className="absolute top-2 right-2 text-[10px] font-mono text-gray-400 uppercase tracking-widest">
              Powered by Computron
            </div>
            <label
              htmlFor="input-text"
              className="block text-lg font-bold text-black uppercase tracking-wide mb-2"
            >
              Memo To Explain:
            </label>
            <textarea
              id="input-text"
              rows={4}
              className="w-full p-3 border-2 border-gray-400 focus:border-black focus:ring-0 outline-none transition-all resize-none text-base font-mono bg-[#fffff0]"
              placeholder="Paste the corporate jargon here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />

            <div className="mt-4 flex items-center justify-end">
              <button
                onClick={handleExplain}
                disabled={isLoading}
                className={`px-6 py-2 text-white font-bold uppercase tracking-widest border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all text-sm
                  ${
                    isLoading
                      ? "bg-gray-400 cursor-not-allowed shadow-none translate-y-0.5"
                      : "bg-[#0055a5] hover:bg-[#004488] hover:translate-y-0.5 hover:shadow-none active:bg-black"
                  }`}
              >
                {isLoading ? "Processing..." : "Explain"}
              </button>
            </div>
            {error && (
              <p className="text-red-600 text-xs mt-2 font-bold">{error}</p>
            )}
          </div>

          {/* Output Area - Scrollable */}
          <div className="flex-1 bg-[#fff9c4] p-6 overflow-y-auto relative min-h-0">
            <div className="absolute top-0 left-0 bg-yellow-300 text-[10px] font-bold px-2 py-1 border-r border-b border-black z-20">
              CONFIDENTIAL // REGIONAL MANAGER EYES ONLY
            </div>

            {!explanation && !isLoading && (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-50">
                <div className="text-6xl mb-2">?</div>
                <p className="font-mono text-sm text-center">
                  Waiting for input...
                </p>
              </div>
            )}

            {explanation && (
              <div className="animate-in fade-in duration-500">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-black font-serif underline decoration-wavy decoration-gray-400">
                    The Rundown
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={copyToClipboard}
                      className="text-xs font-bold uppercase border-2 border-black px-2 py-1 hover:bg-black hover:text-white transition-colors"
                    >
                      Copy
                    </button>
                    <button
                      onClick={clearAll}
                      className="text-xs font-bold uppercase border-2 border-red-600 text-red-600 px-2 py-1 hover:bg-red-600 hover:text-white transition-colors"
                    >
                      Shred
                    </button>
                  </div>
                </div>
                <div className="prose prose-sm md:prose-base max-w-none text-black leading-relaxed whitespace-pre-wrap font-mono">
                  {explanation}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
