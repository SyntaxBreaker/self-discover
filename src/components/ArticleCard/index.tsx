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
} from "@chakra-ui/react";
import IArticle from "../../types/article";
import { Link } from "react-router-dom";
import "react-quill/dist/quill.core.css";

function ArticleCard({ article }: { article: IArticle }) {
  return (
    <Card key={article.id} position="static">
      <CardHeader padding="0">
        <Image
          objectFit="cover"
          src="https://images.pexels.com/photos/5905485/pexels-photo-5905485.jpeg?&w=1920&h=1280"
          borderTopRadius="6px"
          height="200px"
          width="full"
        />
      </CardHeader>
      <CardBody>
        {article.tags && (
          <Stack direction="row" flexWrap="wrap">
            {article.tags.map((tag) => (
              <Link to={`/tag/${tag}`} key={tag}>
                <Tag
                  colorScheme="blue"
                  _hover={{ bg: "#2B6CB0", color: "white" }}
                >
                  {tag}
                </Tag>
              </Link>
            ))}
          </Stack>
        )}
        <Heading size="lg" marginTop={article.tags?.length > 0 ? 4 : 0}>
          {article.title}
        </Heading>
        <Flex alignItems="center" gap={1} marginTop={4}>
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
      </CardBody>
    </Card>
  );
}

export default ArticleCard;
