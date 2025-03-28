import { AssetInput } from "@/types";

export function convertObject(data: string[][]): AssetInput[] {
  return data
    .slice(1) // Skip the header row
    .filter((row) => row.some((value) => value !== null && value !== undefined && value.trim() !== "")) // Check for non-empty rows
    .map((row) =>
      row.reduce((acc, curr, index) => {
        const key = data[0][index];

        // Check if key is metadata
        if (key.startsWith("metadata[") && key.endsWith("]")) {
          const metadataKey = key.slice(9, -1); // Get [key] from metadata[key]
          if (!acc.metadata) {
            acc.metadata = {};
          }
          acc.metadata[metadataKey] = curr;
        } else if (key === "assetName") {
          acc.assetName = curr;
        } else if (key === "quantity") {
          acc.quantity = curr;
        } else if (key === "receiver") {
          acc.receiver = curr;
        } else {
          throw new Error(`Invalid key: ${key}`);
        }

        return acc;
      }, {} as AssetInput),
    );
}
