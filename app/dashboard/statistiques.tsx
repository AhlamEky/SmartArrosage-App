// app/dashboard/statistiques.tsx
import * as FileSystem from "expo-file-system";
import { LinearGradient } from "expo-linear-gradient";
import { getAuth } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Button, Dimensions, ImageBackground, ScrollView, Text, View } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { database } from "../../constants/firebaseconfig";
import { generatePDF, uploadToCloudinary } from "../../services/pdfCloudinary";

const cacheDir: string = (FileSystem as any).cacheDirectory;
// --- CONFIG GRAPHIQUES GLOBALE ---
const chartConfig = {
  backgroundGradientFrom: "#FFFFFF",
  backgroundGradientTo: "#FFFFFF",
  color: (opacity = 1) => `rgba(72, 89, 53, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(72, 89, 53, ${opacity})`,
  fillShadowGradientOpacity: 1,
  barPercentage: 0.6,
  propsForBackgroundLines: { strokeWidth: 0 },
};

// --- TYPES DU CARD ---
type CardProps = { title: string; data: any; color: string; description: string };

export default function StatistiquesScreen() {
  const screenHeight = Dimensions.get("window").height;
  const auth = getAuth();

  const [uid, setUid] = useState<string | null>(null);
  const [soilHumidity, setSoilHumidity] = useState(0);
  const [airHumidity, setAirHumidity] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [waterLevel, setWaterLevel] = useState(0);

  // --- Vérifie l'authentification ---
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) setUid(user.uid);
      else setUid(null);
    });
    return () => unsubscribe();
  }, []);

  // --- Charge les données si l'utilisateur est connecté ---
  useEffect(() => {
    if (!uid) return;
    const path = ref(database, `users/${uid}/sensor`);
    const unsub = onValue(path, snap => {
      if (snap.exists()) {
        const data = snap.val();
        setSoilHumidity(data.soilMoisture || 0);
        setAirHumidity(data.humidity || 0);
        setTemperature(data.temperature || 0);
        setWaterLevel(data.waterLevel || 0);
      }
    });
    return () => unsub();
  }, [uid]);

  // --- Graphiques ---
  const humiditeSolData = { labels: ["Mesurée", "Manquant"], datasets: [{ data: [soilHumidity, 100 - soilHumidity] }] };
  const temperatureAirData = { labels: ["Temp", "Max 50°"], datasets: [{ data: [temperature, 50 - temperature] }] };
  const humiditeAirData = { labels: ["Mesurée", "Manquant"], datasets: [{ data: [airHumidity, 100 - airHumidity] }] };
  const niveauEauData = { labels: ["Niveau", "Vide"], datasets: [{ data: [waterLevel, 100 - waterLevel] }] };

  if (!uid) {
    return <Text style={{ textAlign: "center", marginTop: 50, fontSize: 18 }}>Chargement...</Text>;
  }

  return (
    <LinearGradient colors={["#E8F3DC", "#DCEFC3", "#C8E4A8"]} style={{ flex: 1 }}>
      <ImageBackground source={require("../../assets/tt.jpg")} resizeMode="cover" style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingVertical: 60, paddingHorizontal: 16, minHeight: screenHeight, alignItems: "center" }}>
          <Text style={{ fontSize: 32, fontWeight: "bold", marginBottom: 40, color: "#fff", textAlign: "center" }}>
            📊 Statistiques 🌱
          </Text>

          <Card title="Humidité du sol" data={humiditeSolData} color="#A8E6A3" description="Humidité réelle du sol" />
          <Card title="Température de l’air" data={temperatureAirData} color="#FFB84C" description="Température actuelle" />
          <Card title="Humidité de l’air" data={humiditeAirData} color="#A8E6A3" description="Humidité de l’air" />
          <Card title="Niveau de l’eau" data={niveauEauData} color="#76C893" description="Niveau d’eau réel" />


         
          <Button
            title="Exporter PDF"
            onPress={async () => {
              const html = `
                <h1>Statistiques Smart Arrosage</h1>
                <p>Humidité du sol : ${soilHumidity}%</p>
                <p>Humidité de l'air : ${airHumidity}%</p>
                <p>Température de l'air : ${temperature}°C</p>
                <p>Niveau de l'eau : ${waterLevel}%</p>
              `;
              const pdfUri = await generatePDF(html);
              const cloudUrl = await uploadToCloudinary(pdfUri);
              alert("PDF uploadé : " + cloudUrl);
            }}
          />
      
        </ScrollView>
      </ImageBackground>
    </LinearGradient>
  );
}

// --- CARD COMPONENT ---
function Card({ title, data, color, description }: CardProps) {
  return (
    <View style={{ backgroundColor: "rgba(255,255,255,0.8)", borderRadius: 25, alignItems: "center", width: 340, height: 380, elevation: 4, paddingVertical: 20, marginBottom: 30 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", color: "#485935", marginBottom: 20 }}>{title}</Text>
      <BarChart data={data} width={280} height={220} chartConfig={{ ...chartConfig, fillShadowGradient: color }} fromZero yAxisLabel="" yAxisSuffix="%" showValuesOnTopOfBars withInnerLines={false} />
      <Text style={{ marginTop: 15, fontSize: 16, color: "#485935", textAlign: "center" }}>{description}</Text>
    </View>
  );
}
