import { useLoaderData } from "react-router-dom";
import IArticle from "../../types/article";
import { PostgrestError } from "@supabase/supabase-js";
import { Container } from "@chakra-ui/react";
import ArticleList from "../../components/ArticleList";

function Tag() {
  const { articles, error } = useLoaderData() as {
    articles: IArticle[];
    error: PostgrestError | null;
  };

  return (
    <Container maxW={{ base: "100%", md: "50%" }} py={8}>
      <ArticleList articles={articles} error={error} />
    </Container>
  );
}

export default Tag;
