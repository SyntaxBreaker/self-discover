import { useLoaderData, useParams } from "react-router-dom";
import IArticle from "../../types/article";
import { PostgrestError } from "@supabase/supabase-js";
import ArticleList from "../../components/ArticleList";
import ResponsiveContainer from "../../components/ResponsiveContainer";
import { Heading } from "@chakra-ui/react";

function Tag() {
  const { articles, error } = useLoaderData() as {
    articles: IArticle[];
    error: PostgrestError | null;
  };
  const { tag } = useParams();

  return (
    <ResponsiveContainer>
      <Heading
        textAlign="center"
        as="h1"
        size="xl"
        color="gray.700"
        marginBottom={8}
      >
        Explore {tag}
      </Heading>
      <ArticleList articles={articles} error={error} />
    </ResponsiveContainer>
  );
}

export default Tag;
