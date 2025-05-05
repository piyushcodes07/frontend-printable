const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
async function getFiles(fileId: string, userId: string) {
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/esign/sign-document/${fileId}/${userId}`
    );
    const data = await res.json();
    if (data.success) return data.response;
    return null;
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
}

export default getFiles;
