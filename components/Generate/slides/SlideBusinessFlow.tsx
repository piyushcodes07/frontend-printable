import React from "react";
import { z } from "zod";
import { tool } from "ai";

export const SlideFlow = tool({
  description:
    "Generate a horizontal business process flow slide with circular icons, headings, and descriptions for each stage like Business, Process, Target, Growth, Profit.",
  parameters: z.object({
    title: z.string().describe("Title of the slide"),
    steps: z
      .array(
        z.object({
          iconSrc: z.string().describe("URL of the icon"),
          heading: z.string().describe("Step title"),
          description: z.string().describe("Step description"),
          color: z
            .string()
            .optional()
            .describe("Hex color used for this step's icon and title"),
        })
      )
      .describe("Array of business flow steps"),
  }),
});

export const SlideFlowSchema = SlideFlow.parameters;

type Props = z.infer<typeof SlideFlowSchema>;
type sudoProps = Props & {
  backgroundColor: string;
  headingColor: string;
  subHeadingColor: string;
};

export const SlideBusinessFlow: React.FC<sudoProps> = ({
  title,
  steps,
  backgroundColor = "#f5f0e6",
  headingColor = "#1f433e",
  subHeadingColor = "#1f433e",
}) => {
  return (
    <div
      style={{
        height: "450px",
        width: "1000px",
        maxWidth: "1050px",
        margin: "0 auto",
        padding: "2rem 1rem",
        fontFamily: "Arial, sans-serif",
        backgroundColor: backgroundColor,
        color: headingColor,
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "1.75rem",
          marginBottom: "2rem",
          color: headingColor,
        }}
      >
        {title}
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1.5rem",
          flexWrap: "wrap",
        }}
      >
        {steps.map((step, idx) => (
          <div
            key={idx}
            style={{
              flex: "1 1 150px",
              minWidth: "150px",
              maxWidth: "180px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                backgroundColor: headingColor,
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                margin: "0 auto 1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={step.iconSrc}
                alt={step.heading}
                style={{ width: "28px", height: "28px" }}
              />
            </div>
            <h3
              style={{
                color: headingColor,
                marginBottom: "0.5rem",
                fontSize: "1.1rem",
              }}
            >
              {step.heading}
            </h3>
            <p style={{ fontSize: "0.9rem", color: subHeadingColor ?? "#555" }}>
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlideBusinessFlow;
