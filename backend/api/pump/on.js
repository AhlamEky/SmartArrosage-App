import admin from "../../firebase.js";

export default async function handler(req, res) {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) return res.status(401).json({ error: "Missing token" });

    const decoded = await admin.auth().verifyIdToken(token);

    await admin
      .database()
      .ref(`users/${decoded.uid}/sensor/pumpStatus`)
      .set("ON");

    return res.status(200).json({ message: "Pump ON" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}
