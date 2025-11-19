import admin from "../_firebaseAdmin.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { uid, status } = req.body;

    if (!uid || !status) {
      return res.status(400).json({ error: "Missing data" });
    }

    await admin
      .database()
      .ref(`users/${uid}/sensor/pumpStatus`)
      .set(status);

    return res.status(200).json({ success: true, newStatus: status });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
}
