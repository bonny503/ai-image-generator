import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const response = await openai.images.generate({
      model: "gpt-image-1",
      prompt: prompt,
      size: "1024x1024",
    });

    return Response.json({
      image: response.data[0].url,
    });
  } catch (error) {
    console.log(error);

    return Response.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
}
