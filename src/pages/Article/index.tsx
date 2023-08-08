import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import IArticle from "../../types/article";
import {
  Alert,
  Badge,
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import { useAuth } from "../../context/AuthProvider";
import { IAuthContext } from "../../types/auth";
import { supabase } from "../../utils/supabase";

function Article() {
  const [status, setStatus] = useState<null | {
    type: "success" | "error";
    message: string;
  }>(null);

  const { article, error } = useLoaderData() as {
    article: IArticle;
    error: string;
  };
  const { user } = useAuth() as IAuthContext;

  const removeArticle = async () => {
    const { error } = await supabase
      .from("articles")
      .delete()
      .eq("id", article.id);

    if (error) {
      setStatus({
        type: "error",
        message: error.message,
      });
    } else {
      setStatus({
        type: "success",
        message: "The article was successfully removed",
      });
      setTimeout(() => {
        window.location.replace("/");
      }, 5000);
    }
  };

  return (
    <Container maxW={{ base: "100%", md: "50%" }} py={8}>
      {status && (
        <Alert marginBottom={2} status={status.type}>
          {status.message}
        </Alert>
      )}
      {error || !article ? (
        <Box bgColor="#C53030" padding={4} borderRadius={8} marginTop={8}>
          <Text color="white">
            {error ? error : "This article doesn't exist"}
          </Text>
        </Box>
      ) : (
        <Box>
          <Stack direction="row" justify="space-between" wrap="wrap">
            <Stack>
              <Heading as="h1" size="2xl">
                {article.title}
              </Heading>
              <Text>
                {article.created_at
                  .split("T")[0]
                  .split("-")
                  .reverse()
                  .join(".")}
              </Text>
            </Stack>
            {user && user.id === article.author_id && (
              <Stack direction="row" padding={2}>
                <Button size="lg">Edit</Button>
                <Button size="lg" onClick={removeArticle}>
                  Remove
                </Button>
              </Stack>
            )}
          </Stack>
          <Box
            as={ReactMarkdown}
            components={ChakraUIRenderer()}
            letterSpacing="0.8px"
            marginTop={8}
          >
            {article.content}
          </Box>
          {article.tags && (
            <Stack direction="row" marginTop={8} wrap="wrap">
              {article.tags.map((tag) => (
                <Badge colorScheme="blue" padding={2} key={tag}>
                  {tag}
                </Badge>
              ))}
            </Stack>
          )}
        </Box>
      )}
    </Container>
  );
}

export default Article;
