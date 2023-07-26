import { Container, Heading, Text } from '@chakra-ui/react';
import {useRouteError} from 'react-router-dom';

export default function ErrorPage() {
  const error: any = useRouteError();
  
  return (
    <Container maxW='100%' textAlign="center" py={8}>
      <Heading>Oops!</Heading>
      <Text marginTop={4}>Sorry, an unexpected error has occured.</Text>
      <Text marginTop={4} color="gray.500">{error?.statusText || error?.message}</Text>
    </Container>
  )
}