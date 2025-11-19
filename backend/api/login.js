import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase.js";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { email, password } = req.body;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return res.json({ uid: userCredential.user.uid });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}
