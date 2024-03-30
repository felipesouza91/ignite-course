import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // TODO MODAL USEDISCLOSURE
  const [selectedUrlImage, setSelectedUrlImage] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleImage(url: string): void {
    setSelectedUrlImage(url);
    setModalIsOpen(true);
  }

  return (
    <>
      <SimpleGrid columns={3} spacingX="40px">
        {cards.map(card => (
          <Card key={card.id} data={card} viewImage={handleImage} />
        ))}
      </SimpleGrid>

      <ModalViewImage
        imgUrl={selectedUrlImage}
        isOpen={modalIsOpen}
        onClose={() => {
          setModalIsOpen(false);
        }}
      />
    </>
  );
}
