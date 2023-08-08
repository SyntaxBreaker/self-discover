import { supabase } from "./supabase";

const getArticleById = async (id: string | undefined) => {
  const { data, error } = await supabase.from("articles").select().eq("id", id);

  return {
    article: data && data[0],
    error: error,
  };
};

export { getArticleById };
