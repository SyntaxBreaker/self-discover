import { Container } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "./utils/supabase";
import IArticle from "./types/article";
import ArticleList from "./components/ArticleList";
import { PostgrestError } from "@supabase/supabase-js";
import DataFilter from "./components/DataFilter";

function App() {
  const [articles, setArticles] = useState<IArticle[] | null>(null);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [filterKeyword, setFilterKeyword] = useState("");
  const [filteredArticles, setFilteredArticles] = useState<
    IArticle[] | null | undefined
  >(null);

  useEffect(() => {
    const getArticles = async () => {
      const { data, error } = await supabase
        .from("articles")
        .select(`*, comments(*)`)
        .order("id", { ascending: false });

      if (error) {
        setError(error);
        setArticles(null);
      } else {
        setError(null);
        setArticles(data);
      }
    };

    getArticles();
  }, []);

  useEffect(() => {
    if (filterKeyword.length === 0) {
      setFilteredArticles(null);
    } else {
      const filteredData = articles?.filter(
        (article) =>
          article.title
            .toLocaleLowerCase()
            .includes(filterKeyword.toLocaleLowerCase()) ||
          (article.tags as string[]).includes(filterKeyword.toLowerCase())
      );
      setFilteredArticles(filteredData);
    }
  }, [filterKeyword]);

  return (
    <Container maxW={{ base: "100%", md: "50%" }} py={8}>
      <DataFilter
        filterKeyword={filterKeyword}
        setFilterKeyword={setFilterKeyword}
      />
      <ArticleList
        articles={filteredArticles ? filteredArticles : articles}
        error={error}
      />
    </Container>
  );
}

export default App;
