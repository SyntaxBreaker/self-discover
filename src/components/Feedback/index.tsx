import { Stack, Flex, Icon, Text } from "@chakra-ui/react";
import { AkarIconsThumbsUp, Fa6RegularComments } from "../../components/Icons";
import { useAuth } from "../../context/AuthProvider";
import { IAuthContext } from "../../types/auth";
import toggleLike from "../../utils/toggleLike";
import IComment from "../../types/comment";

interface IProps {
  likes: string[];
  setLikes: React.Dispatch<React.SetStateAction<string[]>>;
  articleID: number;
  setStatus: React.Dispatch<
    React.SetStateAction<{
      type: "success" | "error";
      message: string;
    } | null>
  >;
  comments: IComment[];
  myRef: React.MutableRefObject<HTMLDivElement | null>;
}

function Feedback({
  likes,
  setLikes,
  articleID,
  setStatus,
  comments,
  myRef,
}: IProps) {
  const { user } = useAuth() as IAuthContext;

  return (
    <Stack direction="row" spacing="24px" marginTop={8}>
      <Flex
        alignItems="center"
        gap={2}
        _hover={user && { cursor: "pointer", transform: "scale(1.05)" }}
        onClick={() =>
          user &&
          toggleLike({
            table: "articles",
            likes: likes,
            setLikes: setLikes,
            id: articleID,
            userId: user.id,
            setStatus: setStatus,
          })
        }
      >
        <Icon as={AkarIconsThumbsUp} />
        <Text fontWeight={user && likes.includes(user.id) ? "bold" : "normal"}>
          {likes.length > 0 ? likes.length : 0}{" "}
          {likes.length === 1 ? "like" : "likes"}
        </Text>
      </Flex>
      <Flex
        alignItems="center"
        gap={2}
        _hover={{ cursor: "pointer", transform: "scale(1.05)" }}
        onClick={() => myRef.current?.scrollIntoView({ behavior: "smooth" })}
      >
        <Icon as={Fa6RegularComments} />
        <Text>
          {comments.length > 0 ? comments.length : 0}{" "}
          {comments.length === 1 ? "comment" : "comments"}
        </Text>
      </Flex>
    </Stack>
  );
}

export default Feedback;
