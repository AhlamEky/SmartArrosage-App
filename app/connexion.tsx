//app/connexion.tsx
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth"; //aj
import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { auth } from "../constants/firebaseconfig"; //aj

export default function ConnexionScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);//aj

//aj
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Veuillez saisir votre email et mot de passe.");
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Connexion réussie ✅");
      router.replace("/dashboard/accueil");
    } catch (error: any) {
      console.error("Erreur de connexion :", error.message);
      Alert.alert("Erreur", "Email ou mot de passe incorrect.");
    } finally {
      setLoading(false);
    }
  };
//

  return (
    <ImageBackground
      source={require("../assets/plante.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>SmartArr 🌿</Text>
          <Text style={styles.subtitle}>Bienvenue , Connectez-vous !</Text>

          <TextInput
            placeholder="Email"
            placeholderTextColor="#e7efe7"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            placeholder="Mot de passe"
            placeholderTextColor="#e7efe7"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.replace("/dashboard/accueil")}
          >
            <Text style={styles.loginText}>Se connecter</Text>
          </TouchableOpacity>

          <View style={styles.bottomText}>
            <Text style={{ color: "#fff" }}>Vous n'avez pas de compte ?</Text>
            <TouchableOpacity onPress={() => router.push("/inscription")}>
              <Text style={styles.signUpText}> S'inscrire</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: "center" },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 25,
    padding: 25,
    width: "85%",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#e7efe7",
    textAlign: "center",
    marginBottom: 25,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 12,
    height: 50,
    color: "#fff",
  },
  loginButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },
  loginText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  bottomText: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 18,
  },
  signUpText: {
    color: "#8DF08D",
    fontWeight: "bold",
  },
});
