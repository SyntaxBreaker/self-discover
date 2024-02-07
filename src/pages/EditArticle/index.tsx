import { useEffect, useState } from "react";
import { Alert, AlertIcon, Heading } from "@chakra-ui/react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import IArticle from "../../types/article";
import { useAuth } from "../../context/AuthProvider";
import { IAuthContext } from "../../types/auth";
import ArticleForm from "../../components/ArticleForm";
import IFormData from "../../types/formData";
import { supabase } from "../../utils/supabase";
import ResponsiveContainer from "../../components/ResponsiveContainer";
import {
  ARTICLE_CONTENT_REQUIRED,
  ARTICLE_TITLE_REQUIRED,
} from "../../utils/constants";

function EditArticle() {
  const [error, setError] = useState<string | null>(null);

  const { article, error: loadingError } = useLoaderData() as {
    article: IArticle;
    error: string;
  };
  const { user } = useAuth() as IAuthContext;
  const navigate = useNavigate();
  const { Id } = useParams();

  useEffect(() => {
    if (!article || user.id !== article.author_id) {
      navigate("/");
    }
  }, []);

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

      const { error } = await supabase
        .from("articles")
        .update({
          title: formData.title,
          content: formData.content,
          tags:
            `{${formData.tags.toLocaleLowerCase().split(",").sort()}}` || null,
          author_id: user.id,
          nickname: user.user_metadata.username ?? user.email?.split("@")[0],
        })
        .eq("id", Id);

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
        Edit the article
      </Heading>
      {error &&
        error !== ARTICLE_CONTENT_REQUIRED &&
        error !== ARTICLE_TITLE_REQUIRED && (
          <Alert status="error">
            <AlertIcon /> {error}
          </Alert>
        )}
      {loadingError && (
        <Alert status="error">
          <AlertIcon /> {loadingError}
        </Alert>
      )}
      <ArticleForm
        error={error}
        handleSubmit={handleSubmit}
        article={article}
      />
    </ResponsiveContainer>
  );
}

export default EditArticle;
