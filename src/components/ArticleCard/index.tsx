import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  Text,
  Image,
  Icon,
  Tag,
  Flex,
  CardFooter,
} from "@chakra-ui/react";
import IArticle from "../../types/article";
import "react-quill/dist/quill.core.css";
import { AkarIconsThumbsUp, Fa6RegularComments } from "../Icons";
import TagList from "../TagList";

function ArticleCard({ article }: { article: IArticle }) {
  return (
    <Card key={article.id} position="static">
      <CardHeader padding="0">
        <Image
          objectFit="cover"
          src={article.image}
          borderTopRadius="6px"
          height="240px"
          width="full"
          alt=""
        />
      </CardHeader>
      <CardBody>
        <Text fontSize="lg" fontWeight="bold">
          {article.nickname}
        </Text>
        <Flex alignItems="center" gap={1}>
          <Icon viewBox="0 0 24 24">
            <path
              fill="#888888"
              d="M12 14q-.425 0-.713-.288T11 13q0-.425.288-.713T12 12q.425 0 .713.288T13 13q0 .425-.288.713T12 14Zm-4 0q-.425 0-.713-.288T7 13q0-.425.288-.713T8 12q.425 0 .713.288T9 13q0 .425-.288.713T8 14Zm8 0q-.425 0-.713-.288T15 13q0-.425.288-.713T16 12q.425 0 .713.288T17 13q0 .425-.288.713T16 14Zm-4 4q-.425 0-.713-.288T11 17q0-.425.288-.713T12 16q.425 0 .713.288T13 17q0 .425-.288.713T12 18Zm-4 0q-.425 0-.713-.288T7 17q0-.425.288-.713T8 16q.425 0 .713.288T9 17q0 .425-.288.713T8 18Zm8 0q-.425 0-.713-.288T15 17q0-.425.288-.713T16 16q.425 0 .713.288T17 17q0 .425-.288.713T16 18ZM5 22q-.825 0-1.413-.588T3 20V6q0-.825.588-1.413T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.588 1.413T19 22H5Zm0-2h14V10H5v10Z"
            />
          </Icon>
          <Text>
            {article.created_at.split("T")[0].split("-").reverse().join(".")}
          </Text>
        </Flex>
        <Heading size="lg" marginTop={4} color="gray.700">
          {article.title}
        </Heading>
        {article.tags && (
          <Stack direction="row" flexWrap="wrap" marginTop={4}>
            <TagList tags={article.tags.slice(0, 8)} size="md" />
            {article.tags.length > 8 && (
              <Tag
                colorScheme="blue"
                _hover={{ bg: "#2B6CB0", color: "white" }}
                size="md"
              >
                and more...
              </Tag>
            )}
          </Stack>
        )}
      </CardBody>
      <CardFooter marginTop="-4">
        <Stack
          direction="row"
          spacing="24px"
          marginTop={article.tags?.length > 0 ? 0 : -4}
        >
          <Flex alignItems="center" gap={2}>
            <Icon as={AkarIconsThumbsUp} />
            <Text>
              {article.likes && article.likes.length > 0
                ? article.likes.length
                : 0}{" "}
              {article.likes?.length === 1 ? "like" : "likes"}
            </Text>
          </Flex>
          <Flex alignItems="center" gap={2}>
            <Icon as={Fa6RegularComments} />
            <Text>
              {article.comments && article.comments.length > 0
                ? article.comments.length
                : 0}{" "}
              {article.comments?.length === 1 ? "comment" : "comments"}
            </Text>
          </Flex>
        </Stack>
      </CardFooter>
    </Card>
  );
}

export default ArticleCard;
