import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  console.log('messages', messages);

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
  });

  try {
    const res = await openai.chat.completions.create({
      // model: 'gpt-3.5-turbo',
      model: 'gpt-4',
      // stream: true,
      // max_tokens: 150,
      // messages: [{ role: 'user', content: messages }],
      messages,
    });

    console.log('res', res);

    // stream: true;がない時
    console.log(
      'res.choices[0].message.content',
      res.choices[0].message.content
    );
    return NextResponse.json(res.choices[0].message.content, { status: 200 });

    // stream: true;
    // const stream = OpenAIStream(res);
    // return new StreamingTextResponse(stream);
  } catch (err) {
    throw err;
  }
}