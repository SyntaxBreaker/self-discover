import { Image, Heading, Text, Flex } from "@chakra-ui/react";
import searchingImage from "../../assets/images/searching.svg";

function EmptyTagList() {
  return (
    <Flex direction="column" gap={2} marginTop={8}>
      <Image src={searchingImage} alt="" boxSize="sm" alignSelf="center" />
      <Heading
        fontSize="lg"
        textAlign="center"
        fontWeight="bold"
        color="gray.700"
      >
        Oops! There are currently no tags associated with this keyword.
      </Heading>
      <Text fontSize="sm" textAlign="center" color="gray.600"></Text>
    </Flex>
  );
}

export default EmptyTagList;
