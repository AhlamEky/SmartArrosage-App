import { GreatVibes_400Regular, useFonts } from "@expo-google-fonts/great-vibes";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from "react-native";

import { getAuth } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import { database } from "../../constants/firebaseconfig";

export default function AlertesScreen() {
  const [fontsLoaded] = useFonts({ GreatVibes_400Regular });

  const [data, setData] = useState({
    temperature: 0,
    humiditeAir: 0,
    humiditeSol: 0,
    reservoir: 0,
  });

  // 🔑 User Firebase
  const auth = getAuth();
  const uid = auth.currentUser?.uid ;

  // 🔁 Lecture des données Firebase
  useEffect(() => {
    const dbRef = ref(database, `users/${uid}/sensor`);

    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        let d = snapshot.val();
        setData({
          temperature: d.temperature || 0,
          humiditeAir: d.humidity || 0,
          humiditeSol: d.soilMoisture || 0,
          reservoir: d.waterLevel || 0,
        });
      }
    });

    return () => unsubscribe();
  }, [uid]);

  if (!fontsLoaded) return <Text>Chargement...</Text>;

  // 📌 ALERTES DYNAMIQUES
  const alertes = [
    {
      message: "Température de l’air",
      niveau: data.temperature,
      icon: "thermometer-outline",
    },
    {
      message: "Humidité du sol",
      niveau: data.humiditeSol,
      icon: "water-outline",
    },
    {
      message: "Humidité de l’air",
      niveau: data.humiditeAir,
      icon: "cloud-outline",
    },
    {
      message: "Niveau d’eau du réservoir",
      niveau: data.reservoir,
      icon: "beaker-outline",
    },
  ];

  const getBarColor = (v: number) => {
    if (v >= 75) return "#E53935"; // 🔴 danger
    if (v >= 50) return "#FB8C00"; // 🟠 attention
    return "#4CAF50";             // 🟢 normal
  };

  return (
    <ImageBackground
      source={require("../../assets/tt.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={{ alignItems: "center", paddingVertical: 60 }}>
          <Text style={styles.title}>Alertes 🌱</Text>

          <View style={styles.topBars}>
            {alertes.map((alerte, index) => (
              <View key={index} style={styles.card}>
                <Ionicons name={alerte.icon as any} size={32} color="#111" style={{ marginBottom: 8 }} />
                <Text style={styles.cardTitle}>{alerte.message}</Text>

                {/* Barre de progression */}
                <View style={styles.progressBackground}>
                  <View
                    style={[
                      styles.progressBar,
                      {
                        width: `${alerte.niveau}%`,
                        backgroundColor: getBarColor(alerte.niveau),
                      },
                    ]}
                  />
                </View>

                {/* Valeur */}
                <Text style={styles.cardValue}>{alerte.niveau}%</Text>

                {/* Message d’alerte visible */}
                {alerte.niveau >= 75 && (
                  <Text style={styles.alertText}>⚠️ Niveau critique !</Text>
                )}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

// 🎨 Styles identiques à ta page
const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    alignItems: "center",
  },

  title: {
    fontSize: 35,
    color: "#fff",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 50,
    fontWeight: "bold", 
  },

  topBars: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "90%",
  },

  card: {
    backgroundColor: "rgba(205,255,170,0.25)",
    borderRadius: 20,
    padding: 20,
    width: "48%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(205,255,170,0.5)",
    marginBottom: 20,
  },

  cardTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },

  progressBackground: {
    height: 18,
    width: "100%",
    backgroundColor: "#DDD",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
  },

  progressBar: {
    height: "100%",
    borderRadius: 10,
  },

  cardValue: { color: "#E0FFE0", fontSize: 14, marginBottom: 5 },

  alertText: {
    color: "#ffcccc",
    marginTop: 5,
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
});

