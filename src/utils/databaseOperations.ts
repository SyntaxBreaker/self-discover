import { supabase } from "./supabase";

const getArticleById = async (id: string | undefined) => {
  const { data, error } = await supabase
    .from("articles")
    .select(`*, comments(*)`)
    .eq("id", id);

  return {
    article: data && data[0],
    error: error,
  };
};

const getArticlesByAuthorId = async (authorId: string) => {
  const { error, data } = await supabase
    .from("articles")
    .select()
    .eq("author_id", authorId);

  return {
    articles: data && data,
    error: error,
  };
};

const getEventById = async (id: string | undefined) => {
  const { data, error } = await supabase.from("events").select().eq("id", id);

  return {
    event: data && data[0],
    error: error,
  };
};

export { getArticleById, getArticlesByAuthorId, getEventById };
