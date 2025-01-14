import { Stack, Button } from "@chakra-ui/react";
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
    <Stack direction="row" spacing="16px" marginTop={4}>
      <Button
        fontWeight={user && likes.includes(user.id) ? "600" : "normal"}
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
        leftIcon={<AkarIconsThumbsUp />}
        size="sm"
      >
        {likes.length > 0 ? likes.length : 0}{" "}
        {likes.length === 1 ? "like" : "likes"}
      </Button>
      <Button
        fontWeight="400"
        onClick={() => myRef.current?.scrollIntoView({ behavior: "smooth" })}
        leftIcon={<Fa6RegularComments />}
        size="sm"
      >
        {comments.length > 0 ? comments.length : 0}{" "}
        {comments.length === 1 ? "comment" : "comments"}
      </Button>
    </Stack>
  );
}

export default Feedback;
