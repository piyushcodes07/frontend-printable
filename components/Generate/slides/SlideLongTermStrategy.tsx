import React from "react";
import { tool } from "ai";
import { z } from "zod";

export const SlideLongTermStrategyTool = tool({
  description:
    "Create a quadrant-style 'Long-Term Strategy' slide with four strategies including headings, descriptions, and center-aligned numbers.",
  parameters: z.object({
    title: z.string().describe("Slide title"),
    quadrants: z
      .array(
        z.object({
          id: z.number().describe("Number to show inside the quadrant (1–4)"),
          heading: z.string().describe("Heading text for the quadrant"),
          description: z.string().describe("Description text for the quadrant"),
        })
      )
      .length(4)
      .describe("Four quadrant strategies for long-term growth"),
  }),
});

type SlideProps = z.infer<typeof SlideLongTermStrategyTool.parameters>;
type sudoSlideProps = SlideProps & {
  backgroundColor?: string;
  headingColor?: string;
  subHeadingColor?: string;
  bulletColor?: string;
};

export const SlideLongTermStrategy: React.FC<sudoSlideProps> = ({
  title,
  quadrants,
  backgroundColor = "#fffbe6",
  headingColor = "#0f172a",
  subHeadingColor = "#334155",
  bulletColor = "#2563eb",
}) => {
  return (
    <div
      className="flex flex-col items-center px-10 py-8 rounded-xl"
      style={{
        height: "450px",
        width: "1000px",
        maxWidth: "1050px",
        margin: "0 auto",
        backgroundColor,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, ${bulletColor} 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col">
        <h1
          className="text-3xl font-bold text-center mb-12"
          style={{ color: headingColor }}
        >
          {title}
        </h1>

        <div className="grid grid-cols-2 gap-x-12 gap-y-8 flex-1 px-4">
          {quadrants.map((q) => (
            <div
              key={q.id}
              className="flex items-start space-x-6 p-6 rounded-lg hover:bg-white/50 transition-colors duration-300"
              style={{
                backdropFilter: "blur(8px)",
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-transform hover:scale-110 duration-300"
                style={{
                  backgroundColor: bulletColor,
                  boxShadow: `0 4px 12px ${bulletColor}40`,
                }}
              >
                <span className="text-xl font-bold text-white">{q.id}</span>
              </div>

              <div className="flex-1">
                <h2
                  className="text-xl font-semibold mb-2 leading-tight"
                  style={{ color: headingColor }}
                >
                  {q.heading}
                </h2>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: subHeadingColor }}
                >
                  {q.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlideLongTermStrategy;
