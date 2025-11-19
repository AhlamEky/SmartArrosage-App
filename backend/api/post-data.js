import { db } from "./_firebaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Méthode non autorisée" });

  const { uid, temperature, humidity, soilMoisture } = req.body;

  if (!uid) return res.status(400).json({ error: "UID manquant" });

  await db.ref(`users/${uid}/sensor`).update({
    temperature,
    humidity,
    soilMoisture,
    updatedAt: Date.now(),
  });

  return res.status(200).json({ success: true });
}
