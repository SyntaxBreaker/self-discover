import { Image, Heading, Text, Flex, Button, Link } from "@chakra-ui/react";
import searchingImage from "../../assets/images/searching.svg";
import { useAuth } from "../../context/AuthProvider";
import { IAuthContext } from "../../types/auth";

function EmptyTagList() {
  const { user } = useAuth() as IAuthContext;

  return (
    <Flex direction="column" gap={2} marginTop={8}>
      <Image src={searchingImage} alt="" boxSize="sm" alignSelf="center" />
      <Heading
        fontSize="xl"
        textAlign="center"
        fontWeight="bold"
        color="gray.700"
      >
        Oops! It&apos;s empty here.
      </Heading>
      <Text textAlign="center" color="gray.600" fontSize="sm" maxWidth={600}>
        There are currently no tags associated with this keyword. You can add a
        new article using the button below.
      </Text>
      <Link href={user ? "/create" : "/signIn"} marginTop={4}>
        <Button colorScheme="facebook" textAlign="center">
          {user ? "Add Article" : "Sign in"}
        </Button>
      </Link>
    </Flex>
  );
}

export default EmptyTagList;
