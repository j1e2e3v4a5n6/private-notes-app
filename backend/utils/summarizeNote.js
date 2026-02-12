import fetch from "node-fetch";

export const summarizeNote = async (text) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Summarize the following note in 3-5 short bullet points. Only use the information from the note:\n\n${text}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.log("Gemini API failed, using fallback.");
      return generateFallbackSummary(text);
    }

    const summary =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    return summary || generateFallbackSummary(text);

  } catch (error) {
    console.log("Gemini error, using fallback.");
    return generateFallbackSummary(text);
  }
};

const generateFallbackSummary = (text) => {
  const sentences = text.split(".").filter(Boolean);

  return sentences
    .slice(0, 3)
    .map((s) => `• ${s.trim()}`)
    .join("\n");
};
