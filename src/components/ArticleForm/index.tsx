import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import IFormData from "../../types/formData";
import { useEffect, useState } from "react";
import IArticle from "../../types/article";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  addAccessibilityAttributes,
  quillToolbarConfig,
} from "../../utils/quill";
import {
  ARTICLE_CONTENT_REQUIRED,
  ARTICLE_TITLE_REQUIRED,
} from "../../utils/constants";

function ArticleForm({
  error,
  handleSubmit,
  article,
}: {
  error: string | null;
  handleSubmit: (
    formData: IFormData,
    event: React.SyntheticEvent
  ) => Promise<void>;
  article?: IArticle;
}) {
  const [formData, setFormData] = useState<IFormData>({
    title: "",
    content: "",
    tags: "",
  });

  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title,
        content: article.content,
        tags: article.tags.join(", "),
      });
    }

    addAccessibilityAttributes();
  }, []);

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
      borderRadius={
        error &&
        error !== ARTICLE_CONTENT_REQUIRED &&
        error !== ARTICLE_TITLE_REQUIRED
          ? 0
          : 8
      }
      marginTop={
        error &&
        error !== ARTICLE_CONTENT_REQUIRED &&
        error !== ARTICLE_TITLE_REQUIRED
          ? 0
          : 8
      }
      display="flex"
      flexDirection="column"
      gap={4}
      position="static"
    >
      <FormControl
        position="static"
        isInvalid={error === ARTICLE_TITLE_REQUIRED}
      >
        <FormLabel>Title</FormLabel>
        <Input
          type="text"
          value={formData.title}
          name="title"
          onChange={handleChange}
          required
          position="static"
        />
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
      <FormControl
        position="static"
        isInvalid={error === ARTICLE_CONTENT_REQUIRED}
      >
        <FormLabel>Content</FormLabel>
        <ReactQuill
          theme="snow"
          value={formData.content}
          onChange={(newContent) =>
            setFormData((prev) => ({ ...prev, content: newContent }))
          }
          modules={quillToolbarConfig}
          style={{
            border:
              error === ARTICLE_CONTENT_REQUIRED ? "2px solid #E53E3E" : "none",
          }}
        />
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
      <FormControl position="static">
        <FormLabel>Tags</FormLabel>
        <Textarea
          value={formData.tags}
          name="tags"
          onChange={handleChange}
          position="static"
        />
        <FormHelperText>
          Please ensure tags are separated by commas and avoid using spaces
          within tags.
        </FormHelperText>
      </FormControl>
      <Button
        width="100%"
        type="submit"
        position="static"
        colorScheme="facebook"
      >
        Submit
      </Button>
    </Box>
  );
}

export default ArticleForm;
