import { useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import IArticle from "../../types/article";
import {
  Alert,
  Box,
  Button,
  Heading,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { supabase } from "../../utils/supabase";
import DOMPurify from "isomorphic-dompurify";
import IComment from "../../types/comment";
import CommentList from "../../components/CommentList";
import ResponsiveContainer from "../../components/ResponsiveContainer";
import TagList from "../../components/TagList";
import Error from "../../components/Error";
import Feedback from "../../components/Feedback";
import DeletionConfirmation from "../../components/DeletionConfirmation";
import ArticleHeader from "../../components/ArticleHeader";

function Article() {
  const { article, error } = useLoaderData() as {
    article: IArticle;
    error: string;
  };

  const [status, setStatus] = useState<null | {
    type: "success" | "error";
    message: string;
  }>(null);
  const [likes, setLikes] = useState<string[]>(article?.likes || []);
  const [comments, setComments] = useState<IComment[]>(article?.comments || []);
  const [isTagListExpanded, setIsTagListExpanded] = useState(false);

  const myRef = useRef<HTMLDivElement | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleRemoveArticle = async () => {
    const { error } = await supabase
      .from("articles")
      .delete()
      .eq("id", article.id);

    if (error) {
      setStatus({
        type: "error",
        message: error.message,
      });
    } else {
      setStatus({
        type: "success",
        message: "The article was successfully removed",
      });
    }
  };

  useEffect(() => {
    let redirectTimeout: ReturnType<typeof setTimeout>;

    if (status?.type === "success") {
      redirectTimeout = setTimeout(() => {
        window.location.replace("/");
      }, 5000);
    }

    return () => {
      clearTimeout(redirectTimeout);
    };
  }, [status]);

  return (
    <ResponsiveContainer>
      {status && (
        <Alert
          status={status.type}
          marginBottom={2}
          padding={4}
          borderRadius={8}
        >
          {status.message}
        </Alert>
      )}
      {error || !article ? (
        <Error errorMessage="This article doesn't exist" />
      ) : (
        <Box>
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
            <Stack marginTop={8}>
              <TagList
                tags={
                  isTagListExpanded ? article.tags : article.tags.slice(0, 8)
                }
                size="lg"
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
          <Feedback
            likes={likes}
            setLikes={setLikes}
            articleID={article.id}
            setStatus={setStatus}
            comments={comments}
            myRef={myRef}
          />
          <Box ref={myRef}>
            <CommentList comments={comments} setComments={setComments} />
          </Box>
          <DeletionConfirmation
            isOpen={isOpen}
            onClose={onClose}
            handleRemove={handleRemoveArticle}
          />
        </Box>
      )}
    </ResponsiveContainer>
  );
}

export default Article;
