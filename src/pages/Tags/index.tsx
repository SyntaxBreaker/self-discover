import { useEffect, useState } from "react";
import { Heading, Stack } from "@chakra-ui/react";
import ResponsiveContainer from "../../components/ResponsiveContainer";
import { useLoaderData } from "react-router-dom";
import { PostgrestError } from "@supabase/supabase-js";
import DataFilter from "../../components/DataFilter";
import TagList from "../../components/TagList";
import Error from "../../components/Error";

function Tags() {
  const { tags, error } = useLoaderData() as {
    tags: string[];
    error: PostgrestError | null;
  };

  const [filterKeyword, setFilterKeyword] = useState("");
  const [filteredTags, setFilteredTags] = useState<string[]>([]);

  useEffect(() => {
    if (filterKeyword.length === 0) {
      setFilteredTags([]);
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
        <Error errorMessage={error.message} />
      ) : (
        <Stack direction="column" alignItems="center" gap={4}>
          <Heading as="h1" size="lg" flexBasis="100%" color="gray.700">
            Tag list
          </Heading>
          <DataFilter
            filterKeyword={filterKeyword}
            setFilterKeyword={setFilterKeyword}
          />
          <TagList
            tags={filterKeyword.length > 0 ? filteredTags : tags}
            size="md"
          />
        </Stack>
      )}
    </ResponsiveContainer>
  );
}

export default Tags;
