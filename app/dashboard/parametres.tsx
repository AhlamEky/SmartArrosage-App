import { GreatVibes_400Regular } from "@expo-google-fonts/great-vibes";
import { Poppins_600SemiBold, useFonts } from "@expo-google-fonts/poppins";
import React, { useEffect, useState } from "react";
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

// 🔥 IMPORT FIREBASE
import { getAuth } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import { database } from "../../constants/firebaseconfig";

export default function ParametresScreen() {
  const [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    GreatVibes_400Regular,
  });

  // 🌿 États
  const [darkMode, setDarkMode] = useState(false);

  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [motDePasse, setMotDePasse] = useState("********");
  const [langue, setLangue] = useState("fr");

  // 🔥 Auth
  const auth = getAuth();
  const uid = auth.currentUser?.uid || "ufhI3zN0M3SzPpAQULG66vjLY3D3";

  // 📌 Récupérer les données personnelles depuis Firebase
  useEffect(() => {
    const userRef = ref(database, `users/${uid}`);

    const unsubscribe = onValue(userRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();

        setNom(data.nom || "");
        setEmail(data.email || "");
        setTelephone(data.telephone || "");
      }
    });

    return () => unsubscribe();
  }, [uid]);

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
  const buttonColor = darkMode ? "#4CAF50" : "#6BA36F";

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#E8F5E9" }}>
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
        <ScrollView contentContainerStyle={{ alignItems: "center", paddingVertical: 50 }}>
          
          <Text style={[styles.title, { color: "#fff", fontWeight: "bold", marginBottom: 40 }]}>Paramètres 🌱</Text>

          {/* ---- Mode sombre ---- */}
          <View style={[styles.card, { backgroundColor: cardBackground }]}>
            <View style={styles.row}>
              <Text style={[styles.cardTitle, { color: textColor }]}>Mode sombre</Text>
              <Switch value={darkMode} onValueChange={toggleTheme} trackColor={{ false: "#C8DDB7", true: "#4CAF50" }} thumbColor="#fff" />
            </View>
          </View>

          {/* ---- Informations personnelles ---- */}
          <View style={[styles.card, { backgroundColor: cardBackground }]}>
            <Text style={[styles.cardTitle, { color: textColor }]}>Informations personnelles</Text>

            <TextInput
              value={nom}
              onChangeText={setNom}
              style={[styles.input, { backgroundColor: inputBackground, color: textColor }]}
              placeholder="Nom"
              placeholderTextColor={placeholderColor}
            />

            <TextInput
              value={email}
              onChangeText={setEmail}
              style={[styles.input, { backgroundColor: inputBackground, color: textColor }]}
              placeholder="Email"
              keyboardType="email-address"
              placeholderTextColor={placeholderColor}
            />

            <TextInput
              value={telephone}
              onChangeText={setTelephone}
              style={[styles.input, { backgroundColor: inputBackground, color: textColor }]}
              placeholder="Téléphone"
              keyboardType="phone-pad"
              placeholderTextColor={placeholderColor}
            />
          </View>

          {/* ---- Langue ---- 
          <View style={[styles.card, { backgroundColor: cardBackground }]}>
            <Text style={[styles.cardTitle, { color: textColor }]}>Langue</Text>
            <View style={[styles.pickerContainer, { backgroundColor: inputBackground }]}>
              <Picker selectedValue={langue} onValueChange={setLangue} style={[styles.picker, { color: textColor }]}>
                {langues.map((l) => (
                  <Picker.Item key={l.value} label={l.label} value={l.value} />
                ))}
              </Picker>
            </View>
          </View>*/}

          <TouchableOpacity style={[styles.button, { backgroundColor: buttonColor }]}>
            <Text style={styles.buttonText}>Sauvegarder</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, alignItems: "center" },
  title: {
    fontSize: 30,
   // fontFamily: "GreatVibes_400Regular",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 15,
    letterSpacing: 1,
    textShadowColor: "rgba(0,0,0,0.4)",
   // textShadowOffset: { width: 2, height: 3 },
   // textShadowRadius: 6,
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
  picker: { height: 50 },
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
