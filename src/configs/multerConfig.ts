import multer, { StorageEngine } from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinaryModule, { UploadApiResponse, ConfigOptions } from "cloudinary";
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from "./severConfig";


// Cloudinary configuration
const cloudinary = cloudinaryModule.v2;
cloudinary.config(<ConfigOptions>{
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});


const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads", 
    format: async (req: Request, file: Express.Multer.File): Promise<string> => "jpg", 
    public_id: (req: Express.Request, file: Express.Multer.File): string => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      return `${file.fieldname}-${uniqueSuffix}`;
    },
  } as any,
});


export const cloudinaryUploader = multer({ storage: cloudinaryStorage as StorageEngine });
