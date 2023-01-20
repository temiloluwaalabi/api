import dotenv from "dotenv"
import cloudinary from "cloudinary";
dotenv.config()
//SETUP
// Cloudinary configuration settings
// This will be fetched from the .env file in the root directory
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

export const cloudinaryPath = async(fileToUploads) => {
    return new Promise((resolve) => {
        cloudinary.uploader.upload(fileToUploads, (result) => {
            resolve(
                {
                    url: result.secure_url,
                },
                {
                    resource_type : "auto"
                }
            );
        });
    });
}

export default cloudinaryPath;