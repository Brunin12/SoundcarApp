import React, { useState, useEffect } from "react";
import { View, Text, TextInput } from "react-native";
import { Button, ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Edit = ({ route, navigation }) => {
  const { itemId, title } = route.params
    ? route.params
    : { itemId: null, title: null };
  const [itemData, setItemData] = useState({});
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    if (!itemId || !title) {
      navigation.navigate("Register");
      return;
    }

    const fetchItemData = async () => {
      try {
        const data = await AsyncStorage.getItem(title);
        if (data) {
          const parsedData = JSON.parse(data);
          const selectedItem = parsedData.find((item) => item.id === itemId);
          setItemData(selectedItem);
          setEditedData(selectedItem);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchItemData();
  }, [itemId, title, navigation]);

  const handleInputChange = (key, value) => {
    setEditedData({ ...editedData, [key]: value });
  };

  const handleSaveChanges = async () => {
    try {
      const existingData = await AsyncStorage.getItem(title);
      const parsedData = existingData ? JSON.parse(existingData) : [];
      const index = parsedData.findIndex((item) => item.id === itemId);
      parsedData[index] = editedData;
      await AsyncStorage.setItem(title, JSON.stringify(parsedData));
      navigation.navigate("Register");
      return;
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
    }
  };

  return (
    <View style={styles.container}>
      {Object.keys(itemData).length === 0 ? (
        <ActivityIndicator animating={true} />
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={editedData.name}
            onChangeText={(text) => handleInputChange("name", text)}
          />

          {/* Adicione mais campos para title sendo 'gadget' ou 'client' */}
          {title === "gadget" && (
            <TextInput
              style={styles.input}
              placeholder="Orçamento"
              value={editedData.budget}
              onChangeText={(text) => handleInputChange("budget", text)}
            />
          )}
          {title === "gadget" && (
            <TextInput
              style={styles.input}
              placeholder="Data"
              value={editedData.date}
              onChangeText={(text) => handleInputChange("date", text)}
            />
          )}

          {title === "client" && (
            <TextInput
              style={styles.input}
              placeholder="Telefone"
              value={editedData.telephone}
              onChangeText={(text) => handleInputChange("telephone", text)}
            />
          )}

          <Button mode="contained" buttonColor="#4A90E2" textColor="white" 
            onPress={handleSaveChanges}
            style={styles.button}
          >
            Salvar Alterações
          </Button>
        </>
      )}
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#6400FF",
  },
  input: {
    height: 40,
    width: "100%",
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#FFF",
  },
  button: {
    marginTop: 15,
  },
};

export default Edit;
