// services/pdfCloudinary.ts
/*import axios from "axios";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import jsPDF from "jspdf";
import { Platform } from "react-native";

export const generateAndUploadPDF = async (htmlContent: string) => {
  try {
    if (Platform.OS === "web") {
      // ---- WEB ----
      const doc = new jsPDF();
      doc.text("Statistiques Smart Arrosage", 10, 10);
      doc.text(htmlContent.replace(/<[^>]*>/g, ""), 10, 20);

      // Convertir en blob
      const pdfBlob = doc.output("blob");

      // Upload via FormData
      const data = new FormData();
      data.append("file", pdfBlob, "statistiques.pdf"); // ici pas d'erreur
      data.append("upload_preset", "iotSmartArrosage");

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/upload",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      return res.data.secure_url;

    } else {
      // ---- MOBILE ----
      const { uri } = await Print.printToFileAsync({ html: htmlContent });

      if (uri && await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      }

      // Upload sur Cloudinary
      const data = new FormData();
      data.append("file", {
        uri,
        type: "application/pdf",
        name: "statistiques.pdf",
      } as any);
      data.append("upload_preset", "iotSmartArrosage");

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/upload",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      return res.data.secure_url;
    }

  } catch (err) {
    console.error("Erreur génération/upload PDF :", err);
    alert("Impossible de générer ou partager le PDF");
  }
};
*/
import axios from "axios";
import * as Print from "expo-print";

// Génère le PDF à partir d'un contenu HTML
export const generatePDF = async (htmlContent: string) => {
  const { uri } = await Print.printToFileAsync({
    html: htmlContent,
    base64: false,
  });

  console.log("PDF généré :", uri);
  return uri;
};

// Upload sur Cloudinary
export const uploadToCloudinary = async (fileUri: string) => {
  const data = new FormData();
  data.append("file", {
    uri: fileUri,
    type: "application/pdf",
    name: "statistiques.pdf",
  } as any);
  data.append("upload_preset", "iotSmartArrosage"); // ton preset unsigned

  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dltzgx9ld/upload",
      data,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    console.log("PDF uploadé :", res.data.secure_url);
    return res.data.secure_url;
  } catch (err) {
    console.error("Erreur upload Cloudinary :", err);
  }
};
