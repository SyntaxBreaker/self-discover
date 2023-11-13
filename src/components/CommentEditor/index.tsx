import { Button, Flex, FormControl } from "@chakra-ui/react";
import ReactQuill from "react-quill";

interface IProps {
  editComment: (e: React.SyntheticEvent) => Promise<void>;
  updatedComment: string;
  setUpdatedComment: React.Dispatch<React.SetStateAction<string>>;
}

function CommentEditor({
  editComment,
  updatedComment,
  setUpdatedComment,
}: IProps) {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
    ],
  };

  return (
    <Flex
      direction="column"
      as="form"
      onSubmit={editComment}
      gap={2}
      marginTop={4}
    >
      <FormControl position="static">
        <ReactQuill
          theme="snow"
          value={updatedComment}
          onChange={(newContent) => setUpdatedComment(newContent)}
          modules={modules}
          style={{ position: "static" }}
        />
      </FormControl>
      <Button alignSelf="flex-end" colorScheme="blue" type="submit">
        Submit
      </Button>
    </Flex>
  );
}

export default CommentEditor;
