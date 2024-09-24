import { Image, Text, Button, Flex, Heading, Box } from "@chakra-ui/react";
import eventImage from "../../assets/images/event.svg";
import { Link } from "react-router-dom";
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
        There are no events yet. You can add a new event using the button below.
      </Text>
      <Box as={Button} colorScheme="facebook" textAlign="center" marginTop={4}>
        <Link to={user ? "/events/create" : "/signIn"}>
          {user ? "Add event" : "Sign in"}
        </Link>
      </Box>
    </Flex>
  );
}

export default EmptyEventList;
