export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const body = await request.json();
    const { messages = [] } = body;

    if (!messages || messages.length === 0) {
      return new Response("No messages provided", { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY?.trim();

    // If user hasn't added their API key yet, stream an intelligent fallback response
    if (!apiKey || apiKey === "your_gemini_api_key_here") {
      const lastUserMsg = messages[messages.length - 1]?.content?.toLowerCase() || "";
      let fallbackText = "";

      if (lastUserMsg.includes("certificate")) {
        fallbackText = "🎓 **EduPlus Certificate Help:**\nTo unlock and download your course certificate, you must complete **100% of the lessons** in the course. Each video lesson unlocks sequentially. Once all lessons are done, the **Download Certificate** button in the sidebar and completion banner will be enabled!";
      } else if (lastUserMsg.includes("unlock") || lastUserMsg.includes("lesson")) {
        fallbackText = "🔓 **Sequential Lesson Progression:**\nLessons in EduPlus unlock one after another. When you finish watching the current lesson video or click *Complete & Unlock Next Lesson*, the next lesson will automatically unlock!";
      } else if (lastUserMsg.includes("python")) {
        fallbackText = "🐍 **Python Learning Support:**\nPython is a versatile programming language! In EduPlus's Python Masterclass, you learn variables, data types, loops, functions, OOP, and practical real-world exercises.";
      } else {
        fallbackText = "👋 Hello! I am the **EduPlus AI Assistant**.\n\nTo activate full live Gemini AI conversational powers, please add your free **Google Gemini API Key** to your project `.env` file:\n\n```env\nGEMINI_API_KEY=your_actual_gemini_api_key\n```\n\n📌 *You can get a 100% FREE Gemini API Key from Google AI Studio at: [aistudio.google.com](https://aistudio.google.com/)*\n\nFeel free to ask me anything about EduPlus courses, certificates, or lessons!";
      }

      // Stream fallback text word-by-word
      const fallbackStream = new ReadableStream({
        async start(controller) {
          const encoder = new TextEncoder();
          const words = fallbackText.split(" ");
          for (let i = 0; i < words.length; i++) {
            controller.enqueue(encoder.encode(words[i] + (i === words.length - 1 ? "" : " ")));
            await new Promise((r) => setTimeout(r, 25));
          }
          controller.close();
        },
      });

      return new Response(fallbackStream, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-cache, no-transform",
        },
      });
    }

    // Format messages for Gemini API
    const formattedContents = messages.map((m) => ({
      role: m.role === "assistant" || m.role === "model" ? "model" : "user",
      parts: [{ text: m.content || "" }],
    }));

    const systemPrompt = `You are EduPlus AI, an intelligent, inspiring, and friendly learning assistant for the EduPlus online education platform (founded by Sharif Miah).
Your mission is to:
1. Help students understand programming, web development, data structures, and course topics clearly with concise, practical code examples.
2. Guide users on EduPlus platform features: courses, quizzes, sequential lesson video watching, and getting verified certificates upon 100% completion.
3. Be friendly, polite, encouraging, and format your responses with clean Markdown (bold text, bullet points, and code blocks).
4. If asked who you are, introduce yourself as the EduPlus AI Assistant.`;

    const candidateModels = [
      "gemini-3.6-flash",
      "gemini-3.5-flash",
      "gemini-flash-latest",
      "gemini-2.0-flash",
    ];

    let geminiStreamResponse = null;
    let successfulModel = null;

    for (const modelName of candidateModels) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:streamGenerateContent?alt=sse&key=${apiKey}`;
        const res = await fetch(geminiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: formattedContents,
            systemInstruction: {
              parts: [{ text: systemPrompt }],
            },
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 1200,
            },
          }),
        });

        if (res.ok && res.body) {
          geminiStreamResponse = res;
          successfulModel = modelName;
          break;
        } else {
          console.warn(`Model ${modelName} stream error: ${res.status}`);
        }
      } catch (err) {
        console.warn(`Failed to connect to ${modelName}:`, err.message);
      }
    }

    if (!geminiStreamResponse || !geminiStreamResponse.body) {
      return new Response(
        "⚠️ **Gemini API Error:** Could not connect to Gemini streaming service. Please check your API key and network connection.",
        { status: 502, headers: { "Content-Type": "text/plain; charset=utf-8" } }
      );
    }

    // Transform Gemini's raw SSE stream into clean plain-text stream
    const rawReader = geminiStreamResponse.body.getReader();
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();

    const clientStream = new ReadableStream({
      async start(controller) {
        let buffer = "";
        try {
          while (true) {
            const { value, done } = await rawReader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || ""; // Keep any incomplete line in the buffer

            for (const line of lines) {
              const trimmed = line.trim();
              if (trimmed.startsWith("data: ")) {
                const jsonStr = trimmed.slice(6);
                try {
                  const parsed = JSON.parse(jsonStr);
                  const textPart = parsed?.candidates?.[0]?.content?.parts?.[0]?.text;
                  if (textPart) {
                    controller.enqueue(encoder.encode(textPart));
                  }
                } catch (e) {
                  // Ignore partial SSE JSON frames
                }
              }
            }
          }

          // Process remaining buffer if any
          if (buffer.trim().startsWith("data: ")) {
            try {
              const parsed = JSON.parse(buffer.trim().slice(6));
              const textPart = parsed?.candidates?.[0]?.content?.parts?.[0]?.text;
              if (textPart) {
                controller.enqueue(encoder.encode(textPart));
              }
            } catch (e) {}
          }
        } catch (err) {
          console.error("Streaming error while reading from Gemini:", err);
          controller.enqueue(encoder.encode("\n\n⚠️ *Streaming connection interrupted.*"));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(clientStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (err) {
    console.error("AI Chat Route Error:", err);
    return new Response(`⚠️ Error: ${err.message}`, {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
