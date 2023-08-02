import { Box, Container, SimpleGrid, Text } from "@chakra-ui/react";
import "./App.css";
import { useEffect, useState } from "react";
import { supabase } from "./utils/supabase";
import IArticle from "./types/article";
import ArticleCard from "./components/ArticleCard";

function App() {
  const [articles, setArticles] = useState<IArticle[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getArticles = async () => {
      const { data, error } = await supabase.from("articles").select();

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
        <Box bgColor="#C53030" padding={4} borderRadius={8}>
          <Text color="white" align="center">
            Unable to load articles. Please check your internet connection.
          </Text>
        </Box>
      )}
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(360px, 1fr))"
        alignItems="flex-start"
      >
        {articles?.map((article) => (
          <ArticleCard article={article} />
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default App;
