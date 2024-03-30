import { Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';

interface ITravelItenProps {
  iconSrc: string;
  description: string;
  isWideVersion: boolean;
  isLast?: boolean;
}
const TravelIten: React.FC<ITravelItenProps> = ({
  description,
  iconSrc,

  isWideVersion,
}) => {
  return (
    <Flex flexDirection={isWideVersion ? 'column' : 'row'} alignItems="center">
      {isWideVersion ? (
        <Image mb="4" src={iconSrc} />
      ) : (
        <Flex
          w="8px"
          h="8px"
          mr="2"
          backgroundColor="#ffba08"
          borderRadius="50%"
        />
      )}
      <Text size="5" fontWeight="600">
        {description}
      </Text>
    </Flex>
  );
};

export default TravelIten;
