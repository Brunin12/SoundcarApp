import React, { useCallback, useState, useEffect } from "react";
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

const Register = ({navigation}) => {
  const [title, setTitle] = useState("client");
  const [showForm, setShowForm] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultSearch, setResultSearch] = useState([]);
  const [search, setSearch] = useState("");

  const handleEditItem = (itemId, title) => {
    navigation.navigate('Edit', { itemId, title });
  };

  const renderItem = ({ item }) => {
    return (
      <CardResult title={title === "client" ? "Usuário" : "Aparelho"} buttonTitle="Editar" onPress={() => handleEditItem(item.id, title)}>
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
        const parsedObject = JSON.parse(data);
        const valuesArray = Object.values(parsedObject);

        let sortedResults = [];

        if (query === "") {
          sortedResults = valuesArray;
        } else {
          const regex = new RegExp(query, "i");
          sortedResults = valuesArray.filter(
            (data) =>
              data &&
              (regex.test(data["name"]) || regex.test(data["telephone"]))
          );
        }

        return sortedResults;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      return [];
    }
  };

  const handleAddClick = () => {
    setShowForm(!showForm);
  };

  const handleChangeSelect = (value) => {
    setTitle(value);
    setSearch("");
  };

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const handleSubmitItem = async (data) => {
    setLoading(true);
    try {
      const existingData = await AsyncStorage.getItem(title);
      let clientData = existingData ? JSON.parse(existingData) : [];

      const newData = { ...data, id: generateId() };
      clientData = [...clientData, newData];

      await AsyncStorage.setItem(title, JSON.stringify(clientData));
    } catch (error) {
      alert(`Erro ao salvar dados: ${error}`);
    }
    setLoading(false);
  };

  const handleSearch = useCallback(
    async (data) => {
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
    },
    [search]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setSearch('');
        setLoading(true);
        
        const data = await AsyncStorage.getItem(title);
        const parsedData = data ? JSON.parse(data) : [];
        setResultSearch(parsedData);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, [title]);
  

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <SegmentedButtons
            value={title}
            onValueChange={handleChangeSelect}
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
            style={styles.searchBar}
          />
          <FAB icon="plus" style={styles.fab} onPress={handleAddClick} />
        </View>
        {showForm && (
          <View style={styles.Forms}>
            {title === "client" ? (
              <View>
                <ClientForm
                  title="Formulário de Usuário"
                  onSubmit={handleSubmitItem}
                />
              </View>
            ) : (
              <View>
                <GadgetForm
                  title="Formulário de Aparelho"
                  onSubmit={handleSubmitItem}
                />
              </View>
            )}
          </View>
        )}

        {!showForm && !loading && resultSearch.length === 0 && !noResult && (
          <Alert>
            Nenhum {title === "client" ? "Cliente" : "Aparelho"} foi registrado.
          </Alert>
        )}

        {noResult && (
          <>
            <Alert>
              Nenhum {title === "client" ? "Usuário" : "Aparelho"} chamado "
              {search ? search : " "}" foi encontrado.
            </Alert>
          </>
        )}

        {!showForm && resultSearch.length > 0 && (
          <FlatList
            data={resultSearch}
            numColumns={1}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={{
              padding: 35,
              paddingBottom: 100,
              justifyContent: "center",
            }}
          />
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
    position: "relative",
  },
  searchBar: {
    height: 60,
    borderColor: "gray",
    width: "85%",
    padding: 3,
    borderWidth: 1,
    marginBottom: 10,
    textAlign: "center",
    justifyContent: "center",
  },
  fab: {
    position: "absolute",
    marginHorizontal: 10,
    marginVertical: 6,
    backgroundColor: "#FFF",
    right: 0,
    bottom: 0,
  },
  Forms: {
    marginTop: 30,
    padding: 30,
  },
  header: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: 10,
  },
});
