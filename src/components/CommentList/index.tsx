import { Flex, Heading } from "@chakra-ui/react";
import IComment from "../../types/comment";
import Comment from "../Comment";
import CommentForm from "../CommentForm";
import { useAuth } from "../../context/AuthProvider";
import { IAuthContext } from "../../types/auth";

interface CommentListProps {
  comments: IComment[];
  setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
}

function CommentList({ comments, setComments }: CommentListProps) {
  const { user } = useAuth() as IAuthContext;

  return (
    <Flex flexDirection="column" gap={2} marginTop={8} borderRadius={4}>
      {comments.length > 0 && (
        <Heading as="h2" size="md">
          Comments
        </Heading>
      )}
      {user && <CommentForm setComments={setComments} />}
      {comments.map((comment) => (
        <Comment comment={comment} setComments={setComments} key={comment.id} />
      ))}
    </Flex>
  );
}

export default CommentList;
