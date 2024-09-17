import { Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { AkarIconsThumbsUp, Fa6RegularComments } from "../Icons";
import IArticle from "../../types/article";

function ArticleStats({ article }: { article: IArticle }) {
  return (
    <Stack direction="row" spacing="24px">
      <Flex alignItems="center" gap={2}>
        <Icon as={AkarIconsThumbsUp} />
        <Text fontSize="sm">
          {article.likes && article.likes.length > 0 ? article.likes.length : 0}{" "}
          {article.likes?.length === 1 ? "like" : "likes"}
        </Text>
      </Flex>
      <Flex alignItems="center" gap={2}>
        <Icon as={Fa6RegularComments} />
        <Text fontSize="sm">
          {article.comments && article.comments.length > 0
            ? article.comments.length
            : 0}{" "}
          {article.comments?.length === 1 ? "comment" : "comments"}
        </Text>
      </Flex>
    </Stack>
  );
}

export default ArticleStats;
