//constants/firebaseconfig.js

// 🧪 Mode débogage App Check (à supprimer en production)
if (typeof self !== "undefined") {
  self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}

import { getApp, getApps, initializeApp } from "firebase/app";
//import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_MEASUREMENT_ID,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
} from "@env";

// ✅ Config Firebase depuis .env
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

// 🧠 Vérifie si Firebase est déjà initialisé (important pour Expo)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();


// 🛡️ Activation App Check
/*
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6LdfKQosAAAAAMEvQtTJ5gXiDv1-fDq4fkBYaBh6"),
  isTokenAutoRefreshEnabled: true,
});*/

// Authentification & Base de données
export const auth = getAuth(app);
export const database = getDatabase(app);

export default app;
