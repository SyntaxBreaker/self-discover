import { Badge, Flex } from "@chakra-ui/react";

function SortingOptions({ currentSorting, setCurrentSorting }: { currentSorting: string; setCurrentSorting: React.Dispatch<React.SetStateAction<string>> }) {
    return (
        <Flex gap={2}>
            <Badge _hover={{ cursor: "pointer" }} px="4" py="2" colorScheme={currentSorting === "latest" ? "facebook" : "white"} onClick={() => setCurrentSorting("latest")}>Latest</Badge>
            <Badge _hover={{ cursor: "pointer" }} px="4" py="2" colorScheme={currentSorting === "top" ? "facebook" : "white"} onClick={() => setCurrentSorting("top")}>Top</Badge>
        </Flex>
    )
}

export default SortingOptions;