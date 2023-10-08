import * as React from 'react';
import { Appbar } from 'react-native-paper';

interface HeaderProps {
    title: string;
}

const Header = ({title}: HeaderProps) => {

  return (
    <Appbar.Header>
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};

export default Header;