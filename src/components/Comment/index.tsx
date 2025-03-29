import { Box, Button, Card, Flex } from "@chakra-ui/react";
import IComment from "../../types/comment";
import { useAuth } from "../../context/AuthProvider";
import { IAuthContext } from "../../types/auth";
import { supabase } from "../../utils/supabase";
import { useState } from "react";
import DOMPurify from "dompurify";
import { LikeIcon } from "../Icons";
import toggleLike from "../../utils/toggleLike";
import CommentHeader from "../CommentHeader";
import CommentEditor from "../CommentEditor";
import { useNavigate } from "react-router-dom";

interface CommentProps {
  comment: IComment;
  setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
}

function Comment({ comment, setComments }: CommentProps) {
  const [updatedComment, setUpdatedComment] = useState(comment.content);
  const [isEditing, setIsEditing] = useState(false);
  const [likes, setLikes] = useState(comment.likes);

  const { user } = useAuth() as IAuthContext;
  const navigate = useNavigate();

  const removeComment = async () => {
    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("id", comment.id);

    if (!error) {
      setComments((prev) =>
        prev.filter((element) => element.id !== comment.id)
      );
    }
  };

  const editComment = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (comment.content === updatedComment) {
      setIsEditing(false);
      return;
    }

    const { error } = await supabase
      .from("comments")
      .update({ content: updatedComment })
      .eq("id", comment.id);

    if (!error) {
      setIsEditing(false);

      setComments((prev) => {
        return prev.map((element) => {
          if (element.id === comment.id) {
            return { ...element, content: updatedComment };
          }
          return element;
        });
      });
    }
  };

  return (
    <Flex
      direction="column"
      marginTop={4}
      gap={{ base: 4, sm: 2 }}
      as={Card}
      padding={4}
      position="static"
    >
      <CommentHeader
        comment={comment}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        removeComment={removeComment}
      />
      {isEditing ? (
        <CommentEditor
          editComment={editComment}
          updatedComment={updatedComment}
          setUpdatedComment={setUpdatedComment}
          setIsEditing={setIsEditing}
        />
      ) : (
        <Box
          className="react-markdown"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(comment.content),
          }}
        />
      )}
      <Button
        size="sm"
        marginTop={{ base: 0, sm: 2 }}
        alignSelf="flex-start"
        fontWeight={user && likes.includes(user.id) ? "bold" : "normal"}
        onClick={() =>
          user
            ? toggleLike({
                table: "comments",
                likes: likes,
                setLikes: setLikes,
                id: comment.id,
                userId: user.id,
              })
            : navigate("/SignIn")
        }
        leftIcon={<LikeIcon />}
      >
        {likes.length > 0 ? likes.length : 0}{" "}
        {likes.length === 1 ? "like" : "likes"}
      </Button>
    </Flex>
  );
}

export default Comment;
