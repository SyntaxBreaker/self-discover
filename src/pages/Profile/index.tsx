import { Box, Flex, Image } from "@chakra-ui/react";
import { useAuth } from "../../context/AuthProvider";
import { IAuthContext } from "../../types/auth";
import { useLoaderData } from "react-router-dom";
import IArticle from "../../types/article";
import ArticleList from "../../components/ArticleList";
import { PostgrestError } from "@supabase/supabase-js";
import ResponsiveContainer from "../../components/ResponsiveContainer";
import ProfileInfo from "../../components/ProfileInfo";

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
        <ProfileInfo />
      </Flex>
      <Box marginTop={16}>
        <ArticleList articles={articles} error={error} />
      </Box>
    </ResponsiveContainer>
  );
}

export default Profile;
