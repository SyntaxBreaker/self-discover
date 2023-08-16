import { useLoaderData } from "react-router-dom";
import IArticle from "../../types/article";
import { PostgrestError } from "@supabase/supabase-js";
import { Alert, AlertIcon, Container, SimpleGrid } from "@chakra-ui/react";
import ArticleCard from "../../components/ArticleCard";
import { Link } from "react-router-dom";

function Tag() {
  const { articles, error } = useLoaderData() as {
    articles: IArticle[];
    error: PostgrestError | null;
  };

  return (
    <Container maxW={{ base: "100%", md: "50%" }} py={8}>
      {error && (
        <Alert status="error" padding={4} borderRadius={8}>
          <AlertIcon />
          Unable to load articles. Please check your internet connection.
        </Alert>
      )}
      <SimpleGrid
        spacing={4}
        templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}
        alignItems="flex-start"
      >
        {articles?.map((article) => (
          <Link to={`/article/${article.id}`} key={article.id}>
            <ArticleCard article={article} />
          </Link>
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default Tag;
