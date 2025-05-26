"use client";
import React, { useState } from "react";
import Orderfeedback from "./order-feedback";
import FeedbackSubmit from "./feedback-submit";

export default function FeedbackWrapper({ orderStatus }: { orderStatus: string }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      {!submitted ? (
        <Orderfeedback orderStatus={orderStatus} onSubmit={() => setSubmitted(true)} />
      ) : (
        <FeedbackSubmit />
      )}
    </>
  );
}
