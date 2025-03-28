import axios from "axios";

export async function kudoUpload(formData: FormData) {
  try {
    const response = await axios.post("/api/ipfs", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const { message, result } = response.data;

    if (!result) throw new Error(message);

    return { message, result };
  } catch (error) {
    console.error("Error during Upload:", error);
    return {
      message: error instanceof Error ? error.message : "Unknown error",
      result: false,
    };
  }
}
