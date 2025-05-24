import React from "react";
import { tool } from "ai";
import { z } from "zod";

export const TimelineSlideTool = tool({
  description: "Create a vertical timeline slide for various content types",
  parameters: z.object({
    title: z.string().describe("Main presentation title"),
    subtitle: z
      .string()
      .describe("Section subtitle e.g., EDUCATION, WORK EXPERIENCE"),
    items: z.array(
      z.object({
        label: z.string().describe("Left column label (e.g., year, phase)"),
        title: z.string().describe("Main item title"),
        description: z.string().describe("Detailed description"),
      })
    )
  }),
});

type TimelineSlideProps = z.infer<typeof TimelineSlideTool.parameters> & {
  titleColor?: string;
  subtitleColor?: string;
  labelColor?: string;
  titleSize?: string;
  spacing?: string;
};

export const TimelineSlide: React.FC<TimelineSlideProps> = ({
  title,
  subtitle,
  items,
  titleColor = "#0f172a", // matched with SlideLongTermStrategy headingColor
  subtitleColor = "#334155", // matched with SlideLongTermStrategy subHeadingColor
  labelColor = "#2563eb", // matched with SlideLongTermStrategy bulletColor
  titleSize = "text-6xl",
  spacing = "space-y-6",
}) => {
  return (
    <div 
      className="flex flex-col h-[450px] w-[1000px] rounded-2xl shadow-2xl p-10"
      style={{
        backgroundColor: "#fffbe6", // matched with SlideLongTermStrategy backgroundColor
      }}
    >

      {/* Header Section */}
      <div className="mb-12">
        <p 
          className="text-sm mb-1"
          style={{ color: subtitleColor }}
        >
          {subtitle}
        </p>
        <h1
          className={`${titleSize} font-extrabold tracking-tight`}
          style={{ color: titleColor }}
        >
          {title}
        </h1>
      </div>

      {/* Content Area */}
      <div
        className={`flex-1 flex gap-6 justify-between items-start ${spacing}`}
      >
        {items.map((item, index) => (
          <div key={index} className="w-1/3">
            <p
              className="text-sm font-semibold mb-1"
              style={{ color: labelColor }}
            >
              {item.label}
            </p>
            <p 
              className="text-sm leading-relaxed"
              style={{ color: subtitleColor }} // Changed from text-gray-300 to match subHeadingColor
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineSlide;
