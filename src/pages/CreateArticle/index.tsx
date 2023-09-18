import { Heading, AlertIcon, Alert } from "@chakra-ui/react";
import { useState } from "react";
import { supabase } from "../../utils/supabase";
import { useAuth } from "../../context/AuthProvider";
import { IAuthContext } from "../../types/auth";
import { PostgrestError } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import ArticleForm from "../../components/ArticleForm";
import IFormData from "../../types/formData";
import generateRandomImage from "../../utils/generateRandomImage";
import ResponsiveContainer from "../../components/ResponsiveContainer";

function CreateArticle() {
  const [error, setError] = useState<PostgrestError | null>(null);

  const { user } = useAuth() as IAuthContext;
  const navigate = useNavigate();

  const handleSubmit = async (
    formData: IFormData,
    event: React.SyntheticEvent
  ) => {
    event.preventDefault();

    const image = await generateRandomImage();

    const { error } = await supabase.from("articles").insert({
      title: formData.title,
      content: formData.content,
      tags: formData.tags.length > 0 ? formData.tags.toLocaleLowerCase().split(',').sort() : [],
      author_id: user.id,
      nickname: user.user_metadata.username ?? user.email?.split("@")[0],
      image: image.download_url,
    });

    if (error) {
      setError(error);
    } else {
      navigate("/");
    }
  };

  return (
    <ResponsiveContainer>
      <Heading textAlign="center">Create a new article</Heading>
      {error && (
        <Alert status="error" padding={4} borderTopRadius={8} marginTop={8}>
          <AlertIcon />
          {error.message}
        </Alert>
      )}
      <ArticleForm error={error} handleSubmit={handleSubmit} />
    </ResponsiveContainer>
  );
}

export default CreateArticle;
