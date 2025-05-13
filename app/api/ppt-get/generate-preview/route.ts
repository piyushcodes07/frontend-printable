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
        prompt: `you are a slide generation agent, Generate slide for title "${slideInfo.title}" and points ${JSON.stringify(slideInfo.bulletPoints)} you have to choose only one slide(tool) from the list of slides(tools) availabel to you. choose the slide with most appropriate formating or structure, suitable to represent the title and points, generate one slide max and stop `,
        maxSteps: 1,
        model: google("gemini-1.5-flash-8b"),
        tools: {
          SlideForIntroduction: tool({
            description: "only use for conclusion",
            parameters: z.object({
              // imageSrc: z.string().describe("URL of the main slide image"),
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
          SlideConflictOverview: tool({
            description:
              "Generate a slide with a full-width header image, a main title, and a flexible grid of informational sections (each with an icon, subheading, and content). Ideal for historical or thematic overviews divided into Causes, Key Events, Outcomes, etc., with customizable color theming. when using this, generate max 4 seactions, and minimum 3 ",
            parameters: z.object({
              // imageSrc: z.string().describe("URL of the main slide image"),
              title: z.string().describe("Main heading of the slide"),
              sections: z
                .array(
                  z.object({
                    iconSrc: z.string().describe("URL of the section icon"),
                    heading: z.string().describe("Section title"),
                    contents: z
                      .array(z.string())
                      .describe(
                        "Array of paragraph or bullet texts for this section",
                      ),
                  }),
                )
                .describe("List of sections to display on the slide"),
            }),
            execute: async (props) => {
              // Just echo back to feed into <Slide {...props} />
              return { ...props };
            },
          }),
          SlideCircularProcesss: tool({
            description:
              "Generate a slide with a title and a numbered circular diagram at its center, surrounded by labeled steps or strategies positioned around the circle. Ideal for illustrating multi-step processes or prevention strategies.",
            parameters: z.object({
              title: z.string().describe("Main heading of the slide"),
              steps: z
                .array(
                  z.object({
                    heading: z.string().describe("Step title or strategy name"),
                    description: z
                      .string()
                      .describe("Detail or explanation of this step"),
                  }),
                )
                .min(1)
                .max(8)
                .describe(
                  "Ordered list of steps to display around the circle, numbered by their index",
                ),
            }),
          }),
        },
        toolChoice: "required",
      });
      const call = result.toolCalls[0];
      console.log("🛠 toolCalls:", result.toolCalls);
      const resEntry = result.toolResults.find((r) => r.callId === call.id);
      return { type: call.toolName, content: resEntry?.result };
    }),
  );

  return Response.json({ slides });
}
