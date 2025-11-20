import cloudinary from "../constants/cloudinaryConfig";

const uploadFile = async (filePath: string) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
      upload_preset: "iotSmartArrosage",  // <<< IMPORTANT
      folder: "smart_arrosage"            // si tu veux que tous les fichiers soient rangés là
    });

    console.log("Fichier uploadé :", result.secure_url);
    return result.secure_url;

  } catch (error) {
    console.error("Erreur upload Cloudinary :", error);
  }
};

export default uploadFile;