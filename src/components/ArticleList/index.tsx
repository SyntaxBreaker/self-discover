import { SimpleGrid, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ArticleCard from "../ArticleCard";
import IArticle from "../../types/article";
import { PostgrestError } from "@supabase/supabase-js";
import EmptyArticleList from "../EmptyArticleList";
import Error from "../Error";

function ArticleList({
  articles,
  error,
}: {
  articles: IArticle[] | null;
  error: PostgrestError | null;
}) {
  return (
    <Stack marginTop={8}>
      {error ?
        <Error errorMessage="Unable to load articles." />
        : articles?.length === 0 ?
          <EmptyArticleList />
          :
          <SimpleGrid
            spacing={4}
            templateColumns={{ base: "1fr", xl: "repeat(2, 1fr)" }}
            alignItems="flex-start"
          >
            {articles?.map((article) => (
              <Link to={`/article/${article.id}`} key={article.id}>
                <ArticleCard article={article} />
              </Link>
            ))}
          </SimpleGrid>
      }
    </Stack>
  );
}

export default ArticleList;
