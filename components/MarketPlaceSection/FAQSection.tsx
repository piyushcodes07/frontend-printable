import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "How do I return a product?",
    answer:
      "You can return a product by contacting our support team within 30 days of purchase. Ensure the product is in its original condition.",
  },
  {
    question: "How long will it take to receive my refund?",
    answer:
      "Refunds are usually processed within 5-7 business days after we receive the returned product.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
      <h3 className="font-bold mb-2">Returns & Refund</h3>
      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="border-b border-gray-200 pb-2">
              <button
                onClick={() => toggle(idx)}
                className="flex justify-between w-full text-left font-medium text-gray-900"
                aria-expanded={isOpen}
              >
                {faq.question}
                {isOpen ? (
                  <ChevronUp size={20} strokeWidth={3} />
                ) : (
                  <ChevronDown size={20} strokeWidth={3} />
                )}
              </button>
              {isOpen && <p className="mt-2 text-gray-700">{faq.answer}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
