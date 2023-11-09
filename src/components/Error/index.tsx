import { Button, Container, Heading, Image, Text } from "@chakra-ui/react";
import { useLocation, useNavigate, useRouteError } from "react-router-dom";
import ErrorImage from "../../assets/images/error.png";

export default function Error({errorMessage}: {errorMessage?: string}) {
  const error: any = useRouteError();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Container textAlign="center">
      <Image src={ErrorImage} alt="" sizes="sm" />
      <Heading as="h1" size="lg" color="gray.700">Sorry, an unexpected error has occured!</Heading>
      <Text marginTop={4} color="gray.600">
        {errorMessage || error?.statusText || error?.message}
      </Text>
      <Button
        marginTop={4}
        colorScheme="red"
        onClick={() => location.pathname === "/" ? navigate(0) : navigate(-1)}
      >
        Go back
      </Button>
    </Container>
  );
}
