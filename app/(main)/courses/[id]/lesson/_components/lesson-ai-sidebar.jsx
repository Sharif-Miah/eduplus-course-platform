"use client";

import React, { useState, useRef, useEffect } from "react";
import { Brain, MessageSquare, Send, Sparkles, RefreshCw, Check, Copy, ChevronRight, ChevronLeft, Bot } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

// Format markdown into clean HTML
function formatMarkdown(text) {
  if (!text) return "";

  let escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  escaped = escaped.replace(
    /```([\s\S]*?)```/g,
    '<pre class="my-2 p-2.5 bg-slate-100 dark:bg-[#0a0e1a] border border-slate-200 dark:border-indigo-500/30 rounded-xl text-xs font-mono overflow-x-auto text-indigo-950 dark:text-indigo-200"><code>$1</code></pre>'
  );

  escaped = escaped.replace(
    /`([^`]+)`/g,
    '<code class="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 rounded text-xs font-mono text-indigo-600 dark:text-indigo-300">$1</code>'
  );

  escaped = escaped.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-slate-900 dark:text-white">$1</strong>');
  escaped = escaped.replace(/^[*-]\s+(.+)$/gm, '<li class="ml-4 list-disc text-slate-700 dark:text-slate-300">$1</li>');
  escaped = escaped.replace(/\n/g, "<br/>");

  return escaped;
}

export function LessonAiSidebar({ courseTitle = "Course", className = "" }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const searchParams = useSearchParams();
  const currentLessonSlug = searchParams?.get("name") || "";

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isStreaming]);

  const quickPills = [
    { label: "Clarify core concepts", prompt: `Explain the key fundamental concepts of ${currentLessonSlug || "this lesson"} in ${courseTitle}.` },
    { label: "Synthesize summary", prompt: `Provide a concise 3-bullet point summary of ${currentLessonSlug || "this lesson"}.` },
    { label: "Implementation details", prompt: `Show practical code and best practices for ${currentLessonSlug || "this lesson"}.` },
  ];

  const handleSend = async (customPrompt) => {
    const textToSend = typeof customPrompt === "string" ? customPrompt : inputValue;
    if (!textToSend.trim() || isLoading || isStreaming) return;

    const userMessage = { role: "user", content: textToSend.trim() };
    const updatedMessages = [...messages, userMessage];

    setMessages([...updatedMessages, { role: "assistant", content: "" }]);
    setInputValue("");
    setIsLoading(true);
    setIsStreaming(true);

    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          context: {
            courseTitle,
            currentLesson: currentLessonSlug,
          },
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok || !response.body) {
        throw new Error(`Server returned ${response.status}`);
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

        if (!firstChunkReceived) {
          firstChunkReceived = true;
          setIsLoading(false);
        }

        setMessages((prev) => {
          const next = [...prev];
          const lastIdx = next.length - 1;
          if (lastIdx >= 0 && next[lastIdx].role === "assistant") {
            next[lastIdx] = {
              ...next[lastIdx],
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
        console.error("AI chat error:", err);
        setMessages((prev) => {
          const next = [...prev];
          const lastIdx = next.length - 1;
          if (lastIdx >= 0 && next[lastIdx].role === "assistant") {
            next[lastIdx] = {
              ...next[lastIdx],
              content:
                next[lastIdx].content ||
                "Sorry, I encountered an issue generating an answer. Please check your Gemini API key in `.env` and try again.",
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

  const handleClear = () => {
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

  // If collapsed, show a slim vertical expand toggle bar
  if (isCollapsed) {
    return (
      <div className="hidden xl:flex flex-col items-center justify-start py-4 w-11 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d121f] text-slate-500 dark:text-slate-400 sticky top-[133px] h-[calc(100vh-170px)] min-h-[620px] max-h-[820px] rounded-r-3xl flex-shrink-0 transition-colors duration-200">
        <button
          onClick={() => setIsCollapsed(false)}
          title="Expand AI Assistant Panel"
          className="p-2 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 rounded-xl transition flex flex-col items-center gap-4"
        >
          <ChevronLeft className="w-4 h-4 text-[#4A3AFF] dark:text-indigo-400" />
          <div className="[writing-mode:vertical-lr] text-xs font-bold tracking-widest uppercase text-slate-600 dark:text-slate-300 flex items-center gap-2">
            <span>ASK AI</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
          </div>
        </button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "hidden xl:flex flex-col w-[360px] xl:w-[395px] 2xl:w-[420px] flex-shrink-0 rounded-3xl border border-slate-200/80 dark:border-slate-800/90 bg-white dark:bg-[#0c101d] shadow-lg dark:shadow-2xl sticky top-[133px] h-[calc(100vh-170px)] min-h-[620px] max-h-[820px] overflow-hidden transition-colors duration-200",
        className
      )}
    >
      {/* 1. Header (Matching Reference Image 2: ASK AI + ACTIVE badge) */}
      <div className="flex items-center justify-between px-4 py-3.5 bg-slate-50/80 dark:bg-[#0d1322] border-b border-slate-200/80 dark:border-slate-800/90 transition-colors duration-200">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-tr from-[#4A3AFF] to-[#6366f1] text-white shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-xs font-black tracking-wider text-slate-900 dark:text-white uppercase">
                ASK AI
              </span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
            </div>
            <span className="text-[9px] font-semibold text-slate-500 dark:text-slate-400 tracking-widest uppercase">
              EDUPLUS AI TUTOR
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* Active status indicator badge (as in Image 3) */}
          <span className="inline-flex items-center gap-1 text-[9.5px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 dark:border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            <span>ACTIVE</span>
          </span>

          {messages.length > 0 && (
            <button
              onClick={handleClear}
              title="Clear Chat"
              className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60 rounded-md transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Collapse button */}
          <button
            onClick={() => setIsCollapsed(true)}
            title="Collapse AI Panel"
            className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60 rounded-md transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Messages & Knowledge Synthesis View */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-800 bg-white dark:bg-[#0c101d] transition-colors duration-200">
        {messages.length === 0 ? (
          /* Initial State matching 3rd image (Knowledge Synthesis) */
          <div className="flex flex-col items-center justify-center h-full text-center px-2 py-4">
            {/* Center Speech Bubble Icon inside subtle circle */}
            <div className="w-13 h-13 rounded-full bg-indigo-50/80 dark:bg-[#131b2e] border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(74,58,255,0.15)]">
              <MessageSquare className="w-6 h-6 text-[#4A3AFF] dark:text-indigo-400" />
            </div>

            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5 tracking-tight">
              Knowledge Synthesis
            </h3>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-5 leading-relaxed max-w-[240px]">
              Ask questions to clarify concepts, synthesize summaries, or explore lesson code.
            </p>

            {/* Quick Action Chips (as in 3rd image) */}
            <div className="w-full space-y-1.5">
              {quickPills.map((pill, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(pill.prompt)}
                  className="w-full text-left px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#131929] hover:bg-indigo-50/70 dark:hover:bg-[#1a233b] border border-slate-200/80 dark:border-slate-800/90 hover:border-[#4A3AFF]/50 text-[11px] text-slate-700 dark:text-slate-300 hover:text-[#4A3AFF] dark:hover:text-white transition-all duration-150 truncate block cursor-pointer"
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Active Chat Stream */
          <div className="space-y-3">
            {messages.map((msg, index) => {
              const isUser = msg.role === "user";
              const isLastAssistant = !isUser && index === messages.length - 1;
              const isCurrentStreaming = isLastAssistant && isStreaming;

              if (!isUser && !msg.content && isLoading) {
                return (
                  <div key={index} className="flex items-start">
                    <div className="bg-slate-100 dark:bg-[#131a2c] border border-slate-200 dark:border-slate-800 rounded-2xl rounded-tl-none px-3 py-2 flex items-center gap-1.5">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4A3AFF] animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4A3AFF] animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4A3AFF] animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium ml-1">
                        Analyzing lesson...
                      </span>
                    </div>
                  </div>
                );
              }

              if (!isUser && !msg.content) return null;

              return (
                <div
                  key={index}
                  className={cn("flex flex-col group", isUser ? "items-end" : "items-start")}
                >
                  <div
                    className={cn(
                      "text-xs px-3.5 py-2 leading-relaxed rounded-2xl shadow-xs max-w-[92%]",
                      isUser
                        ? "bg-gradient-to-r from-[#4A3AFF] to-[#6366f1] text-white rounded-tr-none"
                        : "bg-slate-100 dark:bg-[#131a2c] border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none"
                    )}
                  >
                    {isUser ? (
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                    ) : (
                      <div className="space-y-1">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: formatMarkdown(msg.content),
                          }}
                        />
                        {isCurrentStreaming && (
                          <span className="inline-block w-1.5 h-3 bg-[#4A3AFF] ml-0.5 rounded-xs animate-pulse align-middle" />
                        )}
                      </div>
                    )}

                    {!isUser && !isCurrentStreaming && msg.content && (
                      <div className="mt-1.5 pt-1 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-end">
                        <button
                          onClick={() => handleCopy(msg.content, index)}
                          className="text-[10px] text-slate-400 hover:text-[#4A3AFF] dark:hover:text-indigo-300 flex items-center gap-1 transition"
                        >
                          {copiedIndex === index ? (
                            <>
                              <Check className="w-2.5 h-2.5 text-emerald-500 dark:text-emerald-400" />
                              <span className="text-emerald-500 dark:text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-2.5 h-2.5" />
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

      {/* 3. Bottom Input Bar (Matching Reference Image 2) */}
      <div className="p-3.5 sm:p-4 bg-slate-50/80 dark:bg-[#0d1322] border-t border-slate-200/80 dark:border-slate-800/90 transition-colors duration-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2 bg-white dark:bg-[#141a2c] border border-slate-200 dark:border-slate-700/70 rounded-full px-3.5 py-2 focus-within:border-[#4A3AFF] focus-within:ring-2 focus-within:ring-[#4A3AFF]/30 shadow-xs transition-all"
        >
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask AI Tutor about this lesson..."
            disabled={isStreaming}
            className="flex-1 bg-transparent text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={!inputValue.trim() || isStreaming}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-[#4A3AFF] hover:bg-[#3D2FE6] active:scale-95 text-white shadow-md shadow-indigo-500/25 disabled:opacity-40 transition-all cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 fill-white text-white" />
          </button>
        </form>
      </div>
    </div>
  );
}
