import { streamObject } from "ai";
import { z } from "zod";
import { google } from "@ai-sdk/google";

const slideSchema = z.object({
  title: z.string().describe("Title of the slide"),
  bulletPoints: z.array(z.string()).describe("Key bullet points"),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get("topic") || "Artificial Intelligence";
  const language = searchParams.get("language");
  const cards = searchParams.get("cards");
  const { elementStream } = streamObject({
    model: google("gemini-1.5-flash"),
    prompt: `Create an outline for a presentation on "${topic}". Include slide titles and bullet points. Number of slides to generate = ${cards}, language = ${language}`,
    schema: slideSchema,
    output: "array",
  });

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      let id = 1;
      for await (const slide of elementStream) {
        const chunk = encoder.encode(JSON.stringify({ ...slide, id }) + "\n");
        controller.enqueue(chunk);
        id += 1;
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/json",
      "Transfer-Encoding": "chunked",
    },
  });
}
