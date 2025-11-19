//app/dashboard/accueil.tsx
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { getAuth } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { database } from "../../constants/firebaseconfig";

export default function AccueilScreen() {
  const [arrosage, setArrosage] = useState(false);
  const [data, setData] = useState({
    temperature: 0,
    humiditeAir: 0,
    humiditeSol: 0,
    pumpStatus: "OFF",
    derniereIrrigation: "-",
    prochaineIrrigation: "-",
  });

  // 🌿 Récupération du user connecté
  const auth = getAuth();
  const uid = auth.currentUser?.uid || "ufhI3zN0M3SzPpAQULG66vjLY3D3"; // fallback pour test

  // 🔁 Lire les données en temps réel depuis Firebase
  useEffect(() => {
    const dbRef = ref(database, `users/${uid}/sensor`);

    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const dataFirebase = snapshot.val();
        console.log("📡 Données reçues :", dataFirebase);

        setData({
          temperature: dataFirebase.temperature || 0,
          humiditeAir: dataFirebase.humidity || 0,
          humiditeSol: dataFirebase.soilMoisture || 0,
          pumpStatus: dataFirebase.pumpStatus || "OFF" ,
          derniereIrrigation: "-",
          prochaineIrrigation: "-",
        });

        // synchroniser le bouton avec l'état réel
        setArrosage(dataFirebase.pumpStatus === "ON");
      } else {
        console.log("⚠️ Aucune donnée capteur trouvée !");
      }
    });

    return () => unsubscribe();
  }, [uid]);
   
  const toggleArrosage = async () => {
    const user = getAuth().currentUser;
    if (!user) return alert("Utilisateur non connecté !");

    const token = await user.getIdToken();
    const route = arrosage ? "off" : "on";

    await fetch(`https://smartarr-backend.vercel.app/api/pump/${route}`, {
     method: "POST",
     headers: {
       Authorization: `Bearer ${token}`,
     },
    });

    setArrosage(!arrosage);
  };

 
  /*const toggleArrosage = () => {
    const newStatus = arrosage ? "OFF" : "ON"; // inverse l'état
    setArrosage(!arrosage);
    set(ref(database, `users/${uid}/sensor/pumpStatus`), newStatus); // mise à jour Firebase
  };*/

  // 🎨 Dégradé sable
  const gradientColors = ["#E6D3A3", "#DCC9A1", "#CBB994"] as const;

  // 📊 Cartes
  const cards = [
    { title: "Température de l’air", value: `${data.temperature}°C`, icon: "thermometer-outline" as const },
    { title: "Humidité de l’air", value: `${data.humiditeAir}%`, icon: "cloud-outline" as const },
    { title: "Humidité du sol", value: `${data.humiditeSol}%`, icon: "water-outline" as const },
    { title: "État de la pompe", value: `${data.pumpStatus}`, icon: "speedometer-outline" as const },
    { title: "Dernière irrigation", value: data.derniereIrrigation, icon: "time-outline" as const },
    { title: "Prochaine irrigation", value: data.prochaineIrrigation, icon: "calendar-outline" as const },
  ];

  return (
    <ImageBackground
      source={require("../../assets/tt.jpg")}
      style={styles.background}
      resizeMode="cover">
      <StatusBar barStyle="light-content" />
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={{ alignItems: "center", paddingVertical: 60 }}>
          <Text style={styles.title}>
            SmartArrosage <Text style={{ fontSize: 26 }}>🌱</Text>
          </Text>

          {/* 🔘 Bouton principal */}
          <TouchableOpacity onPress={toggleArrosage}>
            <LinearGradient
              colors={gradientColors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.mainButton}
            >
              <Text style={styles.mainButtonText}>
                {arrosage ? "Arrêter l’arrosage" : "Démarrer l’arrosage"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* 📋 Cartes capteurs */}
          <View style={styles.cardsContainer}>
            {cards.map((card, index) => (
              <View key={index} style={styles.card}>
                <Ionicons name={card.icon} size={32} color="#111" style={{ marginBottom: 6 }} />
                <Text style={styles.cardTitle}>{card.title}</Text>
                <Text style={styles.cardValue}>{card.value}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

// 💅 Styles
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
    textAlign: "center",
    marginBottom: 20,
  },
  mainButton: {
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 40,
    alignItems: "center",
    marginBottom: 30,
    elevation: 5,
  },
  mainButtonText: {
    color: "#2E4600",
    fontSize: 16,
    fontWeight: "600",
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
    width: "40%",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(205, 255, 170, 0.5)",
  },
  cardTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 5,
  },
  cardValue: {
    color: "#E0FFE0",
    fontSize: 13,
    textAlign: "center",
  },
});


/* 
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";



export default function AccueilScreen() {
  const [arrosage, setArrosage] = useState(false);

  const cards = [
    { title: "Température de l’air", value: "26°C", icon: "thermometer-outline" },
    { title: "Humidité de l’air", value: "60%", icon: "cloud-outline" },
    { title: "Humidité du sol", value: "45%", icon: "water-outline" },
    { title: "Niveau d’eau", value: "75%", icon: "speedometer-outline" },
    { title: "Dernière irrigation", value: "2h30", icon: "time-outline" },
    { title: "Prochaine irrigation", value: "12h", icon: "calendar-outline" },
  ];

  // 🌾 Dégradé sable fixe (pour les deux états)
  const gradientColors = ["#E6D3A3", "#DCC9A1", "#CBB994"];

  return (
    <ImageBackground
      source={require("../../assets/tt.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" />

      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={{ alignItems: "center", paddingVertical: 60 }}>
          {}// --- Titre principal --- 
          <Text style={styles.title}>
            SmartArrosage <Text style={{ fontSize: 26 }}>🌱</Text>
          </Text>

          {}// --- Bouton principal avec dégradé sable --- 
          <TouchableOpacity onPress={() => setArrosage(!arrosage)}>
            <LinearGradient
              colors={gradientColors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.mainButton}
            >
              <Text style={styles.mainButtonText}>
                {arrosage ? "Arrêter l’arrosage" : "Démarrer l’arrosage"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {}// --- Cartes d’informations ---
          <View style={styles.cardsContainer}>
            {cards.map((card, index) => (
              <View key={index} style={styles.card}>
                <Ionicons name={card.icon} size={32} color="#111" style={{ marginBottom: 6 }} />
                <Text style={styles.cardTitle}>{card.title}</Text>
                <Text style={styles.cardValue}>{card.value}</Text>
              </View>
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
    textAlign: "center",
    marginBottom: 20,
  },
  mainButton: {
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 40,
    alignItems: "center",
    marginBottom: 30,
    elevation: 5,
  },
  mainButtonText: {
    color: "#2E4600", // 🌿 texte vert foncé pour contraster avec le beige
    fontSize: 16,
    fontWeight: "600",
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
    width: "40%",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(205, 255, 170, 0.5)",
  },
  cardTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 5,
  },
  cardValue: {
    color: "#E0FFE0",
    fontSize: 13,
    textAlign: "center",
  },
});*/
