import { Image, Text, Button, Flex } from "@chakra-ui/react";
import eventImage from "../../assets/images/event.svg";
import { Link } from "react-router-dom";

function EmptyEventList() {
  return (
    <Flex flexDirection="column" gap={4} alignItems="center">
      <Image boxSize="250px" src={eventImage} alt="" />
      <Text textAlign="center" color="gray.600">
        There are no events yet. You can add a new event using the button below.
      </Text>
      <Button size="md" colorScheme="facebook" as={Link} to={`create`}>
        Create
      </Button>
    </Flex>
  );
}

export default EmptyEventList;
