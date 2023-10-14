import React, { ReactNode } from "react";
import { Button, Card, Divider } from "react-native-paper";

interface CardProps {
  title?: string;
  buttonTitle?: string;
  children?: ReactNode;
  onPress?: () => void;
}

function CardResult({ title, buttonTitle="Visualizar", children, onPress }: CardProps) {
  return (
    <Card style={{marginVertical: 10}}>
      <Card.Title title={title} />
      <Divider />
      <Card.Content>{children}</Card.Content>
      <Card.Actions>
        <Button mode="contained" buttonColor="#4A90E2" textColor="white" onPress={onPress}>{buttonTitle}</Button>
      </Card.Actions>
    </Card>
  );
}

export default CardResult;
