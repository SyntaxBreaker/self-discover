import { Box, Button, Heading, Stack } from "@chakra-ui/react";
import ArticleHeader from "../ArticleHeader";
import TagList from "../TagList";
import IArticle from "../../types/article";
import DOMPurify from "dompurify";

interface ArticleContentProps {
  article: IArticle;
  onOpen: () => void;
  isTagListExpanded: boolean;
  setIsTagListExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

function ArticleContent({
  article,
  onOpen,
  isTagListExpanded,
  setIsTagListExpanded,
}: ArticleContentProps) {
  return (
    <>
      <ArticleHeader article={article} onOpen={onOpen} />
      <Heading as="h1" size="xl" color="gray.700" marginTop={8}>
        {article.title}
      </Heading>
      <Box
        letterSpacing="0.8px"
        marginTop={8}
        className="react-markdown"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(article.content),
        }}
      />
      {article.tags && article.tags.length > 0 && (
        <Stack marginTop={4}>
          <TagList
            tags={isTagListExpanded ? article.tags : article.tags.slice(0, 8)}
            size="md"
          />
          {article.tags.length > 8 && (
            <Button
              onClick={() => setIsTagListExpanded(!isTagListExpanded)}
              colorScheme="facebook"
              variant="outline"
              marginTop={1}
            >
              {isTagListExpanded ? "Show less" : "Show more"}
            </Button>
          )}
        </Stack>
      )}
    </>
  );
}

export default ArticleContent;
