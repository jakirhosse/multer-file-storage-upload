import { Request, Response } from "express";
import fs from "fs";
import FileModels from "../models/model-service";
import { envConfig } from "../utils/env.config";
import sharp from "sharp";

const uploadsFileController = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }
    const {
      originalname,
      filename,
      path: originalPath,
      destination,
      mimetype,
    } = file || {};
    let newFilePath = originalPath;
    //convert
    if (["image/png", "image/jpg", "image/jpeg"].includes(mimetype)) {
      newFilePath = originalPath.replace(/\.[^/.]+$/, " ") + ".webp";
      await sharp(originalPath).webp({ quality: 80 }).toFile(newFilePath);
      fs.unlinkSync(originalPath);
      file.path = newFilePath;
      file.mimetype = "image/webp";
      file.filename = filename.replace(/\.[^/.]+$/, " ") + ".webp";
    }
    const modifyPath = file.path
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/\\/g, "/")
      .trim();
    const url = `${envConfig.BASE_URL}/${modifyPath}`;
    const result = await new FileModels({
      originalname: originalname,
      filename: file.filename,
      path: modifyPath,
      destination: destination,
      size: file?.size,
      mimetype: file?.mimetype,
      imageUrl: url,
    }).save();

    // Respond with the updated file details
    res.json({
      success: true,
      message: "Image updated successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload and convert file" });
  }
};

export const fileController = {
  uploadsFileController,
};
