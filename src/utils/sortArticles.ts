import IArticle from "../types/article";

function sortArticles(articleList: IArticle[] | null, sortBy: string) {
  return articleList
    ? [...articleList].sort((a, b) => {
        if (sortBy === "latest") {
          const dateA = new Date(a.created_at).getTime();
          const dateB = new Date(b.created_at).getTime();

          return dateB - dateA;
        } else {
          return (
            (b.likes ? b.likes.length : 0) - (a.likes ? a.likes.length : 0)
          );
        }
      })
    : articleList;
}

export default sortArticles;
