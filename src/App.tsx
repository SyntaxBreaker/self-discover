import { Container } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "./utils/supabase";
import IArticle from "./types/article";
import ArticleList from "./components/ArticleList";
import { PostgrestError } from "@supabase/supabase-js";

function App() {
  const [articles, setArticles] = useState<IArticle[] | null>(null);
  const [error, setError] = useState<PostgrestError | null>(null);

  useEffect(() => {
    const getArticles = async () => {
      const { data, error } = await supabase
        .from("articles")
        .select()
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

  return (
    <Container maxW={{ base: "100%", md: "50%" }} py={8}>
      <ArticleList articles={articles} error={error} />
    </Container>
  );
}

export default App;
