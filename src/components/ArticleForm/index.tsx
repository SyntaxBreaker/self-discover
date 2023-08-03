import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { PostgrestError } from "@supabase/supabase-js";
import IFormData from "../../types/formData";
import { useState } from "react";

function ArticleForm({
  error,
  handleSubmit,
}: {
  error: PostgrestError | null;
  handleSubmit: (
    formData: IFormData,
    event: React.SyntheticEvent
  ) => Promise<void>;
}) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
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
        <Textarea
          value={formData.content}
          name="content"
          onChange={handleChange}
          required
        />
      </FormControl>
      <FormControl marginTop={4}>
        <FormLabel>Tags</FormLabel>
        <Input
          type="text"
          value={formData.tags}
          name="tags"
          onChange={handleChange}
        />
        <FormHelperText>Tags must be separated using commas.</FormHelperText>
      </FormControl>
      <Button marginTop={4} width="100%" type="submit">
        Submit
      </Button>
    </Box>
  );
}

export default ArticleForm;
