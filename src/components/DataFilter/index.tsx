import { FormControl, Input } from "@chakra-ui/react";

function DataFilter({
  filterKeyword,
  setFilterKeyword,
}: {
  filterKeyword: string;
  setFilterKeyword: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <FormControl marginBottom={8}>
      <Input
        type="text"
        name="search"
        value={filterKeyword}
        onChange={(e) => setFilterKeyword(e.target.value)}
        placeholder="Search..."
      />
    </FormControl>
  );
}

export default DataFilter;
