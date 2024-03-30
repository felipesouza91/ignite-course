import { Flex, Image } from '@chakra-ui/react';

import React from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <Flex w="1440" h="76" justifyContent="center" alignItems="center">
      <Image src="/Logo.png" />
    </Flex>
  );
};

export default Header;
