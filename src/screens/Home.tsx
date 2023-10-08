// Importações
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import {
  MD2Colors,
  Card,
  Button,
  Searchbar,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import CardAparelho from "../components/CardAparelho";
import Alert from "../components/Alert";
import * as SQLite from 'expo-sqlite';

// Inicializa o banco de dados
const db = SQLite.openDatabase('soundcar.db');

// Define a interface para o tipo de dados "Aparelho"
interface Aparelho {
  id: number; // Corrige o tipo para "number"
  nome: string; // Corrige o tipo para "string"
  dono: string; // Corrige o tipo para "string"
  data: string; // Corrige o tipo para "string"
  Orcamento: string; // Corrige o tipo para "string"
}

function Home() {
  // Define os estados
  const [loading, setLoading] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<Aparelho[]>([]); // Corrige o tipo para "Aparelho[]"

  useEffect(() => {
    loadInitialData(); // Carrega os dados iniciais
  }, []);

  // Carrega os dados iniciais
  const loadInitialData = () => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM aparelhos", [], (_, { rows }) => {
        const results = rows._array as Aparelho[]; // Corrige o tipo para "Aparelho[]"
        if (results.length === 0) {
          setNoResult(true);
          setSearchResult([]);
        } else {
          setNoResult(false);
          setSearchResult(results);
        }
        setLoading(false);
      });
    });
  };

  // Pesquisa aparelhos
  const searchAparelhos = async (query: string) => {
    setLoading(true);

    return new Promise<void>((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM aparelhos WHERE nome LIKE ?",
          [`%${query}%`],
          (_, { rows }) => {
            const results = rows._array as Aparelho[]; // Corrige o tipo para "Aparelho[]"
            if (results.length === 0) {
              setNoResult(true);
              setSearchResult([]);
            } else {
              setNoResult(false);
              setSearchResult(results);
            }
            setLoading(false);
            resolve(); // Resolve a promessa após a execução da consulta
          },
          (_, error) => {
            console.error("Erro na transação SQL:", error);
            setLoading(false);
            reject(error);
            return false;
          }
        );
      });
    });
  };

  // Manipula a busca
  const handleSearch = async (text: string) => {
    setSearch(text);
    if (text.length > 0) {
      setSearch(text);
      await searchAparelhos(text); // Espera pela execução da consulta
    } else {
      setLoading(false);
    }
  };

  // Renderiza um item de aparelho
  const renderAparelhoItem = ({ item }: { item: Aparelho }) => (
    <CardAparelho title={item.nome}>
      Orçamento: {item.Orcamento}
      Data: {item.data}
      Dono: {item.dono}
    </CardAparelho>
  );

  // Define a variável 'data'
  const data = searchResult;

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Home" />
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
            >
              Visualizar
            </Button>
          </Card.Actions>
        </Card>
      </View>
      <Searchbar
        placeholder="Pesquisar"
        onChangeText={handleSearch}
        value={search}
      />
      {noResult && (
        <Alert>Nenhum filme chamado "{search}" foi encontrado.</Alert>
      )}
      {loading && (
        <ActivityIndicator
          style={styles.activityIndicator}
          size="large"
          animating={true}
          color={MD2Colors.white}
        />
      )}
      <FlatList
        data={data}
        numColumns={1}
        renderItem={renderAparelhoItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
    </SafeAreaView>
  );
}

export default Home;

// Estilos
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
  activityIndicator: {
    marginTop: 50,
  },
  flatListContent: {
    padding: 35,
    paddingBottom: 100,
    justifyContent: "center",
  },
});

