import React from "react";
import { tool } from "ai";
import { z } from "zod";

export const SlideScaleOperationsTool = tool({
  description:
    "Create a quadrant-style 'Scale Your Operations' slide with four strategies including headings, descriptions, and center-aligned numbers.",
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
      .describe("Four quadrant strategies to scale operations"),
  }),
});

type SlideProps = z.infer<typeof SlideScaleOperationsTool.parameters>;
type sudoSlideProps = SlideProps & {
  backgroundColor: string;
  headingColor: string;
  subHeadingColor: string;
  bulletColor: string;
};

export const SlideScaleOperations: React.FC<sudoSlideProps> = ({
  title,
  quadrants,
  backgroundColor = "#f5f0e6",
  headingColor = "#1f433e",
  subHeadingColor = "#1f433e",
  bulletColor = "#1f433e",
}) => {
  return (
    <div
      className="flex flex-col items-center gap-6 px-8 py-12 rounded-xl shadow-lg" // reduced gap and padding
      style={{
        height: "450px",
        width: "1000px",
        maxWidth: "1050px",
        margin: "0 auto",
        backgroundColor: backgroundColor,
        color: headingColor,
      }}
    >
      <h1 className="text-3xl font-semibold mb-4">{title}</h1> {/* reduced size and added margin */}

      <div className="grid grid-cols-3 gap-6 max-w-4xl"> {/* reduced gap and max-width */}
        {/* Left top */}
        <div className="flex flex-col justify-center items-end pr-6 text-right">
          <h2
            className="text-lg font-semibold mb-2" // adjusted size and added margin
            style={{ color: headingColor }}
          >
            {quadrants[0].heading}
          </h2>
          <p
            className="text-sm leading-snug"
            style={{ color: subHeadingColor }}
          >
            {quadrants[0].description}
          </p>
        </div>

        {/* Center quadrant numbers */}
        <div className="grid grid-cols-2 grid-rows-2 gap-4 place-items-center">
          {quadrants.map((q) => (
            <div
              key={q.id}
              className="w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold transition-transform hover:scale-110 duration-300" // reduced size, added hover
              style={{
                backgroundColor: bulletColor,
                color: "#ffffff", // changed to white for better contrast
                boxShadow: `0 4px 12px ${bulletColor}40`,
              }}
            >
              {q.id}
            </div>
          ))}
        </div>

        {/* Right top */}
        <div className="flex flex-col justify-center items-start pl-6 text-left">
          {/* Same styling as left top */}
          <h2
            className="text-lg font-semibold mb-2"
            style={{ color: headingColor }}
          >
            {quadrants[1].heading}
          </h2>
          <p
            className="text-sm leading-snug"
            style={{ color: subHeadingColor }}
          >
            {quadrants[1].description}
          </p>
        </div>

        {/* Left bottom */}
        <div className="flex flex-col justify-center items-end pr-6 text-right">
          <h2
            className="text-lg font-semibold mb-2"
            style={{ color: headingColor }}
          >
            {quadrants[2].heading}
          </h2>
          <p
            className="text-sm leading-snug"
            style={{ color: subHeadingColor }}
          >
            {quadrants[2].description}
          </p>
        </div>

        <div className="hidden" /> {/* spacer */}

        {/* Right bottom */}
        <div className="flex flex-col justify-center items-start pl-6 text-left">
          <h2
            className="text-lg font-semibold mb-2"
            style={{ color: headingColor }}
          >
            {quadrants[3].heading}
          </h2>
          <p
            className="text-sm leading-snug"
            style={{ color: subHeadingColor }}
          >
            {quadrants[3].description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SlideScaleOperations;
