import { Button, Container, Heading, Text } from "@chakra-ui/react";
import { useNavigate, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();
  const navigate = useNavigate();

  return (
    <Container textAlign="center" py={8}>
      <Heading>Oops!</Heading>
      <Text marginTop={4} color="gray.500">
        Sorry, an unexpected error has occured.
      </Text>
      <Text marginTop={4} color="gray.900">
        {error?.statusText || error?.message}
      </Text>
      <Button
        marginTop={4}
        colorScheme="red"
        onClick={() => navigate(-1)}
      >
        Go back
      </Button>
    </Container>
  );
}
