import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { getAuth } from "firebase/auth";
import { onValue, ref, set } from "firebase/database";
import { database } from "../../constants/firebaseconfig";

export default function ControleScreen() {
  const auth = getAuth();
  const uid = auth.currentUser?.uid;//|| "ufhI3zN0M3SzPpAQULG66vjLY3D3";

  const [pumpStatus, setPumpStatus] = useState("OFF");

  useEffect(() => {
    const dbRef = ref(database, `users/${uid}/sensor/pumpStatus`);

    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        setPumpStatus(snapshot.val());
      }
    });

    return () => unsubscribe();
  }, [uid]);

  const togglePump = () => {
    const newStatus = pumpStatus === "ON" ? "OFF" : "ON";
    setPumpStatus(newStatus);
    set(ref(database, `users/${uid}/sensor/pumpStatus`), newStatus);
  };

  return (
    <ImageBackground
      source={require("../../assets/q.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={{ alignItems: "center", paddingVertical: 60 }}>
          
          <Text style={styles.title}>Contrôle de la pompe 🌱</Text>

          {/* 📌 Carte principale */}
          <View style={styles.card}>
            <Ionicons
              name={pumpStatus === "ON" ? "flash" : "flash-off"}
              size={60}
              color="#fff"
              style={{ marginBottom: 12 }}
            />

            <Text style={styles.cardTitle}>Pompe actuellement :</Text>

            <Text
              style={[
                styles.statusValue,
                {
                  color: pumpStatus === "ON" ? "#6CFF92" : "#FF6B6B",
                },
              ]}
            >
              {pumpStatus}
            </Text>

            <TouchableOpacity
              onPress={togglePump}
              style={[
                styles.button,
                { backgroundColor: pumpStatus === "ON" ? "#c0392b" : "#27ae60" },
              ]}
            >
              <Text style={styles.buttonText}>
                {pumpStatus === "ON" ? "Arrêter la pompe" : "Démarrer la pompe"}
              </Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 70,
  },

  /** 🟩 Carte principale */
  card: {
    backgroundColor: "rgba(0,0,0,0.35)",
    borderRadius: 22,
    padding: 35,
    width: "85%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  cardTitle: {
    color: "#EEE",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },

  /** 🟦 Texte ON / OFF */
  statusValue: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 25,
  },

  /** 🔘 Bouton ON/OFF */
  button: {
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 40,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

