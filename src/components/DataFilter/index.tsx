import { FormControl, Input } from "@chakra-ui/react";

interface DataFilterProps {
  filterKeyword: string;
  setFilterKeyword: React.Dispatch<React.SetStateAction<string>>;
}

function DataFilter({ filterKeyword, setFilterKeyword }: DataFilterProps) {
  return (
    <FormControl>
      <Input
        type="text"
        name="search"
        value={filterKeyword}
        onChange={(e) => setFilterKeyword(e.target.value)}
        placeholder="Search..."
        background="white"
      />
    </FormControl>
  );
}

export default DataFilter;
