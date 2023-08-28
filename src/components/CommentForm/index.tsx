import { Box, Button, Card, Flex, FormControl } from "@chakra-ui/react";
import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { IAuthContext } from "../../types/auth";
import ReactQuill from "react-quill";
import { supabase } from "../../utils/supabase";
import { useParams } from "react-router-dom";
import IComment from "../../types/comment";

function CommentForm({
  setComments,
}: {
  setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
}) {
  const [content, setContent] = useState("");

  const { user } = useAuth() as IAuthContext;
  let { Id: id } = useParams();

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
    ],
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const newComment = {
      content: content,
      author_id: user.id,
      nickname: user.user_metadata.username ?? user.email?.split("@")[0],
      article_id: id,
      likes: [],
    };

    const { data, error } = await supabase
      .from("comments")
      .insert(newComment)
      .select();

    if (!error) {
      setComments((prev) => [...prev, data[0]]);
      setContent("");
    }
  };

  return (
    <Box marginTop={4} as={Card} padding={4}>
      <Flex direction="column" as="form" onSubmit={handleSubmit}>
        <FormControl marginTop={4}>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={(newContent) => setContent(newContent)}
            style={{ height: "250px", paddingBottom: 48 }}
            modules={modules}
            placeholder="Add a new commment..."
          />
        </FormControl>
        <Button
          marginTop={{ base: 8, sm: 2 }}
          alignSelf="flex-end"
          colorScheme="blue"
          type="submit"
        >
          Submit
        </Button>
      </Flex>
    </Box>
  );
}

export default CommentForm;
