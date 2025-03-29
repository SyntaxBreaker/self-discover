import { Stack, Button } from "@chakra-ui/react";
import { LikeIcon, CommentsIcon } from "../../components/Icons";
import { useAuth } from "../../context/AuthProvider";
import { IAuthContext } from "../../types/auth";
import toggleLike from "../../utils/toggleLike";
import IComment from "../../types/comment";
import { useNavigate } from "react-router-dom";

interface FeedbackProps {
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
}: FeedbackProps) {
  const { user } = useAuth() as IAuthContext;
  const navigate = useNavigate();

  return (
    <Stack direction="row" spacing="16px" marginTop={4}>
      <Button
        fontWeight={user && likes.includes(user.id) ? "600" : "normal"}
        onClick={() =>
          user
            ? toggleLike({
                table: "articles",
                likes: likes,
                setLikes: setLikes,
                id: articleID,
                userId: user.id,
                setStatus: setStatus,
              })
            : navigate("/SignIn")
        }
        leftIcon={<LikeIcon />}
        size="sm"
      >
        {likes.length > 0 ? likes.length : 0}{" "}
        {likes.length === 1 ? "like" : "likes"}
      </Button>
      <Button
        fontWeight="400"
        onClick={() => myRef.current?.scrollIntoView({ behavior: "smooth" })}
        leftIcon={<CommentsIcon />}
        size="sm"
      >
        {comments.length > 0 ? comments.length : 0}{" "}
        {comments.length === 1 ? "comment" : "comments"}
      </Button>
    </Stack>
  );
}

export default Feedback;
