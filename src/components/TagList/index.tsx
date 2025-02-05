import { Stack, Tag } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import EmptyTagList from "../EmptyTagList";

interface TagListProps {
  tags: string[];
  size?: "sm" | "md" | "lg";
}

function TagList({ tags, size = "md" }: TagListProps) {
  const navigate = useNavigate();

  return (
    <Stack direction="row" flexWrap="wrap">
      {tags.length > 0 ? (
        <>
          {[...tags]
            .sort((a, b) => a.localeCompare(b))
            .map((tag) => (
              <Tag
                key={tag}
                colorScheme="blue"
                _hover={{ bg: "#2B6CB0", color: "white", cursor: "pointer" }}
                size={size}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/tag/${tag}`);
                }}
                role="link"
              >
                {tag}
              </Tag>
            ))}
        </>
      ) : (
        <EmptyTagList />
      )}
    </Stack>
  );
}

export default TagList;
