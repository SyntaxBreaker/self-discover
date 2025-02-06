import { Flex, Image, Text, Button, Heading, Link } from "@chakra-ui/react";
import postImage from "../../assets/images/post.svg";
import { useAuth } from "../../context/AuthProvider";
import { IAuthContext } from "../../types/auth";

function EmptyArticleList() {
  const { user } = useAuth() as IAuthContext;

  return (
    <Flex alignSelf="center" flexDirection="column" alignItems="center" gap={1}>
      <Image src={postImage} alt="" boxSize="sm" />
      <Heading
        fontSize="xl"
        textAlign="center"
        fontWeight="bold"
        color="gray.700"
      >
        Oops! It&apos;s empty here.
      </Heading>
      <Text fontSize="sm" textAlign="center" color="gray.600">
        {user
          ? "Start by adding a new article."
          : "Please log in to create an article."}
      </Text>
      <Link href={user ? "/create" : "/signIn"} marginTop={4}>
        <Button colorScheme="facebook" textAlign="center">
          {user ? "Create Article" : "Sign in"}
        </Button>
      </Link>
    </Flex>
  );
}

export default EmptyArticleList;
