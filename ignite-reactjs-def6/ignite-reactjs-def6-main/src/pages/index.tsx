import {
  Flex,
  Text,
  Center,
  Image,
  useBreakpointValue,
} from '@chakra-ui/react';

import Header from '../components/Header';
import Swipper from '../components/Swipper';
import TravelIten from '../components/TravelIten';
import styles from './Home.module.scss';
export default function Home() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  const isWideImage = useBreakpointValue({
    base: false,
    xl: true,
  });
  return (
    <>
      <Header />
      <Flex flexDirection="column">
        <Flex
          justifyContent="center"
          alignItems="center"
          backgroundImage="/Background.png"
          backgroundSize="cover"
          h="340"
          paddingX="4"
          paddingY="7"
          color="#F5F8FA"
        >
          <Flex
            className={styles.container}
            flexDirection="row"
            justifyContent="space-between"
            mx="43"
            alignItems="center"
          >
            <Flex flexDirection="column">
              <Text fontSize={['2xl', '5xl']} pb="2" fontWeight="500">
                5 Continentes, <br /> infinitas possibilidades.
              </Text>
              <Text fontSize={['sm', 'xl']}>
                Chegou a hora de tirar do papel a viagem que você sempre sonhou.
              </Text>
            </Flex>
            {isWideImage && (
              <Image className={styles.imageBanner} src="/Airplane.png" />
            )}
          </Flex>
        </Flex>
        <Flex
          flexDir="column"
          px="12"
          py="9"
          my="10"
          justifyContent="center"
          alignItems="center"
        >
          <Flex
            className={styles.container}
            flexDirection={['column', 'row']}
            w="100%"
          >
            <Flex
              display="flex"
              flexDir={['column', 'row']}
              flexWrap="wrap"
              gridRowGap="25px"
              justifyContent="space-between"
              alignItems="center"
              className={styles.optionsContainer}
            >
              <TravelIten
                iconSrc="/cocktail.png"
                description="vida noturna"
                isWideVersion={isWideVersion}
              />
              <TravelIten
                iconSrc="/surf.png"
                description="praia"
                isWideVersion={isWideVersion}
              />
              <TravelIten
                iconSrc="/building.png"
                description="moderno"
                isWideVersion={isWideVersion}
              />
              <TravelIten
                iconSrc="/museum.png"
                description="clássico"
                isWideVersion={isWideVersion}
              />
              <TravelIten
                iconSrc="/earth.png"
                description="e mais"
                isWideVersion={isWideVersion}
              />
            </Flex>
          </Flex>
        </Flex>
        <Center flex="1">
          <div className={styles.divider} />
        </Center>
        <Flex my="9" justifyContent="center" alignItems="center">
          <Flex
            alignContent="center"
            justifyContent="center"
            className={styles.container}
          >
            <Flex flexDirection="column" alignItems="center">
              <Text fontSize={['xl', '4xl']} fontWeight="500" color="#47585B">
                Vamos nessa?
              </Text>
              <Text fontSize={['xl', '4xl']} fontWeight="500" color="#47585B">
                Então escolha seu continente
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex height="450px" className={styles.optionsContainer} mb="50px">
          <Swipper />
        </Flex>
      </Flex>
    </>
  );
}
