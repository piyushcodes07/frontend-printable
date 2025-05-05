"use client";
import React, { createContext, useContext, useState } from "react";

// Extended SignData for multiple element types
export interface SignData {
  type: "sign" | "text" | "date" | "checkbox" | "initials"; // NEW
  signUrl?: string; // For type = "sign"
  value?: string | Boolean; // For text, date, initials
  checked?: boolean; // For checkbox
  fontSize?: number;
  color?: string;
  signSize: { width: number; height: number; fontSize?: number };
  position: { x: number; y: number; pageIndex: number | null };
}

interface SignProps {
  signs: SignData[];
  currentSignIndex: number | null;
  setCurrentSignIndex: (index: number) => void;
  signDragging: boolean;
  setSignDragging: (val: boolean) => void;

  addSign: (sign: SignData) => void;
  updateSign: (id: number, updatedData: Partial<SignData>) => void;
  removeSign: (id: number) => void;
  fileIds: string[] | null;
  setFile_id: (id: number) => void;
  signers_email: string[] | null;
  setSignerEmail: (email: string) => void;
  signImages: string[];
  addImage: (signUrl: string) => void;
  currentSlide: number;
  setCurrentSlide: (pageIndex: number) => void;
  // updateFont: (id: number, fontSize: number) => void;
}

const SignContext = createContext<SignProps | undefined>(undefined);

export default function SignProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [signs, setSigns] = useState<SignData[]>([]);
  const [signIndex, setSignIndex] = useState<number | null>(null);
  const [signDragging, setSignDragStatus] = useState<boolean>(false);
  const [signImages, setSignImages] = useState<string[]>([]);
  const [fileIds, setFileIdState] = useState<string[] | null>([]);
  const [signerEmail, setSignerEmailState] = useState<string[] | null>([]);
  const [currentPdfPage, setCurrentPage] = useState<number>(0);

  const addSign = (sign: SignData) => setSigns((prev) => [...prev, sign]);

  const setSignDragging = (val: boolean) => setSignDragStatus(val);
  const setCurrentSlide = (pageIndex: number) => setCurrentPage(pageIndex);
  const addImage = (signUrl: string) => {
    setSignImages((prev) => [...prev, signUrl]);
  };

  const updateSign = (id: number, updatedData: Partial<SignData>) => {
    setSigns((prev) =>
      prev.map((sign, index) =>
        index === id ? { ...sign, ...updatedData } : sign
      )
    );
  };
  // const updateFontSize = (id: number, fontSize: number) => {
  //   setSigns((prev) =>
  //     prev.map((sign, index) =>
  //       index === id
  //         ? {
  //             ...sign,
  //             signSize: {
  //               ...sign.signSize,
  //               fontSize, // only update this
  //             },
  //           }
  //         : sign
  //     )
  //   );
  // };

  const removeSign = (id: number) => {
    setSigns((prev) => prev.filter((_, index) => index !== id));
  };

  const setCurrentSignIndex = (index: number) => {
    setSignIndex(index);
  };

  const setFile_id = (id: number) => {
    setFileIdState((prev) =>
      prev ? [...prev, id.toString()] : [id.toString()]
    );
  };

  const setSignerEmail = (email: string) => {
    setSignerEmailState((prev) => (prev ? [...prev, email] : [email]));
  };

  return (
    <SignContext.Provider
      value={{
        signs,
        addSign,
        updateSign,
        removeSign,
        fileIds,
        setFile_id,
        signers_email: signerEmail,
        setSignerEmail,
        currentSignIndex: signIndex,
        setCurrentSignIndex,
        signDragging: signDragging,
        setSignDragging: setSignDragStatus,
        signImages: signImages,
        addImage: addImage,
        currentSlide: currentPdfPage,
        setCurrentSlide: setCurrentPage,
        // updateFont: updateFontSize,
      }}
    >
      {children}
    </SignContext.Provider>
  );
}

export const useSignUrl = () => {
  const context = useContext(SignContext);
  if (!context) {
    throw new Error("useSignContext must be used within a SignProvider");
  }
  return context;
};
