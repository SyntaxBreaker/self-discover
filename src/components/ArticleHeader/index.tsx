import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { IAuthContext } from "../../types/auth";
import IArticle from "../../types/article";

interface IProps {
  article: IArticle;
  onOpen: () => void;
}

function ArticleHeader({ article, onOpen }: IProps) {
  const { user } = useAuth() as IAuthContext;

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
    >
      <Stack direction="row" flexWrap="wrap" alignItems="center" gap={1}>
        <Text as="span">
          Created by{" "}
          <Text as="span" fontWeight="bold">
            {article.nickname}
          </Text>
        </Text>
        <Text>&#183;</Text>
        <Text fontSize="sm">
          {article.created_at.split("T")[0].split("-").reverse().join(".")}
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
            onClick={onOpen}
          >
            Remove
          </Button>
        </Stack>
      )}
    </Stack>
  );
}

export default ArticleHeader;
