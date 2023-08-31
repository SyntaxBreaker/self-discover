import IComment from "./comment";

export default interface IArticle {
  id: number;
  author_id: string;
  title: string;
  content: string;
  tags: string[] | [];
  created_at: string;
  nickname: string;
  likes: string[] | [];
  comments: IComment[] | [];
  image: string;
}
