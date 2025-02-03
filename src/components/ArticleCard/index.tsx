import {
  Card,
  CardBody,
  CardHeader,
  Image,
  CardFooter,
} from "@chakra-ui/react";
import IArticle from "../../types/article";
import "react-quill/dist/quill.core.css";
import ArticleStats from "../ArticleStats";
import ArticleDetails from "../ArticleDetails";

function ArticleCard({ article }: { article: IArticle }) {
  return (
    <Card key={article.id} position="static" _hover={{ transform: "scale(1.01)" }}>
      <CardHeader padding="0">
        <Image
          loading="lazy"
          objectFit="cover"
          src={article.image}
          borderTopRadius="6px"
          height={{ base: "320px", xl: "240px" }}
          width="full"
          alt=""
        />
      </CardHeader>
      <CardBody>
        <ArticleDetails article={article} />
      </CardBody>
      <CardFooter marginTop="-4">
        <ArticleStats article={article} />
      </CardFooter>
    </Card>
  );
}

export default ArticleCard;
