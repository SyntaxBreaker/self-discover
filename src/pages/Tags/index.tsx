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
        <Error errorMessage={error.message} />
      ) : (
        <>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            marginBottom={8}
          >
            <Heading as="h1" size="lg" flexBasis="100%">
              Tag list
            </Heading>
            <DataFilter
              filterKeyword={filterKeyword}
              setFilterKeyword={setFilterKeyword}
            />
          </Stack>
          <TagList
            tags={filteredTags && filteredTags.length > 0 ? filteredTags : tags}
            size="lg"
          />
        </>
      )}
    </ResponsiveContainer>
  );
}

export default Tags;
