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
  const uid = auth.currentUser?.uid || "ufhI3zN0M3SzPpAQULG66vjLY3D3";

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


/*import { GreatVibes_400Regular, useFonts } from "@expo-google-fonts/great-vibes";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AlertesScreen() {
  const [fontsLoaded] = useFonts({ GreatVibes_400Regular });

  const [alertes, setAlertes] = useState([
    { message: "Température de l’air", niveau: 28, icon: "thermometer-outline" },
    { message: "Humidité du sol", niveau: 45, icon: "water-outline" },
    { message: "Humidité de l’air", niveau: 60, icon: "cloud-outline" },
    { message: "Niveau d’eau du réservoir", niveau: 80, icon: "beaker-outline" },
  ]);

  const getBarColor = (niveau) => {
    if (niveau >= 75) return "#E53935"; // rouge
    if (niveau >= 50) return "#FB8C00"; // orange
    return "#4CAF50"; // vert
  };

  const changeNiveau = (index, delta) => {
    const newAlertes = [...alertes];
    let val = newAlertes[index].niveau + delta;
    if (val > 100) val = 100;
    if (val < 0) val = 0;
    newAlertes[index].niveau = val;
    setAlertes(newAlertes);
  };

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#E8F5E9",
        }}
      >
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../../assets/tt.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.overlay}>
        <ScrollView
          contentContainerStyle={{ alignItems: "center", paddingVertical: 60 }}
        >
          { }//---- Titre stylé ---- 
          <Text style={styles.title}>Alertes </Text>

          { }//--- Barres principales --- 
          <View style={styles.topBars}>
            {alertes.map((alerte, index) => (
              <View key={index} style={styles.card}>
                <Ionicons
                  name={alerte.icon}
                  size={32}
                  color="#111"
                  style={{ marginBottom: 8 }}
                />
                <Text style={styles.cardTitle}>{alerte.message}</Text>
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
                <Text style={styles.cardValue}>{alerte.niveau}%</Text>
                <View style={styles.buttonsRow}>
                  <TouchableOpacity
                    style={styles.adjustButton}
                    onPress={() => changeNiveau(index, -5)}
                  >
                    <Text style={styles.adjustButtonText}>-</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.adjustButton}
                    onPress={() => changeNiveau(index, +5)}
                  >
                    <Text style={styles.adjustButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: "center" },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.25)", alignItems: "center" },

  // 💎 Titre en style "French Script" (comme les autres pages)
  title: {
    fontSize: 68,
    fontFamily: "GreatVibes_400Regular",
    color: "#D8C3A5", // doré doux
    textAlign: "center",
    marginTop: 20,
    marginBottom: 30,
    letterSpacing: 1,
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowOffset: { width: 2, height: 3 },
    textShadowRadius: 6,
  },

  topBars: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 40,
  },
  card: {
    backgroundColor: "rgba(205, 255, 170, 0.25)",
    borderRadius: 20,
    padding: 20,
    width: "48%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(205, 255, 170, 0.5)",
    elevation: 5,
    marginBottom: 20,
  },
  cardTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  cardValue: { color: "#E0FFE0", fontSize: 14, marginBottom: 12 },
  progressBackground: {
    height: 18,
    width: "100%",
    backgroundColor: "#DDD",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
  },
  progressBar: { height: "100%", borderRadius: 10 },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "center",
    width: "60%",
    marginTop: 5,
    gap: 20,
  },
  adjustButton: {
    backgroundColor: "#558B2F",
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  adjustButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});*/
