// GadgetForm.jsx
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import TextInputMask from "react-native-text-input-mask";
import CardResult from "../CardResult";
import { View } from "react-native";

interface Props {
  title: string;
  onSubmit?: (data: {
    gadgetName: string;
    ownerPhone: string;
    budget: string;
    date: string;
    status: string;
  }) => void;
}
const GadgetForm = ({ title, onSubmit }: Props) => {
  const [gadgetName, setGadgetName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [budget, setBudget] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = () => {
    onSubmit({ gadgetName, ownerPhone, budget, date, status });
  };

  return (
    <>
      <CardResult onPress={handleSubmit} buttonTitle="Enviar" title={title}>
        <View style={{ marginBottom: 10 }}>
          <TextInput
            mode="outlined"
            label="Nome do Aparelho"
            value={gadgetName}
            style={{ marginBottom: 10 }}
            onChangeText={(text) => setGadgetName(text)}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <TextInput
            mode="outlined"
            label="Telefone do Dono"
            value={ownerPhone}
            onChangeText={(text) => setOwnerPhone(text)}
            
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <TextInput
            mode="outlined"
            label="Orçamento"
            value={budget}
            style={{ marginBottom: 10 }}
            onChangeText={(text) => setBudget(text)}
          />
        </View>
        <View style={{ marginBottom: 10 }}>
          <TextInput
            mode="outlined"
            label="Data"
            value={date}
            style={{ marginBottom: 10 }}
            onChangeText={(text) => setDate(text)}
          />
        </View>
        <View style={{ marginBottom: 10 }}>
          <TextInput
            mode="outlined"
            label="Status"
            value={status}
            style={{ marginBottom: 10 }}
            onChangeText={(text) => setStatus(text)}
          />
        </View>
      </CardResult>
    </>
  );
};

export default GadgetForm;
