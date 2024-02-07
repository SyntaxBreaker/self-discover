import { Heading, AlertIcon, Alert } from "@chakra-ui/react";
import { useState } from "react";
import { supabase } from "../../utils/supabase";
import { useAuth } from "../../context/AuthProvider";
import { IAuthContext } from "../../types/auth";
import { useNavigate } from "react-router-dom";
import ArticleForm from "../../components/ArticleForm";
import IFormData from "../../types/formData";
import generateRandomImage from "../../utils/generateRandomImage";
import ResponsiveContainer from "../../components/ResponsiveContainer";
import {
  ARTICLE_CONTENT_REQUIRED,
  ARTICLE_TITLE_REQUIRED,
} from "../../utils/constants";

function CreateArticle() {
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth() as IAuthContext;
  const navigate = useNavigate();

  const handleSubmit = async (
    formData: IFormData,
    event: React.SyntheticEvent
  ) => {
    try {
      event.preventDefault();

      if (formData.title.trim().length === 0) {
        throw new Error(ARTICLE_TITLE_REQUIRED);
      } else if (
        formData.content.match(/(<p><br><\/p>)+/g) ||
        formData.content.match(/<p>\s*<\/p>/)
      ) {
        throw new Error(ARTICLE_CONTENT_REQUIRED);
      }

      const imageURL = await generateRandomImage();

      const { error } = await supabase.from("articles").insert({
        title: formData.title,
        content: formData.content,
        tags:
          formData.tags.length > 0
            ? formData.tags.toLocaleLowerCase().split(",").sort()
            : [],
        author_id: user.id,
        nickname: user.user_metadata.username ?? user.email?.split("@")[0],
        image: imageURL,
      });

      if (error) {
        throw new Error(error.message);
      } else {
        navigate("/");
      }
    } catch (err) {
      if (typeof err === "string") {
        setError(err);
      } else if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  return (
    <ResponsiveContainer>
      <Heading as="h1" size="lg" textAlign="center" color="gray.700">
        Create a new article
      </Heading>
      {error &&
        error !== ARTICLE_CONTENT_REQUIRED &&
        error !== ARTICLE_TITLE_REQUIRED && (
          <Alert status="error" padding={4} borderTopRadius={8} marginTop={8}>
            <AlertIcon />
            {error}
          </Alert>
        )}
      <ArticleForm error={error} handleSubmit={handleSubmit} />
    </ResponsiveContainer>
  );
}

export default CreateArticle;
