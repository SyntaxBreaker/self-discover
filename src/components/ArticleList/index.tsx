import { Alert, AlertIcon, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ArticleCard from "../ArticleCard";
import IArticle from "../../types/article";
import { PostgrestError } from "@supabase/supabase-js";

function ArticleList({
  articles,
  error,
}: {
  articles: IArticle[] | null;
  error: PostgrestError | null;
}) {
  return (
    <>
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
    </>
  );
}

export default ArticleList;
