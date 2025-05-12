import { Image, Text, Button, Flex, Heading, Link } from "@chakra-ui/react";
import eventImage from "../../assets/images/event.svg";
import { useAuth } from "../../context/AuthProvider";
import { IAuthContext } from "../../types/auth";

function EmptyEventList() {
  const { user } = useAuth() as IAuthContext;

  return (
    <Flex flexDirection="column" gap={2} alignItems="center">
      <Image boxSize="250px" src={eventImage} alt="" />
      <Heading
        fontSize="xl"
        textAlign="center"
        fontWeight="bold"
        color="gray.700"
      >
        Oops! It&apos;s empty here.
      </Heading>
      <Text textAlign="center" color="gray.600" fontSize="sm">
        There are no events yet. You can create a new event using the button below.
      </Text>
      <Link href={user ? "/events/create" : "/signIn"} marginTop={4}>
        <Button colorScheme="blue" textAlign="center">
          {user ? "Create Event" : "Sign in"}
        </Button>
      </Link>
    </Flex>
  );
}

export default EmptyEventList;
