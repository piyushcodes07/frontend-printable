"use client";
import SlideforIntroduction from "@/components/Generate/slides/slideForIntroduction";
import { SlideConflictOverview } from "../Generate/slides/slideConflictOverview";
import { useUser } from "@clerk/nextjs";
import { SlideCircularProcesss } from "../Generate/slides/SlideCircularProcess";
const slideComponents: Record<string, any> = {
  SlideForIntroduction: SlideforIntroduction,
  SlideConflictOverview: SlideConflictOverview,
  SlideCircularProcesss: SlideCircularProcesss,
};

export function SlideDeck({
  slides,
}: {
  slides: { type: string; content: any }[];
}) {
  const templates = [
    {
      id: 1,
      title: "Gradient background Design",
      backgroundColor:
        "linear-gradient(to bottom right, #D8B4FE, #93C5FD, #A5F3FC)",
      headingColor: "#2C3E50", // Deep midnight blue for strong contrast
      subHeadingColor: "#4A5568", // Soothing slate gray for secondary text
      bulletColor: "#3182CE", // Bright blue accent from gradient
      image: "/Generate/images4.png",
    },
    {
      id: 2,
      title: "Creative art background Design",
      backgroundColor: "linear-gradient(to right, #F9A8D4, #FED7AA)",
      headingColor: "#2C3E50", // Consistent dark navy for readability
      subHeadingColor: "#D53F8C", // Vibrant magenta for playful subheadings
      bulletColor: "#ED8936", // Warm orange for bullet points
      image: "/Generate/images5.png",
    },
    {
      id: 3,
      title: "3D background Design",
      backgroundColor: "linear-gradient(to right, #F9A8D4, #FBCFE8)",
      headingColor: "#2D3748", // Charcoal gray for a modern look
      subHeadingColor: "#805AD5", // Soft purple for depth
      bulletColor: "#F687B3", // Rose pink to echo the gradient
      image: "/Generate/image6.png",
    },
    {
      id: 4,
      title: "Nature background Design",
      backgroundColor: "#DCFCE7", // Tailwind green-100
      headingColor: "#22543D", // Dark forest green for clarity
      subHeadingColor: "#38A169", // Fresh medium green for accents
      bulletColor: "#2F855A", // Rich emerald for bullets
      image: "/Generate/images-1.png",
    },
    {
      id: 5,
      title: "Flower background Design",
      backgroundColor: "#FEF9C3", // Tailwind yellow-100
      headingColor: "#2D3748", // Versatile charcoal for headings
      subHeadingColor: "#D69E2E", // Goldenrod for floral vibes
      bulletColor: "#ECC94B", // Sunny yellow for bullet points
      image: "/Generate/images3.png",
    },
    {
      id: 6,
      title: "Professional background Design",
      backgroundColor: "#1F2937", // Tailwind gray-800
      headingColor: "#E2E8F0", // Almost-white for strong contrast
      subHeadingColor: "#A0AEC0", // Light steel gray for subheads
      bulletColor: "#CBD5E0", // Soft pale gray for bullets
      image: "/Generate/images2.png",
    },
  ];

  const themeID = Number(localStorage.getItem("themeID"));
  const currentTheme = templates.find((t) => t.id === themeID);
  const user = useUser();
  const authorName = user.user?.username;
  console.log(authorName, "user");
  return (
    <div className="w-full max-h-1/3 flex flex-col items-center justify-center">
      {slides.map((slide, idx) => {
        const SlideComp = slideComponents[slide.type];
        if (!SlideComp) return <div key={idx}>Unknown slide type</div>;
        // Spread content as props (keys match component props)
        return (
          <div key={idx} className="h-1/3 max-w-[1000px]">
            <SlideComp
              key={idx}
              {...slide.content}
              backgroundColor={currentTheme?.backgroundColor}
              headingColor={currentTheme?.headingColor}
              subHeadingColor={currentTheme?.subHeadingColor}
              bulletColor={currentTheme?.bulletColor}
            />
            ;
          </div>
        );
      })}
    </div>
  );
}
