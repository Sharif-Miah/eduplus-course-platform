"use client";

import React, { useState, useRef, useEffect } from "react";
import { Brain, MessageCircle, Send, X, Sparkles, RefreshCw, Check, Copy } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// Format simple markdown into clean HTML
function formatMarkdown(text) {
  if (!text) return "";

  // Escape HTML tags to prevent XSS
  let escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Code blocks: ```code```
  escaped = escaped.replace(
    /```([\s\S]*?)```/g,
    '<pre class="my-2 p-3 bg-[#0a0e1a] border border-indigo-500/30 rounded-xl text-xs font-mono overflow-x-auto text-indigo-200"><code>$1</code></pre>'
  );

  // Inline code: `code`
  escaped = escaped.replace(
    /`([^`]+)`/g,
    '<code class="px-1.5 py-0.5 bg-slate-900 border border-slate-700/60 rounded text-xs font-mono text-indigo-300">$1</code>'
  );

  // Bold text: **text**
  escaped = escaped.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-white">$1</strong>');

  // Bullet points
  escaped = escaped.replace(/^[*-]\s+(.+)$/gm, '<li class="ml-4 list-disc text-slate-300">$1</li>');

  // Line breaks
  escaped = escaped.replace(/\n/g, "<br/>");

  return escaped;
}

export default function AiChatModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const pathname = usePathname();
  const isLessonPage = pathname?.includes("/lesson");

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const abortControllerRef = useRef(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (isOpen && messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isLoading, isStreaming]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const defaultPrompts = [
    {
      icon: "📜",
      text: "How do I unlock and download my course certificate?",
    },
    {
      icon: "🔓",
      text: "How does sequential lesson progression work?",
    },
    {
      icon: "🐍",
      text: "Explain Python basics: variables, loops, and functions",
    },
    {
      icon: "💡",
      text: "How can I prepare for the course quizzes?",
    },
  ];

  const handleSend = async (userText) => {
    const textToSend = typeof userText === "string" ? userText : inputValue;
    if (!textToSend.trim() || isLoading || isStreaming) return;

    const userMessage = { role: "user", content: textToSend.trim() };
    const updatedMessages = [...messages, userMessage];

    // Optimistically add user message and empty assistant bubble
    setMessages([...updatedMessages, { role: "assistant", content: "" }]);
    setInputValue("");
    setIsLoading(true);
    setIsStreaming(true);

    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      if (!response.body) {
        throw new Error("No response body stream");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";
      let firstChunkReceived = false;

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulatedText += chunk;

        if (!firstChunkReceived && accumulatedText.trim().length > 0) {
          firstChunkReceived = true;
          setIsLoading(false); // Stop "thinking" placeholder once tokens start arriving
        }

        // Real-time stream updates to state
        setMessages((prev) => {
          const next = [...prev];
          if (next.length > 0 && next[next.length - 1].role === "assistant") {
            next[next.length - 1] = {
              role: "assistant",
              content: accumulatedText,
            };
          }
          return next;
        });
      }
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("Stream aborted by user");
      } else {
        console.error("Chat streaming error:", err);
        setMessages((prev) => {
          const next = [...prev];
          const lastMsg = next[next.length - 1];
          if (lastMsg && lastMsg.role === "assistant" && !lastMsg.content) {
            next[next.length - 1] = {
              role: "assistant",
              content: "⚠️ Network connection error. Please try asking again.",
            };
          }
          return next;
        });
      }
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  const handleClearChat = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setMessages([]);
    setIsLoading(false);
    setIsStreaming(false);
  };

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className={cn("fixed bottom-6 right-6 z-50 flex flex-col items-end", isLessonPage && "xl:hidden")}>
      {/* 1. Floating Trigger Button (Matching Project Brand Color #4A3AFF) */}
      {!isOpen && (
        <div className="group relative flex items-center cursor-pointer">
          {/* Subtle Project-themed Pill Badge */}
          <div
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 -mr-3.5 pr-6 rounded-l-full bg-[#3D2FE6]/90 hover:bg-[#3D2FE6] text-white text-xs font-bold shadow-lg border-y border-l border-indigo-400/30 transition-all duration-300 group-hover:pr-7 select-none"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-200 animate-pulse" />
            <span>Ask AI</span>
          </div>

          {/* Floating Circle Button */}
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open AI Assistant"
            className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-[#4A3AFF] to-[#6366f1] text-white shadow-[0_0_25px_rgba(74,58,255,0.45)] hover:shadow-[0_0_35px_rgba(74,58,255,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 z-10 border border-indigo-400/40"
          >
            {/* Ambient Indigo Glow Pulse */}
            <span className="absolute -inset-1 rounded-full bg-indigo-500/30 blur-md group-hover:bg-indigo-500/50 transition-all duration-300 animate-pulse" />

            {/* White Message Bubble Icon */}
            <MessageCircle className="w-7 h-7 stroke-[2.2] relative z-10 text-white fill-none" />
          </button>
        </div>
      )}

      {/* 2. Chat Modal Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[410px] h-[580px] max-h-[86vh] flex flex-col bg-[#0b0f19] border border-slate-800/90 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3.5 bg-[#0e1424] border-b border-slate-800/90">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-[#4A3AFF] to-[#6366f1] text-white shadow-md shadow-indigo-500/25">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
                  Ask AI
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.5 bg-[#4A3AFF]/20 text-indigo-300 border border-[#4A3AFF]/35 rounded-full">
                    Gemini Live
                  </span>
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {messages.length > 0 && (
                <button
                  onClick={handleClearChat}
                  title="Clear conversation"
                  className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 rounded-lg transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                title="Close"
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-800">
            {messages.length === 0 ? (
              /* Initial Welcome State */
              <div className="flex flex-col items-center justify-center h-full text-center px-3 py-6">
                {/* Large Center Brain Icon with Project Indigo Accent */}
                <div className="w-16 h-16 rounded-full bg-[#141b2f] border border-[#4A3AFF]/40 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(74,58,255,0.25)]">
                  <Brain className="w-9 h-9 text-indigo-400" />
                </div>

                {/* Heading */}
                <h2 className="text-xl font-bold text-white mb-2 tracking-tight">
                  How can I help you today?
                </h2>

                {/* Subtitle */}
                <p className="text-xs text-slate-400 mb-6 leading-relaxed max-w-[280px]">
                  Ask me anything about your courses, lessons, code, or certificates on EduPlus.
                </p>

                {/* Prompt Suggestions */}
                <div className="w-full space-y-2">
                  {defaultPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(prompt.text)}
                      className="w-full text-left flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#131b2e] hover:bg-[#1c2642] border border-slate-800/90 hover:border-[#4A3AFF]/50 text-xs text-slate-200 transition-all duration-200 group"
                    >
                      <span className="text-sm">{prompt.icon}</span>
                      <span className="flex-1 truncate font-medium text-slate-300 group-hover:text-white">
                        {prompt.text}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Active Chat Message Thread */
              <div className="space-y-3.5">
                {messages.map((msg, index) => {
                  const isUser = msg.role === "user";
                  const isLastAssistantMessage = !isUser && index === messages.length - 1;
                  const isMessageCurrentlyStreaming = isLastAssistantMessage && isStreaming;

                  // If this is an empty assistant placeholder while thinking
                  if (!isUser && !msg.content && isLoading) {
                    return (
                      <div key={index} className="flex flex-col items-start group">
                        <div className="bg-[#131a2c] border border-slate-800 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-[#4A3AFF] animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-2 h-2 rounded-full bg-[#4A3AFF] animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="w-2 h-2 rounded-full bg-[#4A3AFF] animate-bounce" style={{ animationDelay: "300ms" }} />
                          </div>
                          <span className="text-xs text-slate-400 font-medium ml-1">
                            EduPlus AI is thinking...
                          </span>
                        </div>
                      </div>
                    );
                  }

                  // Skip rendering completely blank assistant message if still loading
                  if (!isUser && !msg.content) return null;

                  return (
                    <div
                      key={index}
                      className={cn(
                        "flex flex-col group",
                        isUser ? "items-end" : "items-start"
                      )}
                    >
                      <div
                        className={cn(
                          "relative text-xs sm:text-sm px-4 py-2.5 leading-relaxed rounded-2xl shadow-sm",
                          isUser
                            ? "bg-gradient-to-r from-[#4A3AFF] to-[#6366f1] text-white shadow-md shadow-indigo-500/20 rounded-tr-none max-w-[85%]"
                            : "bg-[#131a2c] border border-slate-800 text-slate-200 rounded-tl-none max-w-[90%]"
                        )}
                      >
                        {isUser ? (
                          <div className="whitespace-pre-wrap">{msg.content}</div>
                        ) : (
                          <div className="space-y-1.5">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: formatMarkdown(msg.content),
                              }}
                            />
                            {/* Real-time streaming typing cursor */}
                            {isMessageCurrentlyStreaming && (
                              <span className="inline-block w-1.5 h-3.5 bg-[#4A3AFF] ml-0.5 rounded-xs animate-pulse align-middle" />
                            )}
                          </div>
                        )}

                        {!isUser && !isMessageCurrentlyStreaming && msg.content && (
                          <div className="mt-2 pt-1.5 border-t border-slate-800/80 flex items-center justify-end">
                            <button
                              onClick={() => handleCopy(msg.content, index)}
                              className="text-[11px] text-slate-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
                            >
                              {copiedIndex === index ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  <span className="text-emerald-400">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input Footer Area */}
          <div className="p-3 bg-[#0e1424] border-t border-slate-800/90">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2 bg-[#141b2f] border border-slate-700/70 rounded-full px-3.5 py-1.5 focus-within:border-[#4A3AFF] focus-within:ring-2 focus-within:ring-[#4A3AFF]/30 transition-all"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about courses, lessons, code..."
                disabled={isStreaming}
                className="flex-1 bg-transparent text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={!inputValue.trim() || isStreaming}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-[#4A3AFF] hover:bg-[#3D2FE6] active:scale-95 text-white shadow-md shadow-indigo-500/25 disabled:opacity-40 disabled:hover:bg-[#4A3AFF] transition-all duration-200"
              >
                <Send className="w-3.5 h-3.5 fill-white text-white" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
