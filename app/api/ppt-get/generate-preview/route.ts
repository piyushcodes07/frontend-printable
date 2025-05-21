import { NextApiRequest, NextApiResponse } from "next"; // Typically for Next.js pages/app router, but using Request/Response for broader compatibility
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";

// --- Schemas for individual slide type parameters ---
const slideForIntroductionParams = z.object({
  title: z.string().describe("Main heading of the slide"),
  overview: z.string().describe("Sub-heading or overview text"),
  description: z.string().describe("Body copy/description below the overview"),
  bullets: z.array(z.string()).describe("List of bullet-point items"),
});

const slideConflictOverviewParams = z.object({
  title: z.string().describe("Main heading of the slide"),
  sections: z
    .array(
      z.object({
        iconSrc: z
          .string()
          .describe(
            "URL of the section icon. Generate a relevant placeholder if specific icon not known. E.g., 'placeholder_icon_cause.png', 'placeholder_icon_event.png'.",
          ),
        heading: z.string().describe("Section title"),
        contents: z
          .array(z.string())
          .describe("Array of paragraph or bullet texts for this section"),
      }),
    )
    .min(1)
    .max(4)
    .describe(
      "List of sections to display on the slide. Generate 3 to 4 sections.",
    ),
});

const slideCircularProcesssParams = z.object({
  title: z.string().describe("Main heading of the slide"),
  steps: z
    .array(
      z.object({
        heading: z.string().describe("Step title or strategy name"),
        description: z.string().describe("Detail or explanation of this step"),
      }),
    )
    .min(1)
    .max(8)
    .describe(
      "Ordered list of steps to display around the circle, numbered by their index. Min 1, Max 8 steps.",
    ),
});

// --- Schema for a single generated slide (AI chooses one of these) ---
const individualGeneratedSlideSchema = z.discriminatedUnion("slideType", [
  z
    .object({
      slideType: z.literal("SlideForIntroduction"),
      originalRequestIndex: z
        .number()
        .describe(
          "The 0-based index of the original slide request this corresponds to.",
        ),
      arguments: slideForIntroductionParams,
    })
    .describe(
      "Use for introductory or concluding slides. Good for text-heavy summaries, setting the stage, or a final takeaway message.",
    ),
  z
    .object({
      slideType: z.literal("SlideConflictOverview"),
      originalRequestIndex: z
        .number()
        .describe(
          "The 0-based index of the original slide request this corresponds to.",
        ),
      arguments: slideConflictOverviewParams,
    })
    .describe(
      "Ideal for presenting information in distinct categorized sections (e.g., Causes, Key Events, Outcomes; Problem, Solution, Benefits; Features A, B, C). Generate 3 to 4 sections. Choose this if the bullet points can be logically grouped into a few themes.",
    ),
  z
    .object({
      slideType: z.literal("SlideCircularProcesss"),
      originalRequestIndex: z
        .number()
        .describe(
          "The 0-based index of the original slide request this corresponds to.",
        ),
      arguments: slideCircularProcesssParams,
    })
    .describe(
      "Best for illustrating cyclical processes, iterative steps, feedback loops, or interconnected strategies where order and flow are important. Min 1, Max 8 steps. Choose if bullet points represent sequential or related stages.",
    ),
]);

// --- Schema for the overall AI output (an array of generated slides) ---
const allGeneratedSlidesSchema = z.object({
  generatedSlides: z
    .array(individualGeneratedSlideSchema)
    .describe(
      "An array of generated slide objects, one for each input slide request. The order of objects in this array MUST match the order of the input slide requests. Strive for variety in slideType choices across the array to create an engaging presentation.",
    ),
});

