//app/inscription.tsx
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { API_URL } from "../constants/API_URL";

export default function InscriptionScreen() {
  const router = useRouter();
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!nom || !email || !telephone || !password || !confirmPassword) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs !");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas !");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom,
          email,
          telephone,
          password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      Alert.alert("Succès", "Inscription réussie !");
      router.replace("/dashboard/accueil");

    } catch (error: any) {
      Alert.alert("Erreur", error.message || "Échec de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/plante.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar barStyle="dark-content" />

      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>SmartArr 🌱</Text>
          <Text style={styles.subtitle}>Créer un nouveau compte</Text>

          <TextInput placeholder="Nom complet" style={styles.input} value={nom} onChangeText={setNom}/>
          <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail}/>
          <TextInput placeholder="Téléphone" style={styles.input} value={telephone} onChangeText={setTelephone}/>
          <TextInput placeholder="Mot de passe" secureTextEntry style={styles.input} value={password} onChangeText={setPassword}/>
          <TextInput placeholder="Confirmer le mot de passe" secureTextEntry style={styles.input} value={confirmPassword} onChangeText={setConfirmPassword}/>

          <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
            <Text style={styles.signupText}>S’inscrire</Text>
          </TouchableOpacity>

          <View style={styles.bottomText}>
            <Text style={{ color: "#fff" }}>Déjà un compte ?</Text>
            <TouchableOpacity onPress={() => router.push("/connexion")}>
              <Text style={styles.signInText}> Se connecter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
/*import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"; //aj
import { ref, set } from "firebase/database"; //aj
import { auth, database } from "../constants/firebaseconfig"; //aj

export default function InscriptionScreen() {
  const router = useRouter();
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);//aj

  const handleSignup = async () => {
    if (!nom || !email || !telephone || !password || !confirmPassword) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs !");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas !");
      return;
    }
//aj
    try {
      setLoading(true);

      // 🔐 Création du compte utilisateur Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 🧠 Ajout du nom à l’auth Firebase
      await updateProfile(user, { displayName: nom });

      // 💾 Enregistrement des infos supplémentaires dans Realtime Database
      await set(ref(database, "users/" + user.uid), {
        nom,
        email,
        telephone,
        createdAt: new Date().toISOString(),
      });

      Alert.alert("Succès", "Inscription réussie !");
      router.replace("/dashboard/accueil"); // 🔁 Redirection
    } catch (error: any) {
      console.error(error);
      let message = "Erreur d’inscription.";

      if (error.code === "auth/email-already-in-use") {
        message = "Cet email est déjà utilisé.";
      } else if (error.code === "auth/invalid-email") {
        message = "Email invalide.";
      } else if (error.code === "auth/weak-password") {
        message = "Mot de passe trop faible (min. 6 caractères).";
      }

      Alert.alert("Erreur", message);
    } finally {
      setLoading(false);
    }
//
   /* // Ici tu peux ajouter ton appel API ou logique d’inscription
    Alert.alert("Succès", "Inscription réussie !");
    router.replace("/dashboard/accueil");*/
/*  };

  return (
    <ImageBackground
      source={require("../assets/plante.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar barStyle="dark-content" />

      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>
            SmartArr <Text style={{ fontSize: 26 }}>🌱</Text>
          </Text>
          <Text style={styles.subtitle}>Créer un nouveau compte</Text>

          <TextInput
            placeholder="Nom complet"
            placeholderTextColor="#e7efe7"
            value={nom}
            onChangeText={setNom}
            style={styles.input}
          />

          <TextInput
            placeholder="Email"
            placeholderTextColor="#e7efe7"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />

          <TextInput
            placeholder="Numéro de téléphone"
            placeholderTextColor="#e7efe7"
            keyboardType="phone-pad"
            value={telephone}
            onChangeText={setTelephone}
            style={styles.input}
          />

          <TextInput
            placeholder="Mot de passe"
            placeholderTextColor="#e7efe7"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />

          <TextInput
            placeholder="Confirmer le mot de passe"
            placeholderTextColor="#e7efe7"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.input}
          />

          <TouchableOpacity style={[styles.signupButton, loading && { opacity: 0.7 }]} onPress={handleSignup} disabled={loading}>
            <Text style={styles.signupText}>S’inscrire</Text>
          </TouchableOpacity>

          <View style={styles.bottomText}>
            <Text style={{ color: "#fff" }}>Déjà un compte ?</Text>
            <TouchableOpacity onPress={() => router.push("/connexion")}>
              <Text style={styles.signInText}> Se connecter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
*/
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
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
  signupButton: {
    backgroundColor: "#FFB74D", // bouton orange doux
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },
  signupText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  bottomText: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 18,
  },
  signInText: {
    color: "#8DF08D",
    fontWeight: "bold",
  },
});
