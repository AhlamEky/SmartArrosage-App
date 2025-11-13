import { GreatVibes_400Regular } from "@expo-google-fonts/great-vibes";
import { Poppins_600SemiBold, useFonts } from "@expo-google-fonts/poppins";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ParametresScreen() {
  // Charger les polices
  const [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    GreatVibes_400Regular,
  });

  const [darkMode, setDarkMode] = useState(false);
  const [nom, setNom] = useState("Aya Jabrane");
  const [email, setEmail] = useState("aya@example.com");
  const [telephone, setTelephone] = useState("+212 600 000 000");
  const [motDePasse, setMotDePasse] = useState("********");
  const [langue, setLangue] = useState("fr");

  const toggleTheme = () => setDarkMode(!darkMode);

  const langues = [
    { label: "Français", value: "fr" },
    { label: "Anglais", value: "en" },
    { label: "Espagnol", value: "es" },
    { label: "Allemand", value: "de" },
    { label: "Italien", value: "it" },
    { label: "Arabe", value: "ar" },
    { label: "Chinois", value: "zh" },
    { label: "Japonais", value: "ja" },
  ];

  const overlayColor = darkMode ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.25)";
  const cardBackground = darkMode
    ? "rgba(50,50,50,0.85)"
    : "rgba(205, 255, 170, 0.25)";
  const inputBackground = darkMode ? "#555" : "rgba(255,255,255,0.85)";
  const textColor = darkMode ? "#fff" : "#111";
  const placeholderColor = darkMode ? "#ccc" : "#555";
  const buttonColor = darkMode ? "#4CAF50" : "#6BA36F"; // ✅ couleur d'origine du bouton

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
        <ActivityIndicator size="large" color="#4CAF50" />
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
      <View style={[styles.overlay, { backgroundColor: overlayColor }]}>
        <ScrollView
          contentContainerStyle={{ alignItems: "center", paddingVertical: 50 }}
        >
          {/* ---- Titre ---- */}
          <Text style={[styles.title, { color: "#D8C3A5" }]}>
            Paramètres
          </Text>

          {/* ---- Mode sombre ---- */}
          <View style={[styles.card, { backgroundColor: cardBackground }]}>
            <View style={styles.row}>
              <Text style={[styles.cardTitle, { color: textColor }]}>
                Mode sombre
              </Text>
              <Switch
                value={darkMode}
                onValueChange={toggleTheme}
                trackColor={{ false: "#C8DDB7", true: "#4CAF50" }}
                thumbColor="#fff"
              />
            </View>
          </View>

          {/* ---- Informations personnelles ---- */}
          <View style={[styles.card, { backgroundColor: cardBackground }]}>
            <Text style={[styles.cardTitle, { color: textColor }]}>
              Informations personnelles
            </Text>

            <TextInput
              value={nom}
              onChangeText={setNom}
              style={[
                styles.input,
                { backgroundColor: inputBackground, color: textColor },
              ]}
              placeholder="Nom"
              placeholderTextColor={placeholderColor}
            />
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={[
                styles.input,
                { backgroundColor: inputBackground, color: textColor },
              ]}
              placeholder="Email"
              keyboardType="email-address"
              placeholderTextColor={placeholderColor}
            />
            <TextInput
              value={telephone}
              onChangeText={setTelephone}
              style={[
                styles.input,
                { backgroundColor: inputBackground, color: textColor },
              ]}
              placeholder="Téléphone"
              keyboardType="phone-pad"
              placeholderTextColor={placeholderColor}
            />
            <TextInput
              value={motDePasse}
              onChangeText={setMotDePasse}
              style={[
                styles.input,
                { backgroundColor: inputBackground, color: textColor },
              ]}
              placeholder="Mot de passe"
              secureTextEntry
              placeholderTextColor={placeholderColor}
            />
          </View>

          {/* ---- Langue ---- */}
          <View style={[styles.card, { backgroundColor: cardBackground }]}>
            <Text style={[styles.cardTitle, { color: textColor }]}>Langue</Text>
            <View
              style={[
                styles.pickerContainer,
                { backgroundColor: inputBackground },
              ]}
            >
              <Picker
                selectedValue={langue}
                onValueChange={(value) => setLangue(value)}
                style={[styles.picker, { color: textColor }]}
              >
                {langues.map((l) => (
                  <Picker.Item key={l.value} label={l.label} value={l.value} />
                ))}
              </Picker>
            </View>
          </View>

          {/* ---- Bouton Sauvegarder ---- */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: buttonColor }]}
            onPress={() => alert("Paramètres sauvegardés ✅")}
          >
            <Text style={styles.buttonText}>Sauvegarder</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

// ---------------------- STYLES ---------------------- //
const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, alignItems: "center" },
  title: {
    fontSize: 50,
    fontFamily: "GreatVibes_400Regular", // 💎 Style French Script
    textAlign: "center",
    marginTop: 4, // 🔥 le titre descend un peu
    marginBottom: 15,
    letterSpacing: 1,
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowOffset: { width: 2, height: 3 },
    textShadowRadius: 6,
  },
  card: {
    borderRadius: 18,
    padding: 20,
    width: "90%",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(205, 255, 170, 0.5)",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  cardTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 12 },
  input: {
    width: "100%",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    textAlign: "center",
  },
  pickerContainer: {
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#C8DDB7",
  },
  picker: { height: 50, textAlign: "center" },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
    elevation: 5,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
