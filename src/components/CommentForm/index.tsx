import { Button, Flex, FormControl } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { IAuthContext } from "../../types/auth";
import ReactQuill from "react-quill";
import { supabase } from "../../utils/supabase";
import { useParams } from "react-router-dom";
import IComment from "../../types/comment";
import {
  addAccessibilityAttributes,
  quillToolbarConfig,
} from "../../utils/quill";

interface CommentFormProps {
  setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
}

function CommentForm({ setComments }: CommentFormProps) {
  const [content, setContent] = useState("");

  const { user } = useAuth() as IAuthContext;
  let { Id: id } = useParams();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (content.length === 0) {
      return;
    }

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

  useEffect(() => {
    addAccessibilityAttributes();
  }, []);

  return (
    <Flex
      direction="column"
      as="form"
      onSubmit={handleSubmit}
      marginTop={4}
      flexDirection="column"
      gap={4}
    >
      <FormControl position="static">
        <ReactQuill
          theme="snow"
          value={content}
          onChange={(newContent) => setContent(newContent)}
          modules={quillToolbarConfig}
          style={{ position: "static" }}
        />
      </FormControl>
      <Button
        alignSelf="flex-end"
        colorScheme="facebook"
        type="submit"
        isDisabled={content.length === 0}
      >
        Submit
      </Button>
    </Flex>
  );
}

export default CommentForm;
