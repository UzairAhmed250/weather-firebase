import 'dotenv/config';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.REACT_APP_GROQ_API_KEY });

async function getGroqChatCompletion() {
  return groq.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: 'Explain the importance of fast language models in one short paragraph.',
      },
    ],
    model: 'openai/gpt-oss-20b',
    max_tokens: 200,
  });
}

async function main() {
  if (!process.env.REACT_APP_GROQ_API_KEY) {
    console.error('Missing GROQ_API_KEY in .env');
    process.exit(1);
  }

  const chatCompletion = await getGroqChatCompletion();
  console.log(chatCompletion.choices[0]?.message?.content || '');
}

main().catch(console.error);
