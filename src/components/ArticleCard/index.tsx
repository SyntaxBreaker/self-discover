import {
  Badge,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Stack,
  Text,
  Image,
  Icon,
  Box,
} from "@chakra-ui/react";
import IArticle from "../../types/article";

function ArticleCard({ article }: { article: IArticle }) {
  return (
    <Card key={article.id} position="static">
      <CardHeader padding="0">
        <Image
          objectFit="cover"
          maxW="100%"
          src="https://images.pexels.com/photos/5905485/pexels-photo-5905485.jpeg?&w=1920&h=1280"
          borderTopRadius="6px"
        />
      </CardHeader>
      <CardBody>
        {article.tags && (
          <Stack direction="row">
            {article.tags.map((tag) => (
              <Badge colorScheme="blue" key={tag}>
                {tag}
              </Badge>
            ))}
          </Stack>
        )}
        <Heading size="md" marginTop={article.tags?.length > 0 ? 4 : 0}>
          {article.title}
        </Heading>
        <Box marginTop={4} fontSize="lg" letterSpacing="0.8px" noOfLines={5}>
          {article.content}
        </Box>
      </CardBody>
      <CardFooter alignItems="center" gap={1}>
        <Icon viewBox="0 0 24 24">
          <path
            fill="#888888"
            d="M12 14q-.425 0-.713-.288T11 13q0-.425.288-.713T12 12q.425 0 .713.288T13 13q0 .425-.288.713T12 14Zm-4 0q-.425 0-.713-.288T7 13q0-.425.288-.713T8 12q.425 0 .713.288T9 13q0 .425-.288.713T8 14Zm8 0q-.425 0-.713-.288T15 13q0-.425.288-.713T16 12q.425 0 .713.288T17 13q0 .425-.288.713T16 14Zm-4 4q-.425 0-.713-.288T11 17q0-.425.288-.713T12 16q.425 0 .713.288T13 17q0 .425-.288.713T12 18Zm-4 0q-.425 0-.713-.288T7 17q0-.425.288-.713T8 16q.425 0 .713.288T9 17q0 .425-.288.713T8 18Zm8 0q-.425 0-.713-.288T15 17q0-.425.288-.713T16 16q.425 0 .713.288T17 17q0 .425-.288.713T16 18ZM5 22q-.825 0-1.413-.588T3 20V6q0-.825.588-1.413T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.588 1.413T19 22H5Zm0-2h14V10H5v10Z"
          />
        </Icon>
        <Text>
          {article.created_at.split("T")[0].split("-").reverse().join(".")}
        </Text>
      </CardFooter>
    </Card>
  );
}

export default ArticleCard;
