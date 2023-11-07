import { useEffect, useRef, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import IArticle from "../../types/article";
import {
  Alert,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useAuth } from "../../context/AuthProvider";
import { IAuthContext } from "../../types/auth";
import { supabase } from "../../utils/supabase";
import DOMPurify from "isomorphic-dompurify";
import { AkarIconsThumbsUp, Fa6RegularComments } from "../../components/Icons";
import IComment from "../../types/comment";
import CommentList from "../../components/CommentList";
import toggleLike from "../../utils/toggleLike";
import ResponsiveContainer from "../../components/ResponsiveContainer";
import TagList from "../../components/TagList";
import Error from "../../components/Error";

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

  const { user } = useAuth() as IAuthContext;
  const myRef = useRef<HTMLDivElement | null>(null);

  let redirectTimeout: ReturnType<typeof setTimeout>;

  const removeArticle = async () => {
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
      redirectTimeout = setTimeout(() => {
        window.location.replace("/");
      }, 5000);
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(redirectTimeout);
    };
  }, []);

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
        <Error errorMessage="This article doesn&apos;t exist" />
      ) : (
        <Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
          >
            <Stack direction="row" flexWrap="wrap" gap={1}>
              <Text fontWeight="bold">Created by {article.nickname}</Text>
              <Text>&#183;</Text>
              <Text>
                {article.created_at
                  .split("T")[0]
                  .split("-")
                  .reverse()
                  .join(".")}
              </Text>
            </Stack>
            {user && user.id === article.author_id && (
              <Stack direction="row">
                <Button
                  size="sm"
                  colorScheme="facebook"
                  as={Link}
                  to={`/edit/${article.id}`}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  variant="outline"
                  onClick={removeArticle}
                >
                  Remove
                </Button>
              </Stack>
            )}
          </Stack>
          <Stack
            direction="row"
            justify="space-between"
            wrap="wrap"
            marginTop={8}
          >
            <Heading as="h1" size="2xl" color="gray.700">
              {article.title}
            </Heading>
          </Stack>
          <Box
            letterSpacing="0.8px"
            marginTop={8}
            className="react-markdown"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(article.content),
            }}
          />
          {article.tags && (
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
                >
                  {isTagListExpanded ? "Show less" : "Show more"}
                </Button>
              )}
            </Stack>
          )}
          <Stack direction="row" spacing="24px" marginTop={8}>
            <Flex
              alignItems="center"
              gap={2}
              _hover={user && { cursor: "pointer" }}
              onClick={() =>
                user &&
                toggleLike({
                  table: "articles",
                  likes: likes,
                  setLikes: setLikes,
                  id: article.id,
                  userId: user.id,
                  setStatus: setStatus,
                })
              }
            >
              <Icon as={AkarIconsThumbsUp} />
              <Text
                fontWeight={user && likes.includes(user.id) ? "bold" : "normal"}
              >
                {likes.length > 0 ? likes.length : 0}{" "}
                {likes.length === 1 ? "like" : "likes"}
              </Text>
            </Flex>
            <Flex
              alignItems="center"
              gap={2}
              _hover={{ cursor: "pointer", fontWeight: "bold" }}
              onClick={() =>
                myRef.current?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <Icon as={Fa6RegularComments} />
              <Text>
                {comments.length > 0 ? comments.length : 0}{" "}
                {comments.length === 1 ? "comment" : "comments"}
              </Text>
            </Flex>
          </Stack>
          <Box ref={myRef}>
            <CommentList comments={comments} setComments={setComments} />
          </Box>
        </Box>
      )}
    </ResponsiveContainer>
  );
}

export default Article;