export async function POST(request: Request) {
  const body = await request.json();
  if (!body.slides || !Array.isArray(body.slides) || body.slides.length === 0) {
    return Response.json(
      { error: "Missing or empty slides array in request body" },
      { status: 400 },
    );
  }

  const slideRequests = body.slides.map(
    (slideInfo: { title: string; bulletPoints: string[] }, index: number) => ({
      index,
      title: slideInfo.title,
      bulletPoints: slideInfo.bulletPoints,
    }),
  );

  const prompt = `You are an expert slide deck generation assistant. Your primary goal is to create a varied, engaging, and informative presentation based on the provided slide requests.
  You will be given an array of 'slideRequests', each containing an 'index', a 'title', and 'bulletPoints'.
  For each request in the input array, you must perform the following steps:
  1. Carefully analyze the 'title' and 'bulletPoints' to understand the core message and structure of the information.
  2. Choose the MOST appropriate slide type from the available options: "SlideForIntroduction", "SlideConflictOverview", or "SlideCircularProcesss". Refer to their detailed descriptions in the output schema to make an informed decision.
     - If choosing "SlideConflictOverview", you **MUST** generate exactly 3 or 4 sections. Carefully group the input 'bulletPoints' into 3 or 4 logical categories to form these sections. Do not generate fewer than 3 or more than 4 sections for this slide type.
     - If choosing "SlideCircularProcesss", you **MUST** generate between 1 and 8 steps, inclusive.
  3. **Crucially, as you select a slide type for the current request, consider the slide types you have (notionally) selected for the *preceding* requests in this batch. Your objective is to achieve a balanced and diverse set of slide layouts throughout the entire deck. This variety is key to maintaining audience engagement.**
  4. If the content for multiple consecutive slides seems similar in nature, actively try to vary the slide type if different types can still effectively represent the information. Avoid defaulting to the same slide type repeatedly unless the content for several distinct slides overwhelmingly dictates that specific format. For instance, if three slides in a row could technically use 'SlideForIntroduction', consider if one could be 'SlideConflictOverview' if its points can be grouped into 3-4 themes, or if a different framing would allow another type.
  5. Based on the chosen slide type, generate the specific content (arguments) by intelligently interpreting the 'title' and 'bulletPoints'. Ensure all required fields for that slide type are populated and adhere strictly to all constraints specified in the schema (like the section count for SlideConflictOverview or step count for SlideCircularProcesss).
  6. Populate the 'originalRequestIndex' field in your output object with the 'index' from the corresponding input slide request. This is vital for maintaining order.
  7. The final 'generatedSlides' array in your output must contain one object for each input slide request, and these objects MUST be in the same sequential order as the input requests.

  Input slide requests to process:
  ${JSON.stringify(slideRequests, null, 2)}

  Think of yourself as designing a cohesive presentation. A good presentation uses a mix of layouts to tell a story and keep the audience interested. Before finalizing your full list of 'generatedSlides', mentally review your choices. If you notice a lack of variety or an over-reliance on one slide type, or if any generated slide type violates its specific constraints (like section count), please re-evaluate and correct your output to enhance the overall presentation quality and schema compliance.

  Generate the slide data strictly according to the 'allGeneratedSlidesSchema'.
  Pay close attention to all constraints defined in the schema for each slide type (e.g., number of sections for SlideConflictOverview, number of steps for SlideCircularProcesss).
  For 'iconSrc' in 'SlideConflictOverview', provide descriptive placeholders like 'icon_history.svg' or 'icon_breed.svg' as you did in the error example, if specific icons aren't implied by the content.
  `;

  try {
    const { object: aiOutput } = await generateObject({
      model: google("gemini-1.5-flash-8b"),
      schema: allGeneratedSlidesSchema,
      prompt: prompt,
    });

    const sortedGeneratedSlides = aiOutput.generatedSlides.sort(
      (a, b) => a.originalRequestIndex - b.originalRequestIndex,
    );

    // Transform the AI's output into the desired API response format
    const responseSlides = sortedGeneratedSlides.map((genSlide) => {
      return {
        type: genSlide.slideType,
        content: genSlide.arguments,
      };
    });

    return Response.json({ slides: responseSlides });
  } catch (error) {
    console.error("Error generating slides:", error);
    // Return a generic error response
    return Response.json(
      { error: "Failed to generate slides." },
      { status: 500 },
    );
  }
}
