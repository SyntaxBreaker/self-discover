import { Stack, Tag } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface IProps {
  tags: string[];
  size?: "sm" | "md" | "lg";
}

function TagList({ tags, size = "md" }: IProps) {
  return (
    <Stack direction="row" flexWrap="wrap">
      {tags.map((tag) => (
        <Link to={`/tag/${tag}`} key={tag}>
          <Tag
            colorScheme="blue"
            _hover={{ bg: "#2B6CB0", color: "white" }}
            size={size}
          >
            {tag}
          </Tag>
        </Link>
      ))}
    </Stack>
  );
}

export default TagList;
