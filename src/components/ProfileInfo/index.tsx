import { Flex, Stack, Text, Button, Icon, Link } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import InterestList from "../InterestList";
import { TablerWorld } from "../../components/Icons";
import { useAuth } from "../../context/AuthProvider";
import { IAuthContext } from "../../types/auth";

function ProfileInfo() {
  const { user } = useAuth() as IAuthContext;

  return (
    <Flex direction="column" gap={1} flexBasis="100%">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        flexWrap={{ base: "wrap", md: "nowrap" }}
      >
        <Text fontSize="2xl" color="gray.700">
          {user.user_metadata.username}
        </Text>
        <Button
          size="md"
          as={NavLink}
          to="/profile/edit"
          colorScheme="facebook"
        >
          Edit profile
        </Button>
      </Stack>
      {user.user_metadata.website && (
        <Stack direction="row" alignItems="center">
          <Icon as={TablerWorld} />
          <Link href={user.user_metadata.website} isExternal={true}>
            {user.user_metadata.website.split(/https?:\/\//)[1]}
          </Link>
        </Stack>
      )}
      {user.user_metadata.interests &&
        user.user_metadata.interests.length > 0 && (
          <InterestList interests={user.user_metadata.interests} />
        )}
    </Flex>
  );
}

export default ProfileInfo;
