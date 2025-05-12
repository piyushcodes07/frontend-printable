import { useFirstPexelsImage } from "@/components/ui/pixelsPhoto";
import { useUser } from "@clerk/nextjs";
import React from "react";

type SlideProps = {
  imageSrc: string;
  title: string;
  overview: string;
  description: string;
  bullets: string[];
  authorName: string;
  lastEdited: string;
  // Styling props
  backgroundColor?: string;
  headingColor?: string;
  subHeadingColor?: string;
  bulletColor?: string;
};

const SlideForIntroduction: React.FC<SlideProps> = ({
  imageSrc,
  title,
  overview,
  description,
  bullets,
  lastEdited,
  authorName = "Piyush",
  backgroundColor = "#f5f0e6", // default beige
  headingColor = "#1f433e", // default dark green
  subHeadingColor = "#1f433e",
  bulletColor = "#1f433e",
}) => {
  const { photo, error, refresh } = useFirstPexelsImage(title, {
    refreshInterval: 0,
  });
  console.log(authorName, "authorName");
  const backgroundStyle = backgroundColor.startsWith("linear-gradient")
    ? { backgroundImage: backgroundColor }
    : { backgroundColor };
  return (
    <div
      className="w-full p-6  flex flex-col md:flex-row items-center"
      style={backgroundStyle}
    >
      {/* Left Image */}
      <div className="w-full md:w-1/2 mb-6 md:mb-0">
        <img
          src={photo?.src.medium}
          alt={title}
          className="w-full h-auto rounded-lg shadow-md"
        />
      </div>

      {/* Right Content */}
      <div className="w-full md:w-1/2 md:pl-8">
        <h1
          className="text-3xl font-semibold mb-4"
          style={{ color: headingColor }}
        >
          {title}
        </h1>
        <p
          className="text-lg font-medium mb-2"
          style={{ color: subHeadingColor }}
        >
          {overview}
        </p>
        <p className="mb-4" style={{ color: subHeadingColor }}>
          {description}
        </p>

        <ul className="list-disc list-inside mb-4">
          {bullets.map((point, idx) => (
            <li key={idx} className="mb-1" style={{ color: bulletColor }}>
              {point}
            </li>
          ))}
        </ul>

        <div className="flex items-center mt-8">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              {/* Placeholder for avatar */}
              <span className="text-xl font-bold text-gray-600"></span>
            </div>
          </div>
          <div className="ml-3">
            <p
              className="text-sm font-medium"
              style={{ color: subHeadingColor }}
            >
              by {authorName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideForIntroduction;
