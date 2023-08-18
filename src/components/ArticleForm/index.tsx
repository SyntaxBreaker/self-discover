import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { PostgrestError } from "@supabase/supabase-js";
import IFormData from "../../types/formData";
import { useState } from "react";
import IArticle from "../../types/article";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function ArticleForm({
  error,
  handleSubmit,
  article,
}: {
  error: PostgrestError | null;
  handleSubmit: (
    formData: IFormData,
    event: React.SyntheticEvent
  ) => Promise<void>;
  article?: IArticle;
}) {
  const [formData, setFormData] = useState({
    title: article?.title ?? "",
    content: article?.content ?? "",
    tags: (article?.tags.toString() as string) ?? [],
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const modules = {
    toolbar: [
      [{ header: [2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
    ],
  };

  return (
    <Box
      as="form"
      onSubmit={(e: React.SyntheticEvent) => handleSubmit(formData, e)}
      bgColor="white"
      padding={8}
      borderBottomRadius={8}
      borderRadius={error ? 0 : 8}
      marginTop={error ? 0 : 8}
    >
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input
          type="text"
          value={formData.title}
          name="title"
          onChange={handleChange}
          required
        />
      </FormControl>
      <FormControl marginTop={4}>
        <FormLabel>Content</FormLabel>
        <ReactQuill
          theme="snow"
          value={formData.content}
          onChange={(newContent) =>
            setFormData((prev) => ({ ...prev, content: newContent }))
          }
          style={{ height: "250px" }}
          modules={modules}
        />
      </FormControl>
      <FormControl marginTop={16}>
        <FormLabel>Tags</FormLabel>
        <Input
          type="text"
          value={formData.tags}
          name="tags"
          onChange={handleChange}
        />
        <FormHelperText>Tags must be separated using commas.</FormHelperText>
      </FormControl>
      <Button marginTop={8} width="100%" type="submit">
        Submit
      </Button>
    </Box>
  );
}

export default ArticleForm;
