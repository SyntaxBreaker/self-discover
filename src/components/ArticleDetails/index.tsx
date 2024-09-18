import { Text, Flex, Icon, Heading, Stack, Tag } from "@chakra-ui/react";
import TagList from "../TagList";
import IArticle from "../../types/article";

function ArticleDetails({ article }: { article: IArticle }) {
  return (
    <>
      <Text fontSize="sm" fontWeight="bold">
        {article.nickname}
      </Text>
      <Flex alignItems="center" gap={1}>
        <Icon viewBox="0 0 24 24">
          <path
            fill="#888888"
            d="M12 14q-.425 0-.713-.288T11 13q0-.425.288-.713T12 12q.425 0 .713.288T13 13q0 .425-.288.713T12 14Zm-4 0q-.425 0-.713-.288T7 13q0-.425.288-.713T8 12q.425 0 .713.288T9 13q0 .425-.288.713T8 14Zm8 0q-.425 0-.713-.288T15 13q0-.425.288-.713T16 12q.425 0 .713.288T17 13q0 .425-.288.713T16 14Zm-4 4q-.425 0-.713-.288T11 17q0-.425.288-.713T12 16q.425 0 .713.288T13 17q0 .425-.288.713T12 18Zm-4 0q-.425 0-.713-.288T7 17q0-.425.288-.713T8 16q.425 0 .713.288T9 17q0 .425-.288.713T8 18Zm8 0q-.425 0-.713-.288T15 17q0-.425.288-.713T16 16q.425 0 .713.288T17 17q0 .425-.288.713T16 18ZM5 22q-.825 0-1.413-.588T3 20V6q0-.825.588-1.413T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.588 1.413T19 22H5Zm0-2h14V10H5v10Z"
          />
        </Icon>
        <Text fontSize="sm">
          {article.created_at.split("T")[0].split("-").reverse().join(".")}
        </Text>
      </Flex>
      <Heading size="lg" marginTop={4} color="gray.700">
        {article.title}
      </Heading>
      {article.tags && article.tags.length > 0 && (
        <Stack direction="row" flexWrap="wrap" marginTop={4}>
          <TagList tags={article.tags.slice(0, 8)} size="sm" />
          {article.tags.length > 8 && (
            <Tag
              colorScheme="blue"
              _hover={{ bg: "#2B6CB0", color: "white" }}
              size="sm"
            >
              and more...
            </Tag>
          )}
        </Stack>
      )}
    </>
  );
}

export default ArticleDetails;
