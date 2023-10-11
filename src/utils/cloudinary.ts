const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_KEY,
});

const cloudinaryUploadImg = async (fileToUploads: any) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(fileToUploads, (result: any) => {
      resolve({
        url: result.secure_url,
        asset_id: result.asset_id,
        public_id: result.public_id,
      });
    });
  });
};

const cloudinaryDeleteImg = async (fileToDelete: any) => {
  return new Promise((resolve) => {
    cloudinary.uploader.destroy(fileToDelete, (result: any) => {
      resolve({
        url: result.secure_url,
        asset_id: result.asset_id,
        public_id: result.public_id,
      });
    });
  });
};

module.exports = { cloudinaryUploadImg, cloudinaryDeleteImg };
