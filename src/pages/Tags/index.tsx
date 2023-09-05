import { Alert, AlertIcon, Heading, Stack, Tag } from "@chakra-ui/react";
import ResponsiveContainer from "../../components/ResponsiveContainer";
import { Link, useLoaderData } from "react-router-dom";
import { PostgrestError } from "@supabase/supabase-js";

function Tags() {
  const { tagList, error } = useLoaderData() as {
    tagList: string[];
    error: PostgrestError | null;
  };

  return (
    <ResponsiveContainer>
      {error ? (
        <Alert status="error" padding={4} marginBottom={2} borderRadius={8}>
          <AlertIcon />
          {error && error.message}
        </Alert>
      ) : (
        <>
          <Heading size="lg">Tag list</Heading>
          <Stack marginTop={4} direction="row" flexWrap="wrap">
            {tagList.map((tag) => (
              <Link to={`/tag/${tag}`} key={tag}>
                <Tag
                  colorScheme="blue"
                  _hover={{ bg: "#2B6CB0", color: "white" }}
                  size="lg"
                >
                  {tag}
                </Tag>
              </Link>
            ))}
          </Stack>
        </>
      )}
    </ResponsiveContainer>
  );
}

export default Tags;
