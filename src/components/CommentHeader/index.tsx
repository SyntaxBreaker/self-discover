import { Stack, Text, Button } from "@chakra-ui/react";
import { useAuth } from "../../context/AuthProvider";
import { IAuthContext } from "../../types/auth";
import IComment from "../../types/comment";

interface IProps {
  comment: IComment;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  removeComment: () => Promise<void>;
}

function CommentHeader({
  comment,
  isEditing,
  setIsEditing,
  removeComment,
}: IProps) {
  const { user } = useAuth() as IAuthContext;

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
    >
      <Stack direction="row" alignItems="center">
        <Text fontSize="lg" fontWeight="bold">
          {comment.nickname}
        </Text>
        <Text fontSize="sm">&#183;</Text>
        <Text fontSize="sm">
          {comment.created_at.split("T")[0].split("-").reverse().join(".")}
        </Text>
      </Stack>
      {user && user.id === comment.author_id && !isEditing && (
        <Stack direction="row">
          <Button
            position="static"
            size="sm"
            colorScheme="facebook"
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Edit
          </Button>
          <Button
            position="static"
            variant="outline"
            size="sm"
            colorScheme="red"
            onClick={removeComment}
          >
            Remove
          </Button>
        </Stack>
      )}
    </Stack>
  );
}

export default CommentHeader;
