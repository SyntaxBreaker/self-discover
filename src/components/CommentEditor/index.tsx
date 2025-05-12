import { Button, Flex, FormControl } from "@chakra-ui/react";
import ReactQuill from "react-quill";
import {
  addAccessibilityAttributes,
  quillToolbarConfig,
} from "../../utils/quill";
import { useEffect } from "react";

interface CommentEditorProps {
  editComment: (e: React.SyntheticEvent) => Promise<void>;
  updatedComment: string;
  setUpdatedComment: React.Dispatch<React.SetStateAction<string>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

function CommentEditor({
  editComment,
  updatedComment,
  setUpdatedComment,
  setIsEditing,
}: CommentEditorProps) {
  useEffect(() => {
    addAccessibilityAttributes();
  }, []);

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
          modules={quillToolbarConfig}
          style={{ position: "static" }}
        />
      </FormControl>
      <Flex gap={2} alignSelf="end">
        <Button
          alignSelf="flex-end"
          colorScheme="red"
          size="sm"
          variant="outline"
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </Button>
        <Button
          alignSelf="flex-end"
          colorScheme="blue"
          size="sm"
          type="submit"
        >
          Submit
        </Button>
      </Flex>
    </Flex>
  );
}

export default CommentEditor;
