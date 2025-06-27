"use client";
import { useEffect, useState } from "react";
import { useSlidesContext } from "@/context/globalSlideContext";
import { SlideDeck } from "@/components/GenaratePromt/slideDeck";
import SlidesLoader from "@/components/GenaratePromt/slideLoader";

export default function SlidePreview() {
  const { globalSlides } = useSlidesContext();
  const [cards, setCards] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const generatePreview = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/ppt-get/generate-preview", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slides: globalSlides }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch preview");
        }

        const data = await response.json();
        console.log("API Response:", data);
        setCards(data);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (globalSlides && globalSlides.length > 0) {
      generatePreview();
    }
  }, []);

  return (
    <div>
      {cards == null || loading ? (
        <SlidesLoader />
      ) : (
        <SlideDeck slides={cards.slides} />
      )}
    </div>
  );
}
