// ClientForm.jsx
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import CardResult from "../CardResult";
import { View } from "react-native";

interface Props {
  title: string;
  onSubmit?: (data: { name: string; telephone: string }) => void;
}

const ClientForm = ({ title, onSubmit }: Props) => {
  const [name, setName] = useState("");
  const [telephone, setTelephone] = useState("");

  const handleSubmit = () => {
    onSubmit({ name, telephone });
  };

  return (
    <>
      <CardResult onPress={handleSubmit} buttonTitle="Enviar" title={title}>
        <View style={{ marginBottom: 10 }}>
          <TextInput
            mode="outlined"
            label="Nome"
            value={name}
            style={{ marginBottom: 10 }}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={{ marginBottom: 10 }}>
          <TextInput
            mode="outlined"
            label="Telefone"
            value={telephone}
            style={{ marginBottom: 10 }}
            onChangeText={(text) => setTelephone(text)}
          />
        </View>
      </CardResult>
    </>
  );
};

export default ClientForm;
