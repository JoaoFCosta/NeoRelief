import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

export default function HomeScreen() {
  const [donates, setDonates] = useState([]);
  const [needs, setNeeds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const donateResponse = await fetch(
          "https://www.globallinkapi.somee.com/api/Donates"
        );
        const donateJson = await donateResponse.json();

        const needsResponse = await fetch(
          "https://www.globallinkapi.somee.com/api/Needs"
        );
        const needsJson = await needsResponse.json();

        setDonates(donateJson);
        setNeeds(needsJson);
      } catch (error) {
        console.log("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Doações</Text>

      <FlatList
        data={donates}
        horizontal
        style={{ marginBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.empresaNome}</Text>
            <Text style={styles.cardTitle}>{item.tipo}</Text>
            <Text style={styles.cardText}>{item.observacoes}</Text>
            <Text style={styles.cardInfo}>Status: {item.status}</Text>
          </View>
        )}
      />

      <Text style={styles.title}>Necessidades</Text>

      <FlatList
        data={needs}
        horizontal
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.ongNome}</Text>
            <Text style={styles.cardTitle}>
              {item.necessidadeTitulo || item.name}
            </Text>
            <Text style={styles.cardText}>{item.categoria}</Text>
            <Text style={styles.cardText}>{item.necessidadeDescricao}</Text>
            {item.urgencia && (
              <Text style={styles.cardInfo}>Urgência: {item.urgencia}</Text>
            )}
            <Text style={styles.cardInfo}>{item.local}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },

  card: {
    width: 240,
    backgroundColor: "#f3f3f3",
    padding: 20,
    borderRadius: 15,
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },

  cardText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },

  cardInfo: {
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
});
