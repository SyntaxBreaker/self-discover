import { useEffect, useState } from "react";
import { supabase } from "./utils/supabase";
import IArticle from "./types/article";
import ArticleList from "./components/ArticleList";
import { PostgrestError } from "@supabase/supabase-js";
import DataFilter from "./components/DataFilter";
import ResponsiveContainer from "./components/ResponsiveContainer";
import { Button, Flex, Heading } from "@chakra-ui/react";
import SortingOptions from "./components/SortingOptions";
import sortArticles from "./utils/sortArticles";
import { useAuth } from "./context/AuthProvider";
import { IAuthContext } from "./types/auth";
import { Link } from "react-router-dom";

function App() {
  const [articles, setArticles] = useState<IArticle[] | null>(null);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [filterKeyword, setFilterKeyword] = useState("");
  const [filteredArticles, setFilteredArticles] = useState<IArticle[] | null>(
    null
  );
  const [currentSorting, setCurrentSorting] = useState("latest");

  const { user } = useAuth() as IAuthContext;

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
          (article.tags as string[]).some((tag) =>
            tag.includes(filterKeyword.toLowerCase())
          )
      );
      setFilteredArticles(filteredData ? filteredData : null);
    }
  }, [filterKeyword]);

  useEffect(() => {
    if (filterKeyword.length === 0) {
      setArticles(sortArticles(articles, currentSorting));
    } else {
      setFilteredArticles(sortArticles(filteredArticles, currentSorting));
    }
  }, [currentSorting]);

  return (
    <ResponsiveContainer>
      {articles && articles.length > 0 && (
        <Flex direction="column" gap={4}>
          <Flex
            justifyContent={user ? "space-between" : "center"}
            flexWrap="wrap"
          >
            <Heading as="h1" size="lg" color="gray.700">
              All Articles
            </Heading>
            {user && (
              <Button size="md" colorScheme="facebook" as={Link} to={`create`}>
                Create Article
              </Button>
            )}
          </Flex>
          <DataFilter
            filterKeyword={filterKeyword}
            setFilterKeyword={setFilterKeyword}
          />
          <SortingOptions
            currentSorting={currentSorting}
            setCurrentSorting={setCurrentSorting}
          />
        </Flex>
      )}
      <ArticleList
        articles={filteredArticles ? filteredArticles : articles}
        error={error}
      />
    </ResponsiveContainer>
  );
}

export default App;
