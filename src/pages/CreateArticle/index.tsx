import {
  Box,
  Button,
  Container,
  FormControl,
  Text,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { supabase } from "../../utils/supabase";
import { useAuth } from "../../context/AuthProvider";
import { IAuthContext } from "../../types/auth";
import { PostgrestError } from "@supabase/supabase-js";

function CreateArticle() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
  });
  const [error, setError] = useState<PostgrestError | null>(null);

  const { user } = useAuth() as IAuthContext;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const { error } = await supabase.from("articles").insert({
      title: formData.title,
      content: formData.content,
      tags: `{${formData.tags.split(",")}}` || null,
      authorId: user.id,
    });

    setError(error);
  };

  return (
    <Container maxW={{ base: "100%", md: "50%" }} py={8}>
      <Heading textAlign="center">Create a new article</Heading>
      {error && (
          <Box bgColor="#C53030" padding={4} borderTopRadius={8} marginTop={8}>
            <Text color="white">{error.message}</Text>
          </Box>
        )}
      <Box
        as="form"
        onSubmit={handleSubmit}
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
    </Container>
  );
}

export default CreateArticle;
