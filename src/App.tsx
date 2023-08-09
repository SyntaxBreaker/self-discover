import { Alert, AlertIcon, Container, SimpleGrid } from "@chakra-ui/react";
import "./App.css";
import { useEffect, useState } from "react";
import { supabase } from "./utils/supabase";
import IArticle from "./types/article";
import ArticleCard from "./components/ArticleCard";
import { Link } from "react-router-dom";

function App() {
  const [articles, setArticles] = useState<IArticle[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getArticles = async () => {
      const { data, error } = await supabase.from("articles").select().order('id', {ascending: false});

      if (error) {
        setError(true);
        setArticles(null);
      } else {
        setError(false);
        setArticles(data);
      }
    };

    getArticles();
  }, []);

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
        templateColumns="repeat(auto-fill, minmax(360px, 1fr))"
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

export default App;
