import { supabase } from "../utils/supabase";

interface IProps {
  table: string;
  likes: string[] | [];
  setLikes: React.Dispatch<React.SetStateAction<string[] | []>>;
  id: number;
  userId: string;
  setStatus?: React.Dispatch<
    React.SetStateAction<{
      type: "success" | "error";
      message: string;
    } | null>
  >;
}

const toggleLike = async ({
  table,
  likes,
  setLikes,
  id,
  userId,
  setStatus,
}: IProps) => {
  let updatedLikes;
  if (likes.length === 0 || !likes.includes(userId as never)) {
    setLikes((prev) => [...prev, userId]);
    updatedLikes = [...likes, userId];
  } else {
    updatedLikes = likes.filter((like) => like !== userId);
  }

  const { error } = await supabase
    .from(table)
    .update({
      likes: updatedLikes,
    })
    .eq("id", id);

  if (error) {
    setStatus &&
      setStatus({
        type: "error",
        message: error.message,
      });
  } else {
    setLikes(updatedLikes);
  }
};

export default toggleLike;
