import {
  Box,
  Flex,
  Text,
  Tooltip,
  Link,
  Icon,
  Divider,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { IAuthContext } from "../../types/auth";
import SidebarMenu from "../SidebarMenu";

function Sidebar() {
  const { user } = useAuth() as IAuthContext;

  return (
    <Flex
      direction="column"
      w={{ base: "52px", lg: "200px" }}
      backgroundColor="gray.900"
      height="100vh"
      alignItems={{ base: "center", lg: "inherit" }}
      position="sticky"
      top="0"
    >
      <Tooltip label="Homepage" display={{ base: "initial", lg: "none" }}>
        <Link as={NavLink} to="/" _activeLink={{ fontWeight: "900" }}>
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
                fill="white"
                d="M12 22q-.825 0-1.413-.588T10 20h4q0 .825-.588 1.413T12 22Zm-4-3v-2h8v2H8Zm.25-3q-1.725-1.025-2.738-2.75T4.5 9.5q0-3.125 2.188-5.313T12 2q3.125 0 5.313 2.188T19.5 9.5q0 2.025-1.012 3.75T15.75 16h-7.5Z"
              />
            </Icon>
            <Text color="white" display={{ base: "none", lg: "inline" }}>
              LearnShare
            </Text>
          </Box>
        </Link>
      </Tooltip>
      <Divider />
      <Tooltip label="Create Post" display={{ base: "initial", lg: "none" }}>
        <Link as={NavLink} to="/create" _activeLink={{ fontWeight: "900" }}>
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
            <Text color="white" display={{ base: "none", lg: "inline" }}>
              Create Article
            </Text>
          </Box>
        </Link>
      </Tooltip>
      <Divider position="absolute" bottom={14} />
      <Box position="absolute" bottom={0} width="100%">
        {user ? (
          <SidebarMenu user={user} />
        ) : (
          <Tooltip label="Sign in" display={{ base: "initial", lg: "none" }}>
            <Link as={NavLink} to="/signIn" _activeLink={{ fontWeight: "900" }}>
              <Box
                paddingY={2}
                paddingX={{ base: 0, sm: 2 }}
                _hover={{ backgroundColor: "gray.700" }}
                display="flex"
                alignItems="center"
                gap={2}
              >
                <Icon
                  viewBox="0 0 24 24"
                  boxSize={10}
                  color="white"
                  margin={{ base: "0 auto", sm: "initial" }}
                >
                  <path
                    fill="currentColor"
                    d="M12 21v-2h7V5h-7V3h7q.825 0 1.413.588T21 5v14q0 .825-.588 1.413T19 21h-7Zm-2-4l-1.375-1.45l2.55-2.55H3v-2h8.175l-2.55-2.55L10 7l5 5l-5 5Z"
                  />
                </Icon>
                <Text color="white" display={{ base: "none", lg: "inline" }}>
                  Sign In
                </Text>
              </Box>
            </Link>
          </Tooltip>
        )}
      </Box>
    </Flex>
  );
}

export default Sidebar;
