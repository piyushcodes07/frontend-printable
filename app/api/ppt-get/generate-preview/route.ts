import { NextApiRequest, NextApiResponse } from "next";
import { generateText, generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { tool } from "ai";
import { z } from "zod";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const body = await request.json();
  const slides = await Promise.all(
    body.slides.map(async (slideInfo) => {
      const result = await generateText({
        prompt: `Generate slide for title "${slideInfo.title}" and points ${JSON.stringify(slideInfo.bulletPoints)}`,
        model: google("gemini-1.5-flash"),
        tools: {
          SlideForIntroduction: tool({
            description:
              "Generate a Slide component with image, headings, bullets, author info and minimal custom styling used for introcution",
            parameters: z.object({
              imageSrc: z.string().describe("URL of the main slide image"),
              title: z.string().describe("Main heading of the slide"),
              overview: z.string().describe("Sub-heading or overview text"),
              description: z
                .string()
                .describe("Body copy/description below the overview"),
              bullets: z
                .array(z.string())
                .describe("List of bullet-point items"),
            }),
            execute: async (props) => {
              // Just echo back to feed into <Slide {...props} />
              return { ...props };
            },
          }),
        },
        toolChoice: "required",
      });
      const call = result.toolCalls[0];
      const resEntry = result.toolResults.find((r) => r.callId === call.id);
      return { type: call.toolName, content: resEntry?.result };
    }),
  );

  return Response.json({ slides });
}
