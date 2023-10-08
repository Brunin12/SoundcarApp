import React, { ReactNode } from "react";
import { Button, Card } from "react-native-paper";

interface CardProps {
  title?: String;
  children?: ReactNode;
  onPress?: () => void;
}

function CardAparelho({ title, children, onPress }: CardProps) {
  return (
    <Card>
      <Card.Title title={title} />
      <Card.Content>{children}</Card.Content>
      <Card.Actions>
        <Button onPress={onPress}>Visualizar</Button>
      </Card.Actions>
    </Card>
  );
}

export default CardAparelho;
