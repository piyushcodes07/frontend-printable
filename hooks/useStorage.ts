import { useOrder, DocumentItem } from "@/context/orderContext"; // Ensure DocumentItem is imported

const API_BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_ROOT_URL}`;

export default function UseStorage() {
  const { order, dispatch } = useOrder();

  const uploadFile = async (file: File): Promise<DocumentItem | null> => {
    try {
      const formData = new FormData();

      formData.append("file", file);
      const response = await fetch(`${API_BASE_URL}/api/file/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(
          `Upload failed: ${response.status} ${response.statusText}`, // Corrected template literal
        );
      }

      const data = await response.json();

      // Ensure new documents default to "All" pages
      const newDoc: DocumentItem = {
        id: data.fileId,
        fileName: file.name,
        fileUrl: data.fileUrl,
        copies: 1,
        colorType: "black and white", // Match exact type string
        paperSize: "A4 (8.27 x 11.69 inches)", // Match exact type string
        printType: "front",
        pageDirection: "vertical",
        pagesToPrint: "All", // <<<---- ADDED DEFAULT
        size: file.size,
      };
      dispatch({ type: "ADD_DOCUMENT", payload: newDoc });
      return newDoc;
    } catch (err: any) {
      console.error("Upload error:", err);
      // Also add default in error case if the doc is added to the list
      const errorDoc: DocumentItem = {
        id: `error-${Date.now()}`,
        fileName: file.name,
        fileUrl: "",
        copies: 1,
        colorType: "black and white",
        paperSize: "A4 (8.27 x 11.69 inches)",
        printType: "front",
        pageDirection: "vertical",
        pagesToPrint: "All", // <<<---- ADDED DEFAULT FOR ERROR CASE
        size: file.size,
        error: err.message || String(err),
      };
      // Check if your logic adds error docs to the list - if so, dispatch
      dispatch({ type: "ADD_DOCUMENT", payload: errorDoc });
      return null; // Or return errorDoc if you handle it differently
    }
  };

  const deleteFile = async (
    fileId: string,
    fileName: string,
    index: number,
    setStatusMessage: (
      status: { text: string; isError?: boolean } | null,
    ) => void, // More specific type
  ) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/file/${encodeURIComponent(fileId)}`,
        { method: "DELETE" },
      );

      if (!response.ok) {
        throw new Error(
          `Delete failed: ${response.status} ${response.statusText}`, // Corrected template literal
        );
      }

      await response.json(); // Assuming response confirms deletion
      dispatch({ type: "REMOVE_DOCUMENT", index });
      setStatusMessage({ text: `${fileName} was successfully deleted.` });
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (err: any) {
      console.error("Delete error:", err);
      setStatusMessage({
        text: `Failed to delete ${fileName}. ${err.message || ""}`.trim(), // Add error message
        isError: true,
      });
      // Don't auto-hide error messages immediately, or make duration longer
      // setTimeout(() => setStatusMessage(null), 5000);
    }
  };

  return {
    uploadFile,
    deleteFile,
  };
}
