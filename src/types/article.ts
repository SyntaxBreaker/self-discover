export default interface IArticle {
  id: number;
  authorId: string;
  title: string;
  content: string;
  tags: string[] | [];
  created_at: string;
}
