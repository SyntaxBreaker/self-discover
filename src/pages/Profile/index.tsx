import {
  Badge,
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

function TablerWorld() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke="#888888"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0m.6-3h16.8M3.6 15h16.8"></path>
        <path d="M11.5 3a17 17 0 0 0 0 18m1-18a17 17 0 0 1 0 18"></path>
      </g>
    </svg>
  );
}

function MaterialSymbolsCall() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
    >
      <path
        fill="#888888"
        d="M19.95 21q-3.125 0-6.175-1.363t-5.55-3.862q-2.5-2.5-3.862-5.55T3 4.05q0-.45.3-.75t.75-.3H8.1q.35 0 .625.238t.325.562l.65 3.5q.05.4-.025.675T9.4 8.45L6.975 10.9q.5.925 1.187 1.787t1.513 1.663q.775.775 1.625 1.438T13.1 17l2.35-2.35q.225-.225.588-.338t.712-.062l3.45.7q.35.1.575.363T21 15.9v4.05q0 .45-.3.75t-.75.3Z"
      ></path>
    </svg>
  );
}

export function MaterialSymbolsFavorite() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
    >
      <path
        fill="#E53E3E"
        d="m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812Q2.775 11.5 2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.388 2.25t-1.362 2.412q-.975 1.313-2.625 2.963T13.45 19.7L12 21Z"
      ></path>
    </svg>
  );
}

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
          <Stack direction="row" marginTop={4} flexWrap="wrap">
            {user.user_metadata.interests.map((interest: string) => (
              <Badge colorScheme="green" padding={1} key={interest}>
                {interest}
              </Badge>
            ))}
          </Stack>
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
