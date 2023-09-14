import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useAuth } from "../../context/AuthProvider";
import { IAuthContext } from "../../types/auth";
import { NavLink, useLoaderData } from "react-router-dom";
import IArticle from "../../types/article";
import InterestList from "../../components/InterestList";
import { TablerWorld } from "../../components/Icons";
import ArticleList from "../../components/ArticleList";
import { PostgrestError } from "@supabase/supabase-js";
import ResponsiveContainer from "../../components/ResponsiveContainer";

function Profile() {
  const { user } = useAuth() as IAuthContext;
  const { articles, error } = useLoaderData() as {
    articles: IArticle[];
    error: PostgrestError | null;
  };

  return (
    <ResponsiveContainer>
      <Flex
        direction="row"
        gap={8}
        alignItems="center"
        flexWrap={{ base: "wrap", md: "nowrap" }}
      >
        <Image
          boxSize="150px"
          objectFit="cover"
          src={
            user.user_metadata.avatar_url
              ? user.user_metadata.avatar_url
              : "https://bit.ly/dan-abramov"
          }
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
            <Text fontSize="2xl">{user.user_metadata.username}</Text>
            <Button
              size="md"
              as={NavLink}
              to="/profile/edit"
              colorScheme="facebook"
            >
              Edit profile
            </Button>
          </Stack>
          {user.user_metadata.website && (
            <Stack direction="row" alignItems="center">
              <Icon as={TablerWorld} />
              <Link href={user.user_metadata.website} isExternal={true}>
                {user.user_metadata.website.split(/https?:\/\//)[1]}
              </Link>
            </Stack>
          )}
          {user.user_metadata.interests && (
            <InterestList interests={user.user_metadata.interests} />
          )}
        </Flex>
      </Flex>
      <Box marginTop={16}>
        <ArticleList articles={articles} error={error} />
      </Box>
    </ResponsiveContainer>
  );
}

export default Profile;
