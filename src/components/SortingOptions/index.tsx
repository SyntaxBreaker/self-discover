import { Badge, Flex } from "@chakra-ui/react";

interface SortingOptionsProps {
  currentSorting: string;
  setCurrentSorting: React.Dispatch<React.SetStateAction<string>>;
}

function SortingOptions({
  currentSorting,
  setCurrentSorting,
}: SortingOptionsProps) {
  return (
    <Flex gap={2}>
      <Badge
        _hover={{ cursor: "pointer" }}
        px="4"
        py="2"
        colorScheme={currentSorting === "latest" ? "blue" : "white"}
        onClick={() => setCurrentSorting("latest")}
        borderRadius={8}
      >
        Latest
      </Badge>
      <Badge
        _hover={{ cursor: "pointer" }}
        px="4"
        py="2"
        colorScheme={currentSorting === "top" ? "blue" : "white"}
        onClick={() => setCurrentSorting("top")}
        borderRadius={8}
      >
        Top
      </Badge>
    </Flex>
  );
}

export default SortingOptions;
