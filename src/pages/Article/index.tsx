import { useLoaderData } from "react-router-dom";
import IArticle from "../../types/article";
import { Badge, Box, Container, Stack, Text } from "@chakra-ui/react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";

function Article() {
  const { article, error } = useLoaderData() as {
    article: IArticle;
    error: string;
  };

  return (
    <Container maxW={{ base: "100%", md: "50%" }} py={8}>
      {error || !article ? (
        <Box bgColor="#C53030" padding={4} borderRadius={8} marginTop={8}>
          <Text color="white">
            {error ? error : "This article doesn't exist"}
          </Text>
        </Box>
      ) : (
        <Box>
          <Text fontSize="6xl" fontWeight="extrabold">
            {article.title}
          </Text>
          <Text marginTop={0}>
            {article.created_at.split("T")[0].split("-").reverse().join(".")}
          </Text>
          <Box
            as={ReactMarkdown}
            components={ChakraUIRenderer()}
            letterSpacing="0.8px"
            marginTop={8}
          >
            {article.content}
          </Box>
          {article.tags && (
            <Stack direction="row" marginTop={12}>
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
