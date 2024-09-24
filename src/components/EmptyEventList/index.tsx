import { Image, Text, Button, Flex, Heading } from "@chakra-ui/react";
import eventImage from "../../assets/images/event.svg";
import { Link } from "react-router-dom";

function EmptyEventList() {
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
      <Button
        size="md"
        colorScheme="facebook"
        as={Link}
        to={`create`}
        marginTop={2}
      >
        Create
      </Button>
    </Flex>
  );
}

export default EmptyEventList;
