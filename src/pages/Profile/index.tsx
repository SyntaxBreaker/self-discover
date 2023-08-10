import {
  Button,
  Container,
  Flex,
  Icon,
  Image,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useAuth } from "../../context/AuthProvider";
import { IAuthContext } from "../../types/auth";
import { useLoaderData } from "react-router-dom";
import IArticle from "../../types/article";
import ArticleCard from "../../components/ArticleCard";
import { Link as RouterLink } from "react-router-dom";
import InterestList from "../../components/InterestList";
import { MaterialSymbolsCall, TablerWorld } from "../../components/Icons";

function Profile() {
  const { user } = useAuth() as IAuthContext;
  const { articles } = useLoaderData() as {
    articles: IArticle[];
    error: string;
  };

  return (
    <Container maxW={{ base: "100%", md: "50%" }} py={8}>
      <Flex
        direction="row"
        gap={8}
        alignItems="center"
        flexWrap={{ base: "wrap", md: "nowrap" }}
      >
        <Image
          boxSize="150px"
          objectFit="cover"
          src="https://bit.ly/dan-abramov"
          alt="Your profile picture"
          borderRadius="full"
        />
        <Flex direction="column" gap={1} flexBasis="100%">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            flexWrap={{ base: "wrap", md: "nowrap" }}
          >
            <Text fontSize="5xl">{user.user_metadata.username}</Text>
            <Button size="md">Edit profile</Button>
          </Stack>
          <Flex direction="row" alignItems="center" gap={4} flexWrap="wrap">
            {user.user_metadata.website && (
              <Stack direction="row" alignItems="center">
                <Icon as={TablerWorld} />
                <Link href={user.user_metadata.website}>
                  {user.user_metadata.website.split("www.")[1]}
                </Link>
              </Stack>
            )}
            <Stack direction="row" alignItems="center">
              <Icon as={MaterialSymbolsCall} />
              <Text>
                {user.phone ? user.phone : "Phone number unavailable"}
              </Text>
            </Stack>
          </Flex>
          {user.user_metadata.interests && (
            <InterestList interests={user.user_metadata.interests} />
          )}
        </Flex>
      </Flex>
      <SimpleGrid
        spacing={4}
        templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}
        alignItems="flex-start"
        marginTop={16}
      >
        {articles?.map((article) => (
          <RouterLink to={`/article/${article.id}`} key={article.id}>
            <ArticleCard article={article} />
          </RouterLink>
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default Profile;
