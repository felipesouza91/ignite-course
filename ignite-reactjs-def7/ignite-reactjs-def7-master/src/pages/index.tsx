import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { useCallback } from 'react';
import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    async ({ pageParam = 1 }) => {
      const response = await api.get('/api/images', {
        params: { after: pageParam },
      });
      console.log(response.data);
      return response.data;
    },
    {
      getNextPageParam: (lastPage, allPages) => lastPage.after,
    }
  );

  const formattedData = useMemo(() => {
    if (data) {
      // console.log(data);
      const imagens = data.pages.map(item => item.data).flat();

      console.log(imagens);
      return imagens.map(item => {
        return { ...item };
      });
    }
    return null;
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }
  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
