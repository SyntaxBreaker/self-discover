import {
  Box,
  Button,
  Card,
  Flex,
  FormControl,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import IComment from "../../types/comment";
import { useAuth } from "../../context/AuthProvider";
import { IAuthContext } from "../../types/auth";
import { supabase } from "../../utils/supabase";
import { useState } from "react";
import ReactQuill from "react-quill";
import DOMPurify from "dompurify";
import { AkarIconsThumbsUp } from "../Icons";
import toggleLike from "../../utils/toggleLike";

function Comment({
  comment,
  setComments,
}: {
  comment: IComment;
  setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
}) {
  const [updatedComment, setUpdatedComment] = useState(comment.content);
  const [isEditing, setIsEditing] = useState(false);
  const [likes, setLikes] = useState(comment.likes);

  const { user } = useAuth() as IAuthContext;

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

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
    ],
  };

  return (
    <Flex direction="column" marginTop={4} gap={1} as={Card} padding={4}>
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
              variant="outline"
              size="sm"
              colorScheme="blue"
              onClick={() => setIsEditing(!isEditing)}
            >
              Edit
            </Button>
            <Button size="sm" colorScheme="red" onClick={removeComment}>
              Remove
            </Button>
          </Stack>
        )}
      </Stack>
      {isEditing ? (
        <Flex direction="column" as="form" onSubmit={editComment}>
          <FormControl marginTop={4}>
            <ReactQuill
              theme="snow"
              value={updatedComment}
              onChange={(newContent) => setUpdatedComment(newContent)}
              style={{ height: "250px", paddingBottom: 48 }}
              modules={modules}
            />
          </FormControl>
          <Button
            marginTop={2}
            alignSelf="flex-end"
            colorScheme="blue"
            type="submit"
          >
            Submit
          </Button>
        </Flex>
      ) : (
        <Box
          letterSpacing="0.8px"
          className="react-markdown"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(comment.content),
          }}
        />
      )}
      <Stack
        direction="row"
        alignItems="center"
        marginTop={2}
        _hover={user && { cursor: "pointer", fontWeight: "bold" }}
        onClick={() =>
          user &&
          toggleLike({
            table: "comments",
            likes: likes,
            setLikes: setLikes,
            id: comment.id,
            userId: user.id,
          })
        }
      >
        <Icon as={AkarIconsThumbsUp} />
        <Text>
          {likes.length > 0 ? likes.length : 0}{" "}
          {likes.length === 1 ? "like" : "likes"}
        </Text>
      </Stack>
    </Flex>
  );
}

export default Comment;
