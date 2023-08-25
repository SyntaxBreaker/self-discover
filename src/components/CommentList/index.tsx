import { Box, Heading } from "@chakra-ui/react";
import IComment from "../../types/comment";
import Comment from "../Comment";
import CommentForm from "../CommentForm";
import { useAuth } from "../../context/AuthProvider";
import { IAuthContext } from "../../types/auth";

function CommentList({
  comments,
  setComments,
}: {
  comments: IComment[];
  setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
}) {
  const { user } = useAuth() as IAuthContext;

  return (
    <Box marginTop={16} borderRadius={4}>
      <Heading as="h2" size="md">
        Comments
      </Heading>
      {user && <CommentForm setComments={setComments} />}
      {comments.map((comment) => (
        <Comment comment={comment} setComments={setComments} key={comment.id} />
      ))}
    </Box>
  );
}

export default CommentList;
