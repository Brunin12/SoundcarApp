import { StyleSheet, View, Image, FlatList } from "react-native";
import {
  ActivityIndicator,
  MD2Colors,
  Card,
  Button,
  Searchbar,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import CardResult from "../components/CardResult";
import Alert from "../components/Alert";

import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Gadget {
  id: Number;
  name: string;
  owner: string;
  date: string;
  budget: string;
}

function Home() {
  const [loading, setLoading] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  useEffect(() => {
    loadInitialData(); // Carrega os dados iniciais
  }, []);

  const loadInitialData = async () => {
    try {
      const data = await AsyncStorage.getItem("aparelhos");
      if (data !== null) {
        const results = JSON.parse(data);
        if (results.length === 0) {
          setNoResult(true);
          setSearchResult([]);
        } else {
          setNoResult(false);
          setSearchResult(results);
        }
      }
    } catch (error) {
      console.error("Erro ao carregar dados iniciais:", error);
    }
  };

  const searchAparelhos = async (query: string) => {
    setLoading(true);

    try {
      const data = await AsyncStorage.getItem("aparelhos");
      if (data !== null) {
        const results = JSON.parse(data).filter((aparelho: Gadget) =>
          aparelho.name.includes(query)
        );
        setSearchResult(results);
      }
      setLoading(false);
    } catch (error) {
      console.error("Erro na pesquisa:", error);
      setLoading(false);
    }
  };

  const handleSearch = async (text: string) => {
    setSearch(text);
    if (text.length > 0) {
      setSearch(text);
      await searchAparelhos(text);
    } else {
      setLoading(false);
    }
  };

  const renderAparelhoItem = ({ item }: { item: Gadget }) => (
    <CardResult title={item.name}>
      Orçamento: {item.budget}
      Data: {item.date}
      Dono: {item.owner}
    </CardResult>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <Card style={styles.card}>
            <Card.Title title="Usuarios" />
            <Card.Content>
              <Image
                source={require("../../assets/chartExemplo.jpg")}
                style={{ width: "100%", height: 150 }}
              />
            </Card.Content>

            <Card.Actions>
              <Button
                onPress={() => {
                  alert("1 usuario cadastrado");
                }}
                mode="contained" buttonColor="#4A90E2" textColor="white"
              >
                Visualizar
              </Button>
            </Card.Actions>
          </Card>
          <Card style={styles.card}>
            <Card.Title title="Aparelhos" />
            <Card.Content>
              <Image
                source={require("../../assets/chartExemplo.jpg")}
                style={{ width: "100%", height: 150 }}
              />
            </Card.Content>

            <Card.Actions>
              <Button
                onPress={() => {
                  alert("1 aparelho cadastrado");
                }}
                mode="contained" buttonColor="#4A90E2" textColor="white"
              >
                Visualizar
              </Button>
            </Card.Actions>
          </Card>
        </View>
        <Searchbar
          placeholder="Pesquisar..."
          onChangeText={handleSearch}
          value={search}
        />
        {noResult && (
          <>
            <Alert>Nenhum aparelho chamado "{search}" foi encontrado.</Alert>
          </>
        )}
        {loading && (
          <ActivityIndicator
            style={{ marginTop: 50 }}
            size="large"
            animating={true}
            color={MD2Colors.white}
          />
        )}

        <FlatList
          data={searchResult}
          numColumns={1}
          renderItem={renderAparelhoItem}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{
            padding: 35,
            paddingBottom: 100,
            justifyContent: "center",
          }}
        />
      </View>
    </SafeAreaView>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#6400FF",
    padding: 20,
    flex: 1,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  card: {
    flexBasis: "48%", // Define a largura dos cards
  },
});
