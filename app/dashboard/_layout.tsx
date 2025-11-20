//app/dashboard/_layout.tsx
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { useTheme } from "./ThemeContext";

export default function TabLayout() {
  const { darkMode } = useTheme(); //aj
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: darkMode ? '#90CAF9' : '#2E7D32',
        tabBarInactiveTintColor: darkMode ? '#BBBBBB' : 'gray',
        tabBarStyle: {
          backgroundColor: darkMode ? '#121212' : '#FFFFFF',
          borderTopColor: darkMode ? "#333" : "#ccc",
        },
      }}
    >
      <Tabs.Screen name="accueil" options={{
        title: 'Accueil',
        tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
      }} />

      <Tabs.Screen name="explorer" options={{
        title: 'Explorer',
        tabBarIcon: ({ color }) => <Ionicons name="compass" size={24} color={color} />,
      }} />

      <Tabs.Screen name="statistiques" options={{
        title: 'Statistiques',
        tabBarIcon: ({ color }) => <Ionicons name="bar-chart" size={24} color={color} />,
      }} />

      <Tabs.Screen name="controle" options={{
        title: 'Contrôle',
        tabBarIcon: ({ color }) => <Ionicons name="settings" size={24} color={color} />,
      }} />

      <Tabs.Screen name="alertes" options={{
        title: 'Alertes',
        tabBarIcon: ({ color }) => <Ionicons name="notifications" size={24} color={color} />,
      }} />

      <Tabs.Screen name="parametres" options={{
        title: 'Paramètres',
        tabBarIcon: ({ color }) => <Ionicons name="options" size={24} color={color} />,
      }} />
    </Tabs>
  );
}
  /*return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2E7D32',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tabs.Screen name="accueil" options={{ title: 'Accueil', tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} /> }} />
      <Tabs.Screen name="explorer" options={{ title: 'Explorer', tabBarIcon: ({ color }) => <Ionicons name="compass" size={24} color={color} /> }} />
      <Tabs.Screen name="statistiques" options={{ title: 'Statistiques', tabBarIcon: ({ color }) => <Ionicons name="bar-chart" size={24} color={color} /> }} />
      <Tabs.Screen name="controle" options={{ title: 'Contrôle', tabBarIcon: ({ color }) => <Ionicons name="settings" size={24} color={color} /> }} />
      <Tabs.Screen name="alertes" options={{ title: 'Alertes', tabBarIcon: ({ color }) => <Ionicons name="notifications" size={24} color={color} /> }} />
      <Tabs.Screen name="parametres" options={{ title: 'Paramètres', tabBarIcon: ({ color }) => <Ionicons name="options" size={24} color={color} /> }} />
    </Tabs>
  );
}*/
