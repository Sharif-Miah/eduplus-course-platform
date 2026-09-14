export const dynamic = "force-dynamic";

// Helper: stream text word-by-word from a plain string
function streamText(text) {
  const encoder = new TextEncoder();
  return new ReadableStream({
    async start(controller) {
      const words = text.split(" ");
      for (let i = 0; i < words.length; i++) {
        controller.enqueue(
          encoder.encode(words[i] + (i === words.length - 1 ? "" : " "))
        );
        await new Promise((r) => setTimeout(r, 18));
      }
      controller.close();
    },
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { messages = [], courseContext = {} } = body;

    if (!messages || messages.length === 0) {
      return new Response("No messages provided", { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY?.trim();

    // ── Fallback: no API key configured ──────────────────────────────────
    if (!apiKey || apiKey === "your_openai_api_key_here") {
      const lastUserMsg =
        messages[messages.length - 1]?.content?.toLowerCase() || "";
      let fallbackText = "";

      if (lastUserMsg.includes("certificate")) {
        fallbackText =
          "🎓 **EduPlus Certificate Help:**\nTo unlock and download your course certificate, you must complete **100% of the lessons** in the course. Each video lesson unlocks sequentially. Once all lessons are done, the **Download Certificate** button will be enabled!";
      } else if (
        lastUserMsg.includes("unlock") ||
        lastUserMsg.includes("lesson")
      ) {
        fallbackText =
          "🔓 **Sequential Lesson Progression:**\nLessons in EduPlus unlock one after another. When you finish watching the current lesson or click *Complete & Unlock Next Lesson*, the next lesson automatically unlocks!";
      } else if (lastUserMsg.includes("python")) {
        fallbackText =
          "🐍 **Python Learning Support:**\nPython is a versatile programming language! In EduPlus's Python Masterclass, you learn variables, data types, loops, functions, OOP, and practical exercises.";
      } else {
        fallbackText =
          "Hello! I am your **EduPlus Course Assistant**.\n\nTo activate full AI assistance, please add your **OpenAI API Key** in the Vercel project environment variables.\n\nFeel free to ask me anything about EduPlus courses, certificates, or lessons!";
      }

      return new Response(streamText(fallbackText), {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-cache, no-transform",
        },
      });
    }

    // ── Build OpenAI request ──────────────────────────────────────────────
    const contextInfo = courseContext.courseTitle
      ? `\n\nCurrent context: The student is studying the course "${courseContext.courseTitle}"${courseContext.lessonTitle ? `, specifically the lesson "${courseContext.lessonTitle}"` : ""}. Tailor your responses to help with this specific topic.`
      : "";

    const systemPrompt = `You are EduPlus AI, an intelligent, inspiring, and friendly learning assistant for the EduPlus online education platform (founded by Sharif Miah).
Your mission is to:
1. Help students understand programming, web development, data structures, and course topics clearly with concise, practical code examples.
2. Guide users on EduPlus platform features: courses, quizzes, sequential lesson video watching, and getting verified certificates upon 100% completion.
3. Be friendly, polite, encouraging, and format your responses with clean Markdown (bold text, bullet points, and code blocks).
4. If asked who you are, introduce yourself as the EduPlus AI Assistant.${contextInfo}`;

    const openaiMessages = [
      { role: "system", content: systemPrompt },
      ...messages.map((m) => ({
        role: m.role === "assistant" || m.role === "model" ? "assistant" : "user",
        content: m.content || "",
      })),
    ];

    // ── Call OpenAI API ───────────────────────────────────────────────────
    let responseText = null;
    let lastError = "";

    const modelsToTry = ["gpt-4o-mini", "gpt-3.5-turbo", "gpt-4o"];

    for (const model of modelsToTry) {
      try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model,
            messages: openaiMessages,
            temperature: 0.7,
            max_tokens: 1200,
          }),
        });

        const data = await res.json();

        if (res.ok) {
          const text = data?.choices?.[0]?.message?.content || "";
          if (text) {
            responseText = text;
            console.log(`✅ AI responded using OpenAI model: ${model}`);
            break;
          }
        } else {
          lastError = `${model}: ${res.status} - ${data?.error?.message || "unknown"}`;
          console.warn(`OpenAI model ${model} failed: ${lastError}`);
          // If it's an auth error, no point trying other models
          if (res.status === 401) break;
        }
      } catch (err) {
        lastError = `${model}: ${err.message}`;
        console.warn(`Failed to connect to OpenAI model ${model}:`, err.message);
      }
    }

    // ── All models failed: stream graceful error ───────────────────────────
    if (!responseText) {
      console.error("All OpenAI models failed. Last error:", lastError);
      const errorMsg =
        "⚠️ **AI Service Temporarily Unavailable**\n\nI'm having trouble connecting to the AI service right now. This could be due to:\n- An invalid or expired API key\n- API quota limits reached\n- Network connectivity issues\n\nPlease try again in a moment, or contact the platform administrator.";
      return new Response(streamText(errorMsg), {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-cache, no-transform",
        },
      });
    }

    // ── Stream the response word-by-word ──────────────────────────────────
    return new Response(streamText(responseText), {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
      },
    });
  } catch (err) {
    console.error("AI Chat Route Error:", err);
    return new Response(`⚠️ Server Error: ${err.message}`, {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
