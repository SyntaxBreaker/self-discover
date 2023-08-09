import { Container, Heading, AlertIcon, Alert } from "@chakra-ui/react";
import { useState } from "react";
import { supabase } from "../../utils/supabase";
import { useAuth } from "../../context/AuthProvider";
import { IAuthContext } from "../../types/auth";
import { PostgrestError } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import ArticleForm from "../../components/ArticleForm";
import IFormData from "../../types/formData";

function CreateArticle() {
  const [error, setError] = useState<PostgrestError | null>(null);

  const { user } = useAuth() as IAuthContext;
  const navigate = useNavigate();

  const handleSubmit = async (
    formData: IFormData,
    event: React.SyntheticEvent
  ) => {
    event.preventDefault();

    const { error } = await supabase.from("articles").insert({
      title: formData.title,
      content: formData.content,
      tags: `{${formData.tags.split(",")}}` || null,
      author_id: user.id,
    });

    if (error) {
      setError(error);
    } else {
      navigate("/");
    }
  };

  return (
    <Container maxW={{ base: "100%", md: "50%" }} py={8}>
      <Heading textAlign="center">Create a new article</Heading>
      {error && (
        <Alert status="error" padding={4} borderTopRadius={8} marginTop={8}>
          <AlertIcon />
          {error.message}
        </Alert>
      )}
      <ArticleForm error={error} handleSubmit={handleSubmit} />
    </Container>
  );
}

export default CreateArticle;
