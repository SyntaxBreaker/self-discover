import {
  Box,
  Flex,
  Text,
  Tooltip,
  Link,
  Icon,
  Divider,
} from "@chakra-ui/react";

function Header() {
  return (
    <Flex
      direction="column"
      maxW={["52px", "200px"]}
      backgroundColor="gray.900"
      minHeight="100vh"
      alignItems={{ base: "center", sm: "inherit" }}
      position="relative"
    >
      <Tooltip label="Homepage" display={{ base: "initial", sm: "none" }}>
        <Link href="/">
          <Box
            paddingY={2}
            paddingX={{ base: 0, sm: 2 }}
            _hover={{ backgroundColor: "gray.700" }}
            display="flex"
            alignItems="center"
            gap={2}
          >
            <Icon viewBox="0 0 24 24" boxSize={10} color="white">
              <path
                fill="currentColor"
                d="M12 3c2.21 0 4 1.79 4 4s-1.79 4-4 4s-4-1.79-4-4s1.79-4 4-4m4 10.54c0 1.06-.28 3.53-2.19 6.29L13 15l.94-1.88c-.62-.07-1.27-.12-1.94-.12s-1.32.05-1.94.12L11 15l-.81 4.83C8.28 17.07 8 14.6 8 13.54c-2.39.7-4 1.96-4 3.46v4h16v-4c0-1.5-1.6-2.76-4-3.46Z"
              ></path>
            </Icon>
            <Text color="white" display={{ base: "none", sm: "inline" }}>
              LearnShare
            </Text>
          </Box>
        </Link>
      </Tooltip>
      <Divider />
      <Tooltip label="Create Post" display={{ base: "initial", sm: "none" }}>
        <Link href="/create">
          <Box
            paddingY={2}
            paddingX={{ base: 0, sm: 2 }}
            _hover={{ backgroundColor: "gray.700" }}
            display="flex"
            alignItems="center"
            gap={2}
          >
            <Icon viewBox="0 0 24 24" boxSize={10} color="white">
              <path
                fill="currentColor"
                d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
              />
            </Icon>
            <Text color="white" display={{ base: "none", sm: "inline" }}>
              Create Post
            </Text>
          </Box>
        </Link>
      </Tooltip>
      <Divider position="absolute" bottom={14} />
      <Tooltip label="Your profile" display={{ base: "initial", sm: "none" }}>
        <Link href="/profile" position="absolute" bottom={0} width='100%'>
          <Box
            paddingY={2}
            paddingX={{ base: 0, sm: 2 }}
            _hover={{ backgroundColor: "gray.700" }}
            display="flex"
            alignItems="center"
            gap={2}
          >
            <Icon viewBox="0 0 24 24" boxSize={10} color="white" margin={{base: '0 auto', sm: 'initial'}}>
              <path
                fill="currentColor"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88a9.947 9.947 0 0 1 12.28 0C16.43 19.18 14.03 20 12 20z"
              />
            </Icon>
            <Text color="white" display={{ base: "none", sm: "inline" }}>
              Nickname
            </Text>
          </Box>
        </Link>
      </Tooltip>
    </Flex>
  );
}

export default Header;
