import React from "react";
import { z } from "zod";
import { tool } from "ai";

export const SlideConflictOvervieww = tool({
  description:
    "Generate a slide with a full-width header image, a main title, and a flexible grid of informational sections (each with an icon, subheading, and content). Ideal for historical or thematic overviews divided into Causes, Key Events, Outcomes, etc., with customizable color theming.",
  parameters: z.object({
    imageSrc: z.string().describe("URL of the main slide image"),
    title: z.string().describe("Main heading of the slide"),
    sections: z
      .array(
        z.object({
          iconSrc: z.string().describe("URL of the section icon"),
          heading: z.string().describe("Section title"),
          contents: z
            .array(z.string())
            .describe("Array of paragraph or bullet texts for this section"),
        }),
      )
      .describe("List of sections to display on the slide"),
  }),
});

export const SlideTemplateSchema = SlideConflictOvervieww.parameters;

type Section = z.infer<typeof SlideTemplateSchema>["sections"][number];
type SlideTemplateProps = z.infer<typeof SlideTemplateSchema>;

interface StyleProps {
  backgroundColor?: string;
  headingColor?: string;
  subHeadingColor?: string;
  bulletColor?: string;
}

type Props = SlideTemplateProps & StyleProps;

export const SlideConflictOverview: React.FC<Props> = ({
  imageSrc,
  title,
  sections,
  backgroundColor = "#f5f0e6",
  headingColor = "#1f433e",
  subHeadingColor = "#1f433e",
  bulletColor = "#1f433e",
}) => {
  return (
    <div
      style={{
        fontFamily: "sans-serif",
        color: headingColor,
        backgroundColor,
        padding: "1rem",
      }}
    >
      {/* Header Image */}
      <div style={{ width: "100%", height: "250px", overflow: "hidden" }}>
        <img
          src={imageSrc}
          alt={title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Title */}
      <h1 style={{ fontSize: "2rem", margin: "1rem 0", color: headingColor }}>
        {title}
      </h1>

      {/* Sections Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${sections.length}, 1fr)`,
          gap: "2rem",
        }}
      >
        {sections.map((sec, idx) => (
          <div key={idx}>
            <img
              src={sec.iconSrc}
              alt={`${sec.heading} icon`}
              style={{ width: "24px", height: "24px", marginBottom: "0.5rem" }}
            />
            <h2
              style={{
                fontSize: "1.25rem",
                margin: "0.5rem 0",
                color: subHeadingColor,
              }}
            >
              {sec.heading}
            </h2>
            <div style={{ fontSize: "1rem", lineHeight: "1.5" }}>
              {sec.contents.map((line, i) => (
                <p key={i} style={{ margin: "0.5rem 0", color: bulletColor }}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
