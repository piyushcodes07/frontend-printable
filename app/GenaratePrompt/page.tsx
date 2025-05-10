"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import SettingsPanel from "@/components/GenaratePromt/settings-panel"
import ContentPanel from "@/components/GenaratePromt/content-panel"

export default function PromptEditor() {
  const [cards, setCards] = useState([
    {
      id: 1,
      title: "XXX Beauty - Introduction",
      content: [
        "Discover the core elements of XXX beauty that break standards. This concept emphasizes inclusivity, diversity, and personal expression beyond traditional ideas.",
      ],
      isEditing: false,
    },
    {
      id: 2,
      title: "Brand Vision and Mission",
      content: [
        "Empowering Consumers: Promoting individuality and self-expression.",
        "Sustainability Commitment: Dedicated to eco-friendly and responsible sourcing.",
        "Innovation Focus: Combining technology with natural ingredients.",
      ],
      isEditing: false,
    },
    {
      id: 3,
      title: "Product Range",
      content: [
        "Skincare Collection: Gentle cleansers, moisturizers, and treatments.",
        "Makeup Collection: Vibrant colors and versatile products for all beauty enthusiasts.",
        "Fragrance Selection: Unique scents crafted to evoke emotions and appeal to diverse lifestyles.",
        "Beauty Tools: Handmade beauty tools facilitates better skincare process.",
      ],
      isEditing: false,
    },
    {
      id: 4,
      title: "Unique Selling Propositions",
      content: [
        "Cruelty-Free: Guarantee Committed to a cruelty-free policy.",
        "Inclusivity in Beauty: Wide shade range for all skin tones.",
        "Quality Ingredients: High-quality ingredients for safety.",
      ],
      isEditing: false,
    },
    {
      id: 5,
      title: "Marketing Strategy",
      content: [
        "Social Media Engagement: with Engaging consumers with interactive content.",
        "Influencer Collaborations: Partnering with influencers for broader reach.",
        "Sustainability Messaging: Emphasizing commitment to sustainability.",
      ],
      isEditing: false,
    },
    {
      id: 6,
      title: "Customer Experience",
      content: [
        "Customized Shopping Experiences: Engages customers by providing tailored shopping experiences that are created specifically for them through detailed quizzes and surveys.",
        "Exclusive Customer Loyalty Programs: Offers generous rewards to loyal customers by providing them with exclusive discounts and special deals that enhance their shopping experience.",
      ],
      isEditing: false,
    },
    {
      id: 7,
      title: "Market Position and Competitors",
      content: [
        "Competitive Landscape: XXX operates in a competitive beauty market.",
        "Target Audience: Primarily targets millennials and Gen Z consumers.",
        "Growth Potential: Well-positioned for growth in sustainable beauty market.",
      ],
      isEditing: false,
    },
    {
      id: 8,
      title: "Thank You",
      content: [
        "XXX aims to continue innovating and adapting to market trends, ensuring it remains relevant and aligned with consumer values in the beauty industry.",
      ],
      isEditing: false,
    },
  ])

  // Add function to add a new card
  const addCard = () => {
    const newId = cards.length > 0 ? Math.max(...cards.map((card) => card.id)) + 1 : 1
    const newCard = {
      id: newId,
      title: `New Card ${newId}`,
      content: ["Add your content here..."],
      isEditing: true, // Start in edit mode
    }
    setCards([...cards, newCard])
  }

  // Add function to delete a card
  const deleteCard = (id: number) => {
    setCards(cards.filter((card) => card.id !== id))
  }

  // Add function to toggle edit mode
  const toggleEditMode = (id: number) => {
    setCards(
      cards.map((card) => {
        if (card.id === id) {
          return { ...card, isEditing: !card.isEditing }
        }
        return card
      }),
    )
  }

  // Add function to update card content
  const updateCard = (id: number, title: any, content: any) => {
    setCards(
      cards.map((card) => {
        if (card.id === id) {
          return { ...card, title, content, isEditing: false }
        }
        return card
      }),
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 to-blue-100 ">
      <div className="container mx-auto p-4 ">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 m-6 mt-18">
          <Button variant="outline" className="rounded-full bg-blue-500 hover:bg-blue-600 text-white">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <h1 className="text-2xl font-bold text-gray-700">Generate</h1>
          <div className="w-24"></div> {/* Spacer for alignment */}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 m-6">
          <SettingsPanel />
          <ContentPanel
            cards={cards}
            addCard={addCard}
            deleteCard={deleteCard}
            toggleEditMode={toggleEditMode}
            updateCard={updateCard}
          />
        </div>
      </div>
    </div>
  )
}
