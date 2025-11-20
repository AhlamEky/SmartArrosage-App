//app/dashboard/statistiques.tsx
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from "react-native";
import { BarChart } from "react-native-chart-kit";

import { getAuth } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import { database } from "../../constants/firebaseconfig";

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
type CardProps = {
  title: string;
  data: any;
  color: string;
  description: string;
};

export default function StatistiquesScreen() {
  const screenHeight = Dimensions.get("window").height;

  const auth = getAuth();
  const uid =
    auth.currentUser?.uid || "ufhI3zN0M3SzPpAQULG66vjLY3D3";

  const [soilHumidity, setSoilHumidity] = useState(0);
  const [airHumidity, setAirHumidity] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [waterLevel, setWaterLevel] = useState(0);

  useEffect(() => {
    const path = ref(database, `users/${uid}/sensor`);

    const unsub = onValue(path, (snap) => {
      if (snap.exists()) {
        const data = snap.val();
        setSoilHumidity(data.humidity || 0);
        setAirHumidity(data.soilMoisture || 0);
        setTemperature(data.temperature || 0);
        setWaterLevel(data.waterLevel || 0);
      }
    });

    return () => unsub();
  }, [uid]);

  // --- Jeux de données ---
  const humiditeSolData = {
    labels: ["Mesurée", "Manquant"],
    datasets: [{ data: [soilHumidity, 100 - soilHumidity] }],
  };

  const temperatureAirData = {
    labels: ["Temp", "Max 50°"],
    datasets: [{ data: [temperature, 50 - temperature] }],
  };

  const humiditeAirData = {
    labels: ["Mesurée", "Manquant"],
    datasets: [{ data: [airHumidity, 100 - airHumidity] }],
  };

  const niveauEauData = {
    labels: ["Niveau", "Vide"],
    datasets: [{ data: [waterLevel, 100 - waterLevel] }],
  };

  return (
    <LinearGradient
      colors={["#E8F3DC", "#DCEFC3", "#C8E4A8"]}
      style={{ flex: 1 }}
    >
      <ImageBackground
        source={require("../../assets/tt.jpg")}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingVertical: 60,
            paddingHorizontal: 16,
            minHeight: screenHeight,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
              marginBottom: 40,
              color: "#fff",
              textAlign: "center",
            }}
          >
            📊 Statistiques 🌱
          </Text>

          <Card
            title="Humidité du sol"
            data={humiditeSolData}
            color="#A8E6A3"
            description="Humidité réelle du sol"
          />

          <Card
            title="Température de l’air"
            data={temperatureAirData}
            color="#FFB84C"
            description="Température actuelle"
          />

          <Card
            title="Humidité de l’air"
            data={humiditeAirData}
            color="#A8E6A3"
            description="Humidité de l’air"
          />

          <Card
            title="Niveau de l’eau"
            data={niveauEauData}
            color="#76C893"
            description="Niveau d’eau réel"
          />
        </ScrollView>
      </ImageBackground>
    </LinearGradient>
  );
}

// --- CARD COMPONENT ---
function Card({ title, data, color, description }: CardProps) {
  return (
    <View
      style={{
        backgroundColor: "rgba(255,255,255,0.8)",
        borderRadius: 25,
        alignItems: "center",
        width: 340,
        height: 380,
        elevation: 4,
        paddingVertical: 20,
        marginBottom: 30,
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          color: "#485935",
          marginBottom: 20,
        }}
      >
        {title}
      </Text>

      <BarChart
        data={data}
        width={280}
        height={220}
        chartConfig={{
          ...chartConfig,
          fillShadowGradient: color,
        }}
        fromZero
        yAxisLabel=""
        yAxisSuffix="%"
        showValuesOnTopOfBars
        withInnerLines={false}
      />

      <Text
        style={{
          marginTop: 15,
          fontSize: 16,
          color: "#485935",
          textAlign: "center",
        }}
      >
        {description}
      </Text>
    </View>
  );
}


