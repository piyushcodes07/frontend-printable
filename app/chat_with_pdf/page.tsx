"use client";

import type React from "react";
import { useState, useRef, useCallback } from "react";
import { useChat } from "@ai-sdk/react";
import { Upload, ChevronRight, Download, ChevronDown, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type AppState = "upload" | "analyzing" | "chat";

export default function ChatWithPDF() {
  const [appState, setAppState] = useState<AppState>("upload");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    onFinish: () => {
      if (messages.length > 0 && messages[messages.length - 1].role === "assistant") {
        generateSuggestedQuestions();
      }
    },
  });

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    if (file.type !== "application/pdf") {
      alert("Please select a PDF file");
      return;
    }

    setPdfFile(file);
    const fileUrl = URL.createObjectURL(file);
    setPdfUrl(fileUrl);
    setAppState("analyzing");

    // Simulate analysis
    setTimeout(() => {
      setAppState("chat");
      generateSuggestedQuestions();
    }, 3000);
  };

  const generateSuggestedQuestions = () => {
    setSuggestedQuestions([
      "What new hobby has Ellis Bednar picked up recently?",
      "What does Ellis mention about life being hectic?",
      "What does Ellis propose to Anita at the end of the letter?",
    ]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files);
  };

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!pdfFile) return;

      handleSubmit(e, {
        experimental_attachments: [pdfFile],
      });
    },
    [handleSubmit, pdfFile]
  );

  const handleSuggestedQuestion = (question: string) => {
    handleInputChange({ target: { value: question } } as React.ChangeEvent<HTMLInputElement>);
    
    const formEvent = new Event("submit", { cancelable: true }) as unknown as React.FormEvent<HTMLFormElement>;
    handleSubmit(formEvent);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      {appState === "upload" && (
        <header className="flex justify-center items-center py-6">
          <h1 className="text-3xl font-bold" style={{
            fontFamily: 'Inter',
            fontWeight: 700,
            fontSize: '42px',
            lineHeight: '100%',
            letterSpacing: '0%',
          }}>
            Chat with PDF
          </h1>
        </header>
      )}

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        {appState === "upload" && (
          <div className="w-full max-w-3xl mx-auto">
            <Card className="p-8 bg-white rounded-lg shadow-lg border border-gray-300">
              <div
                className="border-2 border-dashed border-indigo-600 p-12 text-center cursor-pointer bg-white flex flex-col items-center"
                style={{ borderRadius: '20px' }}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <p className="mb-4 text-lg font-medium">Drag & Drop your file here</p>
                <div className="flex items-center justify-center mb-4 w-full">
                  <hr className="border-t border-gray-300 flex-grow" />
                  <span className="mx-2 text-gray-500">or</span>
                  <hr className="border-t border-gray-300 flex-grow" />
                </div>
                <Button
                  variant="outline"
                  className="flex items-center bg-[rgba(6,4,75,1)] text-white py-3 px-4 rounded-full"
                >
                  <Upload className="mr-2" size={16} />
                  CHOOSE FILES
                  <ChevronDown className="ml-2" size={16} />
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.txt"
                  onChange={(e) => handleFileSelect(e.target.files)}
                />
                <p className="text-xs text-gray-500 mt-4">
                  Supported formats: .pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.txt
                </p>
                <p className="text-xs text-gray-500">Max file size: 50MB</p>
              </div>
            </Card>
            <p className="text-center mt-6 text-gray-700">
              Upload your PDF and start a conversation — ask questions, explore content, and get instant answers,
              <br />
              all in one place.
            </p>
          </div>
        )}

        {appState === "analyzing" && (
          <div className="w-full max-w-3xl mx-auto text-center">
            <div className="mb-4">
              <img
                src="/pdficon.png"
                alt="Loading..."
                className="mx-auto h-60 w-auto"
              />
              <p className="text-sm text-gray-600 mt-2">
                {pdfFile?.name} (
                {(pdfFile?.size || 0) / (1024 * 1024) < 1
                  ? `${Math.round((pdfFile?.size || 0) / 1024)} KB`
                  : `${((pdfFile?.size || 0) / (1024 * 1024)).toFixed(2)} MB`}
                )
              </p>
            </div>
            <p className="text-lg mb-4">Analyzing with AI...</p>
            <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-500 h-2.5 rounded-full w-1/3 animate-pulse"></div>
            </div>
          </div>
        )}

        {appState === "chat" && (
          <div className="w-full max-w-6xl mx-auto flex h-[calc(100vh-120px)]">
            {/* PDF Viewer */}
            <div className="w-1/2 bg-white p-4 overflow-y-auto border-r">
              {pdfUrl && <iframe src={pdfUrl} className="w-full h-full" title="PDF Viewer" />}
            </div>

            {/* Chat Interface */}
            <div className="w-1/2 flex flex-col bg-white">
              <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4">
                {messages.length === 0 ? (
                  <div className="p-4">
                    <div className="flex items-center mb-4">
                      <span className="text-yellow-500 mr-2">✨</span>
                      <h3 className="font-semibold">Suggested Questions:</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-auto"
                        onClick={() => setShowSuggestions(!showSuggestions)}
                      >
                        {showSuggestions ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      </Button>
                    </div>

                    {showSuggestions && (
                      <div className="space-y-2">
                        {suggestedQuestions.map((question, index) => (
                          <div
                            key={index}
                            className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                            onClick={() => handleSuggestedQuestion(question)}
                          >
                            <span>{question}</span>
                            <ChevronRight size={16} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
                      >
                        <div
                          className={cn(
                            "max-w-[80%] rounded-lg p-4",
                            message.role === "user" ? "bg-gray-100" : "bg-white border",
                          )}
                        >
                          {message.role === "user" ? (
                            <div className="flex items-start gap-3">
                              <div>{message.content}</div>
                            </div>
                          ) : (
                            <div>
                              <div className="flex items-start gap-3">
                                <div className="h-8 w-8 rounded-full overflow-hidden bg-green-100 flex items-center justify-center">
                                  <span className="text-green-500 text-xl">P</span>
                                </div>
                                <div>
                                  {message.content}

                                  {index === messages.length - 1 && message.role === "assistant" && (
                                    <div className="mt-4">
                                      <div className="flex items-center mb-2">
                                        <span className="text-yellow-500 mr-2">✨</span>
                                        <h3 className="font-semibold">Suggested Questions:</h3>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="ml-auto"
                                          onClick={() => setShowSuggestions(!showSuggestions)}
                                        >
                                          {showSuggestions ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                        </Button>
                                      </div>

                                      {showSuggestions && (
                                        <div className="space-y-2">
                                          {suggestedQuestions.map((question, qIndex) => (
                                            <div
                                              key={qIndex}
                                              className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                                              onClick={() => handleSuggestedQuestion(question)}
                                            >
                                              <span>{question}</span>
                                              <ChevronRight size={16} />
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="max-w-[80%] rounded-lg p-4 bg-white border">
                          <div className="flex items-start gap-3">
                            <div className="h-8 w-8 flex items-center justify-center">
                              <svg
                                width="38"
                                height="38"
                                viewBox="0 0 38 38"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="animate-spin"
                              >
                                <path
                                  d="M34 19C34 20.9698 33.612 22.9204 32.8582 24.7403C32.1044 26.5601 30.9995 28.2137 29.6066 29.6066C28.2137 30.9995 26.5601 32.1044 24.7403 32.8582C22.9204 33.612 20.9698 34 19 34C17.0302 34 15.0796 33.612 13.2597 32.8582C11.4399 32.1044 9.78628 30.9995 8.3934 29.6066C7.00052 28.2137 5.89563 26.5601 5.14181 24.7403C4.38799 22.9204 4 20.9698 4 19C4 17.0302 4.38799 15.0796 5.14181 13.2597C5.89563 11.4399 7.00052 9.78628 8.3934 8.3934C9.78628 7.00052 11.4399 5.89563 13.2598 5.14181C15.0796 4.38799 17.0302 4 19 4C20.9698 4 22.9204 4.38799 24.7403 5.14181C26.5601 5.89563 28.2137 7.00052 29.6066 8.3934C30.9995 9.78628 32.1044 11.4399 32.8582 13.2598C33.612 15.0796 34 17.0302 34 19L34 19Z"
                                  stroke="#D9D9D9"
                                  strokeWidth="8"
                                />
                              </svg>
                            </div>
                            <span>Loading...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 border-t">
                <form onSubmit={onSubmit} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Stuck? Just ask me anything about your PDF!"
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button type="submit" size="icon" className="rounded-full" disabled={isLoading}>
                    <Send size={18} />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}