import { getAuth } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { database } from "../../constants/firebaseconfig";

export default function ExplorerScreen() {
  const [data, setData] = useState({
    temperature: 0,
    humiditeAir: 0,
    humiditeSol: 0,
    pumpStatus: "OFF",
  });

  const auth = getAuth();
  const uid = auth.currentUser?.uid || "ufhI3zN0M3SzPpAQULG66vjLY3D3";

  useEffect(() => {
    const dbRef = ref(database, `users/${uid}/sensor`);

    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const d = snapshot.val();

        setData({
          temperature: d.temperature || 0,
          humiditeAir: d.humidity || 0,
          humiditeSol: d.soilMoisture || 0,
          pumpStatus: d.pumpStatus || "OFF",
        });
      }
    });

    return () => unsubscribe();
  }, [uid]);

  // ⚠️ ALERTES TRÈS VISIBLES
  let alerte = null;

  if (data.temperature > 30) {
    alerte = "🔥 Température élevée : surveiller la plante";
  }
  if (data.humiditeSol < 30) {
    alerte = "💧 Sol trop sec : risque de dessèchement";
  }

  const conseils = [
    data.humiditeSol < 40 ? "Arrosez si humidité < 40%" : "Humidité correcte",
    data.temperature > 30 ? "Évitez le plein soleil l'après-midi" : "Température stable",
  ];

  const maintenance = [
    "Vérifier l'arrosage automatique",
    "Nettoyer les capteurs",
    "Inspecter les feuilles",
  ];

  return (
    <ImageBackground
      source={require("../../assets/q.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={{ alignItems: "center", paddingVertical: 60 }}>
          <Text style={styles.title}>Explorer 🌱</Text>

          {/* --- Dernières données --- */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Dernières données</Text>
            <Text style={styles.cardText}>Humidité du sol : {data.humiditeSol}%</Text>
            <Text style={styles.cardText}>Température : {data.temperature}°C</Text>
            <Text style={styles.cardText}>Humidité de l’air : {data.humiditeAir}%</Text>

            {/* 🚨 AFFICHEUR D’ALERTE VISUELLEMENT FORT */}
            {alerte && (
              <View style={styles.alertBox}>
                <Text style={styles.alertText}>{alerte}</Text>
              </View>
            )}
          </View>

          {/* --- Conseils --- */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Conseils</Text>
            {conseils.map((c, index) => (
              <Text key={index} style={styles.cardText}>
                {c}
              </Text>
            ))}
          </View>

          {/* --- Maintenance --- */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Maintenance</Text>
            {maintenance.map((m, index) => (
              <Text key={index} style={styles.cardText}>
                {m}
              </Text>
            ))}
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    alignItems: "center",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
    textAlign: "center",
  },
  card: {
    backgroundColor: "rgba(205, 255, 170, 0.25)",
    borderRadius: 18,
    padding: 20,
    width: "90%",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(205, 255, 170, 0.5)",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#fff",
  },
  cardText: {
    fontSize: 16,
    color: "#111",
    marginBottom: 4,
  },

  // 🚨 STYLE ALERTE TRÈS VISIBLE
  alertBox: {
    backgroundColor: "rgba(255, 50, 50, 0.8)",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  alertText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "center",
  },
});


/*import React from "react";
import { ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";


export default function ExplorerScreen() {
  // Données simulées pour le projet
  const donnees = {
    humiditeSol: 45,
    temperature: 28,
    alerte: "Température > 30°C : surveiller la plante",
  };

  const conseils = [
    "Arrosez si humidité < 40%",
    "Évitez le plein soleil après 12h",
  ];

  const maintenance = [
    "Vérifier l'arrosage automatique",
    "Nettoyer les capteurs",
    "Inspecter les plantes pour maladies",
  ];

  return (
    <ImageBackground
      source={require("../../assets/q.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={{ alignItems: "center", paddingVertical: 60 }}>
          <Text style={styles.title}>Explorer 🌱</Text>

          {}// --- Dernières données --- 
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Dernières données</Text>
            <Text style={styles.cardText}>Humidité du sol : {donnees.humiditeSol}%</Text>
            <Text style={styles.cardText}>Température : {donnees.temperature}°C</Text>
            <Text style={styles.cardText}>{donnees.alerte}</Text>
          </View>

          {} //--- Conseils --- 
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Conseils</Text>
            {conseils.map((c, i) => (
              <Text key={i} style={styles.cardText}>{c}</Text>
            ))}
          </View>

          {}//--- Maintenance / Troisième carte --- 
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Maintenance</Text>
            {maintenance.map((m, i) => (
              <Text key={i} style={styles.cardText}>{m}</Text>
            ))}
          </View>

        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
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
    marginBottom: 30,
    textAlign: "center",
  },
  card: {
    backgroundColor: "rgba(205, 255, 170, 0.25)", // 💚 overlay pistache
    borderRadius: 18,
    padding: 20,
    width: "90%",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(205, 255, 170, 0.5)",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#fff", // titre en blanc
  },
  cardText: {
    fontSize: 16,
    color: "#111", // texte en noir
    marginBottom: 4,
  },
});*/
