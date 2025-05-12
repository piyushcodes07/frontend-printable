import { tool } from "ai";
import { z } from "zod";

const slideTool = {
  SlideForIntroduction: tool({
    description:
      "Generate a Slide component with image, headings, bullets, author info and minimal custom styling used for introcution",
    parameters: z.object({
      imageSrc: z.string().url().describe("URL of the main slide image"),
      title: z.string().describe("Main heading of the slide"),
      overview: z.string().describe("Sub-heading or overview text"),
      description: z
        .string()
        .describe("Body copy/description below the overview"),
      bullets: z.array(z.string()).describe("List of bullet-point items"),
    }),
    execute: async (props) => {
      // Just echo back to feed into <Slide {...props} />
      return { ...props };
    },
  }),
};

export default slideTool;
