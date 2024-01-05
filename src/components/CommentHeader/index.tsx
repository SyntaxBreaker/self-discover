import { Stack, Text, Button } from "@chakra-ui/react";
import { useAuth } from "../../context/AuthProvider";
import { IAuthContext } from "../../types/auth";
import IComment from "../../types/comment";

interface IProps {
  comment: IComment;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdatedComment: React.Dispatch<React.SetStateAction<string>>;
  removeComment: () => Promise<void>;
}

function CommentHeader({
  comment,
  isEditing,
  setIsEditing,
  setUpdatedComment,
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
      {user && user.id === comment.author_id && (
        <Stack direction="row">
          <Button
            position="static"
            size="sm"
            colorScheme="facebook"
            onClick={() => {
              if (isEditing) {
                setUpdatedComment(comment.content);
              }
              setIsEditing(!isEditing);
            }}
          >
            {!isEditing ? "Edit" : "Cancel"}
          </Button>
          <Button
            position="static"
            variant="outline"
            size="sm"
            colorScheme="red"
            onClick={removeComment}
            isDisabled={isEditing}
          >
            Remove
          </Button>
        </Stack>
      )}
    </Stack>
  );
}

export default CommentHeader;
