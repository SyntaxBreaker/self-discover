import { useLoaderData } from "react-router-dom";
import IArticle from "../../types/article";
import { PostgrestError } from "@supabase/supabase-js";
import ArticleList from "../../components/ArticleList";
import ResponsiveContainer from "../../components/ResponsiveContainer";

function Tag() {
  const { articles, error } = useLoaderData() as {
    articles: IArticle[];
    error: PostgrestError | null;
  };

  return (
    <ResponsiveContainer>
      <ArticleList articles={articles} error={error} />
    </ResponsiveContainer>
  );
}

export default Tag;
