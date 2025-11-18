import { db } from "./_firebaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Méthode non autorisée" });

  const { uid, status } = req.body;
  if (!uid) return res.status(400).json({ error: "UID manquant" });

  await db.ref(`users/${uid}/sensor`).update({
    pumpStatus: status,
  });

  return res.status(200).json({ success: true });
}
