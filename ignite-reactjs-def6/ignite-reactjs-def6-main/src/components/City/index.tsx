import { Avatar, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';

interface IContinentProps {
  cityImage: string;
  cityName: string;
  countryName: string;
  countryFlagImage: string;
}

const Continent: React.FC<IContinentProps> = ({
  cityImage,
  cityName,
  countryFlagImage,
  countryName,
}) => {
  return (
    <Flex
      flexDir="column"
      w="256px"
      h="279px"
      justifyContent="space-between"
      border="1px solid rgba(255, 186, 8, 0.5)"
      borderRadius="4px"
      mb={['5', '12']}
    >
      <Image src={cityImage} />
      <Flex
        flexDir="row"
        px="6"
        py="5"
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex flexDir="column" justifyContent="space-between">
          <Text fontSize="xl" fontWeight="500">
            {cityName}
          </Text>
          <Text fontSize="md" color="#999999">
            {countryName}
          </Text>
        </Flex>
        <Avatar size="sm" src={countryFlagImage} />
      </Flex>
    </Flex>
  );
};

export default Continent;
