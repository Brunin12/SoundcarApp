import React, { useCallback, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import {
  ActivityIndicator,
  FAB,
  MD2Colors,
  Searchbar,
  SegmentedButtons,
  Text,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import ClientForm from "../components/Forms/ClientForm";
import GadgetForm from "../components/Forms/GadgetForm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CardResult from "../components/CardResult";
import Alert from "../components/Alert";

const Register = ({title}) => {
  const [showForm, setShowForm] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultSearch, setResultSearch] = useState([]);
  const [search, setSearch] = useState("");

  const renderItem = ({ item }) => {
    return (
      <CardResult title={title === "client" ? "Usuário" : "Aparelho"}>
        <Text>
          Nome:
          {item.name}
        </Text>
        <Text>
          Telefone:
          {item.telephone}
        </Text>
        {title !== "client" && <Text>Orçamento: {item.budget}</Text>}
        {title !== "client" && <Text>Data: {item.date}</Text>}
      </CardResult>
    );
  };

  const searchData = async (query) => {
    try {
      const data = await AsyncStorage.getItem(title);

      if (data) {
        // Transforma o JSON em um objeto JavaScript
        const parsedObject = JSON.parse(data);
        const valuesArray = Object.values(parsedObject); // Converte o objeto em uma array

        const sortedResults = valuesArray.find(
          (data) =>
            data && (data["name"] === query || data["telephone"] === query)
        );

        return [sortedResults];
      } else {
        return [];
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      return [];
    }
  };

  const handleAddClick = () => {
    setShowForm(true);
  };

  const handleSubmitItem = async (data) => {
    setLoading(true);
    try {
      // Obter os dados existentes (se houver)
      const existingData = await AsyncStorage.getItem(title);

      // Se não houver dados existentes, inicializamos uma nova array vazia
      let clientData = existingData ? JSON.parse(existingData) : [];

      // Encontrar o maior ID existente
      let maxId = 0;
      clientData.forEach((item) => {
        if (item.id > maxId) {
          maxId = item.id;
        }
      })

      // Calcular o próximo ID
      const nextId = maxId + 1;

      // Adicionar o novo usuário à array com o próximo ID
      data.id = nextId;
      clientData[nextId] = data;

      // Gravar os dados atualizados no AsyncStorage
      await AsyncStorage.setItem(title, JSON.stringify(clientData));
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
    }
    setLoading(false);
  };

  const handleSearch = useCallback(async (data) => {
    setSearch(data);
    setShowForm(false);
    setLoading(true);

    const result = await searchData(data);
    if (result) {
      setNoResult(false);
      setResultSearch(result);
    } else {
      setNoResult(true);
    }

    setLoading(false);
  }, [search]);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <SegmentedButtons
            value={title}
            onValueChange={() => {title = "client"}}
            buttons={[
              {
                value: "client",
                label: "Cliente",
              },
              {
                value: "gadget",
                label: "Aparelho",
              },
            ]}
          />
          <Searchbar
            onChangeText={handleSearch}
            onSubmitEditing={handleSearch}
            placeholder="Pesquisar..."
            value={search}
            style={{ flex: 1 }}
          />
          <FAB icon="plus" style={styles.fab} onPress={handleAddClick} />
        </View>
        {showForm && (
          <View style={styles.Forms}>
            {/* Renderizar o formulário correspondente */}
            {title === "client" ? (
              <View>
                {/* Componente deveria ficar aqui (clientForm) */}
                <ClientForm
                  title="Formulario de Usuário"
                  onSubmit={handleSubmitItem}
                />
              </View>
            ) : (
              <View>
                {/* Componente deveria ficar aqui (GadgetForm) */}
                <GadgetForm
                  title="Formulario de Aparelho"
                  onSubmit={handleSubmitItem}
                />
              </View>
            )}
          </View>
        )}

        {noResult && (
          <>
            <Alert>
              Nenhum {title == "client" ? "Usuário" : "Aparelho"} chamado "
              {search ? search : " "}" foi encontrado.
            </Alert>
          </>
        )}
        {!showForm && (
          <>
            <FlatList
              data={[resultSearch]}
              numColumns={1}
              renderItem={renderItem}
              showsVerticalScrollIndicator={true}
              contentContainerStyle={{
                padding: 35,
                paddingBottom: 100,
                justifyContent: "center",
              }}
            />
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
      </SafeAreaView>
    </>
  );
};

export default Register;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#6400FF",
    padding: 20,
    flex: 1,
  },
  searchBar: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    textAlign: "center", // Centraliza o texto
  },
  fab: {
    marginHorizontal: 10,
    backgroundColor: "#FFF",
  },
  Forms: {
    marginTop: 30,
    padding: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
});
