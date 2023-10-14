import React, { ReactNode, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dialog, Portal, Text, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  text: ReactNode;
  title: string;

}

const AlertIcon = ({ text, title }: Props) => {
  const [visible, setVisible] = useState(false);

  const hideDialog = () => setVisible(false);

  // Converte o nome do ícone em um componente de ícone

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
      <Dialog.Icon icon="alert" />
        <Dialog.Title style={styles.title}>{title}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{text}</Text>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
  },
});

export default AlertIcon;
