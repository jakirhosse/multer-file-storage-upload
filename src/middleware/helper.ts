import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderName = req.query.folderName as string;
    const destinationFolder = `uploads/${folderName.toLowerCase().trim()}`;
    //check if the folder exist
    if (!fs.existsSync(destinationFolder)) {
      fs.mkdirSync(destinationFolder, { recursive: true });
    }
    cb(null, destinationFolder);
  },

  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-").toLowerCase().trim() +
        "-" +
        file.originalname.toLowerCase().replace(/  +/g, "-").trim()
    );
  },
});

// File Filter Configuration
function fileFilter(
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) {
  const allowedTypes = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/webp",
    "application/pdf",
  ];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(null, false);
  }
  cb(null, true);
}

// Export Multer Instance
export const uploads = multer({ storage, fileFilter });
