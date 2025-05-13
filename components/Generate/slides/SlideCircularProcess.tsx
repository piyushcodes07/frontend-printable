import React from "react";
import { z } from "zod";
import { tool } from "ai";

// Tool definition for selecting this circular process/strategy slide layout
export const SlideCircularProcesss = tool({
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
});

export const CircularSlideSchema = SlideCircularProcesss.parameters;

type Step = z.infer<typeof CircularSlideSchema>["steps"][number];
type CircularSlideProps = z.infer<typeof CircularSlideSchema>;

const positionClasses = [
  "absolute top-[10%] left-1/2 -translate-x-1/2 text-center",
  "absolute top-[35%] right-[5%] text-center",
  "absolute top-[65%] right-[5%] text-center",
  "absolute bottom-[10%] left-1/2 -translate-x-1/2 text-center",
  "absolute top-[65%] left-[5%] text-center",
  "absolute top-[35%] left-[5%] text-center",
  "absolute top-[10%] right-1/2 translate-x-1/2 text-center",
  "absolute bottom-[10%] right-1/2 translate-x-1/2 text-center",
];

const CircularSlide: React.FC<CircularSlideProps> = ({ title, steps }) => {
  return (
    <div className="relative w-full h-[450px] font-sans text-gray-100 bg-gray-900 p-4">
      <h1 className="text-2xl mb-4">{title}</h1>
      <div className="relative w-3/5 pb-[60%] mx-auto rounded-full border-8 border-gray-700">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className={positionClasses[idx] || ""}
            style={{ width: "30%" }}
          >
            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-2">
              <span className="text-gray-100">{idx + 1}</span>
            </div>
            <h3 className="text-lg font-semibold mb-1">{step.heading}</h3>
            <p className="text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CircularSlide;
