import { GreatVibes_400Regular, useFonts } from "@expo-google-fonts/great-vibes";
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

export default function ControleScreen() {
  const [fontsLoaded] = useFonts({ GreatVibes_400Regular });

  const [systemActive, setSystemActive] = useState(true);
  const [modeAuto, setModeAuto] = useState(true);
  const [waterLevel, setWaterLevel] = useState(75);

  const toggleSystem = () => setSystemActive(!systemActive);
  const toggleMode = () => setModeAuto(!modeAuto);
  const refillWater = () => setWaterLevel(100);

  const cards = [
    {
      title: systemActive ? "Système actif" : "Système désactivé",
      description: systemActive
        ? "Tous les capteurs fonctionnent correctement."
        : "Le système est actuellement en pause.",
      icon: systemActive ? "checkmark-circle" : "alert-circle",
      button: systemActive ? "Désactiver le système" : "Activer le système",
      onPress: toggleSystem,
    },
    {
      title: modeAuto ? "Mode Automatique" : "Mode Manuel",
      description: modeAuto
        ? "Le système ajuste les paramètres automatiquement."
        : "Contrôle manuel activé.",
      icon: modeAuto ? "sync-circle" : "hand-left",
      button: modeAuto
        ? "Passer en mode manuel"
        : "Passer en mode automatique",
      onPress: toggleMode,
    },
    {
      title: "Niveau d’eau du réservoir",
      description: `Le réservoir contient ${waterLevel}% d’eau.`,
      icon: "water-outline",
      button: "Remplir le réservoir",
      onPress: refillWater,
    },
  ];

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
      source={require("../../assets/q.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.overlay}>
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            paddingVertical: 60,
          }}
        >
          {/* ---- Titre stylé ---- */}
          <Text style={styles.title}> Contrôle du système</Text>

          <View style={styles.cardsContainer}>
            {cards.map((card, index) => (
              <View key={index} style={styles.card}>
                <Ionicons
                  name={card.icon}
                  size={32}
                  color="#111"
                  style={{ marginBottom: 6 }}
                />
                <Text style={styles.cardTitle}>{card.title}</Text>
                <Text style={styles.cardValue}>{card.description}</Text>
                <TouchableOpacity
                  onPress={card.onPress}
                  style={[
                    styles.button,
                    {
                      backgroundColor:
                        card.title.includes("désactivé") ||
                        card.title.includes("Manuel") ||
                        card.title.includes("Niveau")
                          ? "#8BC34A"
                          : "#558B2F",
                    },
                  ]}
                >
                  <Text style={styles.buttonText}>{card.button}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

// ---------------------- STYLES ---------------------- //
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
    fontSize: 48,
    fontFamily: "GreatVibes_400Regular", // 💎 Style French Script
    color: "#D8C3A5", // beige doré élégant
    textAlign: "center",
    marginTop: 10,
    marginBottom: 15,
    letterSpacing: 1,
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowOffset: { width: 2, height: 3 },
    textShadowRadius: 6,
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
  },
  card: {
    backgroundColor: "rgba(205, 255, 170, 0.25)",
    borderRadius: 18,
    padding: 20,
    width: "90%",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(205, 255, 170, 0.5)",
    elevation: 5,
  },
  cardTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 5,
  },
  cardValue: {
    color: "#E0FFE0",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 15,
  },
  button: {
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 25,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
