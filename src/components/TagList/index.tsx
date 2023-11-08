import { Stack, Tag } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface IProps {
  tags: string[];
  size?: "sm" | "md" | "lg";
}

function TagList({ tags, size = "md" }: IProps) {
  const navigate = useNavigate();

  return (
    <Stack direction="row" flexWrap="wrap">
      {[...tags]
        .sort((a, b) => a.localeCompare(b))
        .map((tag) => (
          <Tag
            key={tag}
            colorScheme="blue"
            _hover={{ bg: "#2B6CB0", color: "white" }}
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
    </Stack>
  );
}

export default TagList;
