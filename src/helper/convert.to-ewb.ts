import sharp from "sharp";

export const convertImageToWebP = async ({
  imageBuffer,
  outputPath,
  quality = 100,
}: {
  imageBuffer: Buffer;
  outputPath: string;
  quality?: number;
}) => {
  try {
    await sharp(imageBuffer).webp({ quality }).toFile(outputPath);
    return {
      success: true,
      message: "Image converted successfully",
      outputPath,
    };
  } catch (error) {
    console.error("Error converting image:", error);
    throw new Error("Failed to convert image");
  }
};
