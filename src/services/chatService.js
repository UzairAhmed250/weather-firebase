const API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const SITE_SYSTEM_PROMPT = `You are Wethr.ai's website assistant.

Help users understand this website, its weather features, account features, and how to use it.
Answer naturally and clearly, like a helpful support assistant.

Site context:
Wethr.ai is a weather website where users can search cities and view current weather, hourly updates, and multi-day forecasts. Users can browse without signing in. Signed-in users can sync search history across devices.

Guidelines:
- Keep answers short, simple, and easy to read.
- Answer the user's exact question instead of listing everything about the site.
- For broad questions, give a short summary first.
- Only mention extra details if they are relevant to the question.
- Do not mention third-party APIs, data providers, or backend services unless the user specifically asks.
- Use plain conversational language. Avoid long bullet dumps unless the user asks for a list.
- Only answer questions about this website, its features, weather data, and how to use it.
- If the user asks something unrelated, politely say you can only help with Wethr.ai.
- If you are unsure about a fact, say you are not certain instead of guessing.
- Do not invent features or pages.`;

export async function sendChatMessage(message) {
  const apiKey = process.env.REACT_APP_GROQ_API_KEY;

  if (!apiKey) {
    throw new Error('Missing GROQ_API_KEY');
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'openai/gpt-oss-20b',
      messages: [
        { role: 'system', content: SITE_SYSTEM_PROMPT },
        { role: 'user', content: message.trim() },
      ],
      max_tokens: 300,
      temperature: 0.7,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error?.message || 'Failed to get a response.');
  }

  return data.choices?.[0]?.message?.content?.trim() || '';
}
