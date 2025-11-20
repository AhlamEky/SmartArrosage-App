const fetch = require("node-fetch"); // si node < 18, sinon fetch est natif
const FormData = require("form-data"); // si besoin, installer via npm i form-data

const uploadToCloudinary = async (fileUri) => {
  const data = new FormData();

  data.append("file", {
    uri: fileUri,
    type: "application/pdf",
    name: "rapport.pdf",
  });

  data.append("upload_preset", "iotSmartArrosage");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/iotSmartArrosage/upload",
    {
      method: "POST",
      body: data,
    }
  );

  const result = await res.json();
  console.log("URL Cloudinary :", result.secure_url);

  return result.secure_url;
};

// Lance le test
uploadToCloudinary("./mon_fichier.pdf");