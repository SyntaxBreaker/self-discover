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
import {
  JamMessagesF,
  MaterialSymbolsAdd,
  MaterialSymbolsLightbulb,
  MdiFrequentlyAskedQuestions,
  TeenyiconsHashtagOutline,
} from "../Icons";

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
            <Icon as={MaterialSymbolsLightbulb} />
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
            <Icon as={MaterialSymbolsAdd} />
            <Text color="white" display={{ base: "none", lg: "inline" }}>
              Create Article
            </Text>
          </Box>
        </Link>
      </Tooltip>
      <Tooltip label="Tags" display={{ base: "initial", lg: "none" }}>
        <Link as={NavLink} to="/tags" _activeLink={{ fontWeight: "900" }}>
          <Box
            paddingY={2}
            paddingX={{ base: 0, sm: 2 }}
            _hover={{ backgroundColor: "gray.700" }}
            display="flex"
            alignItems="center"
            gap={2}
          >
            <Icon as={TeenyiconsHashtagOutline} />
            <Text color="white" display={{ base: "none", lg: "inline" }}>
              Tag List
            </Text>
          </Box>
        </Link>
      </Tooltip>
      <Tooltip label="Chat" display={{ base: "initial", lg: "none" }}>
        <Link as={NavLink} to="/chat" _activeLink={{ fontWeight: "900" }}>
          <Box
            paddingY={2}
            paddingX={{ base: 0, sm: 2 }}
            _hover={{ backgroundColor: "gray.700" }}
            display="flex"
            alignItems="center"
            gap={2}
          >
            <Icon as={JamMessagesF} />
            <Text color="white" display={{ base: "none", lg: "inline" }}>
              Chat
            </Text>
          </Box>
        </Link>
      </Tooltip>
      <Tooltip label="FAQ" display={{ base: "initial", lg: "none" }}>
        <Link as={NavLink} to="/faq" _activeLink={{ fontWeight: "900" }}>
          <Box
            paddingY={2}
            paddingX={{ base: 0, sm: 2 }}
            _hover={{ backgroundColor: "gray.700" }}
            display="flex"
            alignItems="center"
            gap={2}
          >
            <Icon as={MdiFrequentlyAskedQuestions} />
            <Text color="white" display={{ base: "none", lg: "inline" }}>
              FAQ
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