/*import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Dimensions, ImageBackground, ScrollView, Text, View } from "react-native";
import { BarChart } from "react-native-chart-kit";

export default function StatistiquesScreen() {
  const screenWidth = Dimensions.get("window").width - 32;
  const screenHeight = Dimensions.get("window").height;

  // --- Données pour chaque statistique ---
  const humiditeSolData = {
    labels: ["Humidité", "Manquant"],
    datasets: [{ data: [45, 55] }],
  };

  const temperatureAirData = {
    labels: ["Actuelle", "Restante"],
    datasets: [{ data: [24, 76] }],
  };

  const humiditeAirData = {
    labels: ["Mesurée", "Manquante"],
    datasets: [{ data: [60, 40] }],
  };

  const niveauEauData = {
    labels: ["Actuel", "Restant"],
    datasets: [{ data: [70, 30] }],
  };

  const irrigationData = {
    labels: ["Dernière", "Prochaine"],
    datasets: [{ data: [2, 5] }], // ex : jours entre les irrigations
  };

  // --- Style des graphiques ---
  const chartConfig = {
    backgroundGradientFrom: "transparent",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "transparent",
    backgroundGradientToOpacity: 0,
    fillShadowGradientOpacity: 1,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // texte et axes en noir
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    barPercentage: 0.6,
    propsForBackgroundLines: {
      strokeWidth: 0,
    },
  };

  return (
    <LinearGradient
      colors={["#E8F3DC", "#DCEFC3", "#C8E4A8"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <ImageBackground
        source={require("../../assets/tt.jpg")}
// 🌿 ton image de fond
        style={{ flex: 1, resizeMode: "cover" }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 60,
            paddingHorizontal: 16,
            minHeight: screenHeight,
          }}
        >
          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
              marginBottom: 40,
              color: "#334422",
              textAlign: "center",
            }}
          >
            📊 Statistiques
          </Text>

          {}// --- Bloc Humidité du sol --- 
          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.8)",
              borderRadius: 25,
              alignItems: "center",
              justifyContent: "center",
              width: 340,
              height: 380,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 6,
              elevation: 4,
              paddingVertical: 20,
              marginBottom: 30,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: "#485935",
                marginBottom: 20,
              }}
            >
              Humidité du sol
            </Text>

            <BarChart
              data={humiditeSolData}
              width={280}
              height={220}
              chartConfig={{
                ...chartConfig,
                fillShadowGradient: "#A8E6A3", // ✅ vert pistache clair
              }}
              fromZero
              showValuesOnTopOfBars
              withInnerLines={false}
            />

            <Text
              style={{
                marginTop: 15,
                fontSize: 16,
                color: "#485935",
                textAlign: "center",
              }}
            >
              Taux d’humidité mesuré et manquant
            </Text>
          </View>

          {}// --- Bloc Température de l’air --- 
          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.8)",
              borderRadius: 25,
              alignItems: "center",
              justifyContent: "center",
              width: 340,
              height: 380,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 6,
              elevation: 4,
              paddingVertical: 20,
              marginBottom: 30,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: "#485935",
                marginBottom: 20,
              }}
            >
              Température de l’air
            </Text>

            <BarChart
              data={temperatureAirData}
              width={280}
              height={220}
              chartConfig={{
                ...chartConfig,
                fillShadowGradient: "#FFB84C", // orange doux
              }}
              fromZero
              showValuesOnTopOfBars
              withInnerLines={false}
            />

            <Text
              style={{
                marginTop: 15,
                fontSize: 16,
                color: "#485935",
                textAlign: "center",
              }}
            >
              Température actuelle et restante
            </Text>
          </View>

          {} --- Bloc Humidité de l’air --- 
          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.8)",
              borderRadius: 25,
              alignItems: "center",
              justifyContent: "center",
              width: 340,
              height: 380,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 6,
              elevation: 4,
              paddingVertical: 20,
              marginBottom: 30,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: "#485935",
                marginBottom: 20,
              }}
            >
              Humidité de l’air
            </Text>

            <BarChart
              data={humiditeAirData}
              width={280}
              height={220}
              chartConfig={{
                ...chartConfig,
                fillShadowGradient: "#A8E6A3", // vert pistache
              }}
              fromZero
              showValuesOnTopOfBars
              withInnerLines={false}
            />

            <Text
              style={{
                marginTop: 15,
                fontSize: 16,
                color: "#485935",
                textAlign: "center",
              }}
            >
              Niveau d’humidité de l’air
            </Text>
          </View>

          {} --- Bloc Niveau d’eau --- 
          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.8)",
              borderRadius: 25,
              alignItems: "center",
              justifyContent: "center",
              width: 340,
              height: 380,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 6,
              elevation: 4,
              paddingVertical: 20,
              marginBottom: 30,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: "#485935",
                marginBottom: 20,
              }}
            >
              Niveau de l’eau
            </Text>

            <BarChart
              data={niveauEauData}
              width={280}
              height={220}
              chartConfig={{
                ...chartConfig,
                fillShadowGradient: "#76C893", // vert d’eau
              }}
              fromZero
              showValuesOnTopOfBars
              withInnerLines={false}
            />

            <Text
              style={{
                marginTop: 15,
                fontSize: 16,
                color: "#485935",
                textAlign: "center",
              }}
            >
              Niveau actuel et restant de l’eau
            </Text>
          </View>

          {} --- Bloc Irrigation ---
          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.8)",
              borderRadius: 25,
              alignItems: "center",
              justifyContent: "center",
              width: 340,
              height: 380,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 6,
              elevation: 4,
              paddingVertical: 20,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: "#485935",
                marginBottom: 20,
              }}
            >
              Irrigation
            </Text>

            <BarChart
              data={irrigationData}
              width={280}
              height={220}
              chartConfig={{
                ...chartConfig,
                fillShadowGradient: "#9DC08B", // vert doux
              }}
              fromZero
              showValuesOnTopOfBars
              withInnerLines={false}
            />

            <Text
              style={{
                marginTop: 15,
                fontSize: 16,
                color: "#485935",
                textAlign: "center",
              }}
            >
              Dernière et prochaine irrigation (jours)
            </Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </LinearGradient>
  );
}*/
