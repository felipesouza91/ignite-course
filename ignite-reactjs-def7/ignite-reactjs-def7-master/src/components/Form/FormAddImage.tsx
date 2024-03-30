import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';

interface FormAddImageProps {
  closeModal: () => void;
}

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const toast = useToast();

  const formValidations = {
    image: {},
    title: {
      required: true,
      maxLength: 100,
      minLength: 5,
    },
    description: {
      required: true,
      maxLength: 150,
    },
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(
    // TODO MUTATION API POST REQUEST,
    {
      // TODO ONSUCCESS MUTATION
    }
  );

  const { register, handleSubmit, reset, formState, setError, trigger } =
    useForm();

  const { errors } = formState;

  const onSubmit = async (data: Record<string, unknown>): Promise<void> => {
    try {
      const { title, description } = data;
      await api.post('/api/images', { url: imageUrl, title, description });
      closeModal();
    } catch {
      toast({
        title: 'Error',
        description: 'Erro ao enviar foto',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      reset();
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FileInput
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}
          name="image"
          error={errors.image}
          {...register('image', { ...formValidations.image })}
        />

        <TextInput
          placeholder="Título da imagem..."
          name="title"
          error={errors.title}
          {...register('title', { ...formValidations.title })}
        />

        <TextInput
          placeholder="Descrição da imagem..."
          name="description"
          error={errors.description}
          {...register('description', { ...formValidations.description })}
        />
      </Stack>

      <Button
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={formState.isSubmitting}
        type="submit"
        w="100%"
        py={6}
      >
        Enviar
      </Button>
    </Box>
  );
}
