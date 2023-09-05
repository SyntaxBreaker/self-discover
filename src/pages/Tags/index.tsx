import { useEffect, useState } from "react";
import { Alert, AlertIcon, Heading, Stack } from "@chakra-ui/react";
import ResponsiveContainer from "../../components/ResponsiveContainer";
import { useLoaderData } from "react-router-dom";
import { PostgrestError } from "@supabase/supabase-js";
import DataFilter from "../../components/DataFilter";
import TagList from "../../components/TagList";

function Tags() {
  const { tags, error } = useLoaderData() as {
    tags: string[];
    error: PostgrestError | null;
  };

  const [filterKeyword, setFilterKeyword] = useState("");
  const [filteredTags, setFilteredTags] = useState<string[] | null>(null);

  useEffect(() => {
    if (filterKeyword.length === 0) {
      setFilteredTags(null);
    } else {
      const filteredData = tags.filter((tag) =>
        tag.toLocaleLowerCase().includes(filterKeyword)
      );
      setFilteredTags(filteredData);
    }
  }, [filterKeyword]);

  return (
    <ResponsiveContainer>
      {error ? (
        <Alert status="error" padding={4} marginBottom={2} borderRadius={8}>
          <AlertIcon />
          {error && error.message}
        </Alert>
      ) : (
        <>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Heading size="lg" flexBasis="100%" marginBottom={8}>
              Tag list
            </Heading>
            <DataFilter
              filterKeyword={filterKeyword}
              setFilterKeyword={setFilterKeyword}
            />
          </Stack>
          <TagList
            tags={filteredTags && filteredTags.length > 0 ? filteredTags : tags}
          />
        </>
      )}
    </ResponsiveContainer>
  );
}

export default Tags;
