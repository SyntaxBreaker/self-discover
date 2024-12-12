import {
  Avatar,
  Stack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Portal,
  FormControl,
  Input,
  Flex,
  Button,
} from "@chakra-ui/react";
import IChat from "../../types/chat";
import { useAuth } from "../../context/AuthProvider";
import { IAuthContext } from "../../types/auth";
import { supabase } from "../../utils/supabase";
import { useEffect, useState } from "react";

function MessageContainer({ chat }: { chat: IChat }) {
  const { user } = useAuth() as IAuthContext;

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState<null | string>(null);

  const removeChatMessage = async (id: number) => {
    await supabase.from("chats").delete().eq("id", id);
  };
  const editChatMessage = async (e: React.SyntheticEvent, id: number) => {
    e.preventDefault();

    const { error } = await supabase
      .from("chats")
      .update({ message: message })
      .eq("id", id);

    if (!error) {
      setIsEditing(false);
    }
  };

  useEffect(() => {
    setMessage(chat.message);
  }, []);

  return (
    <Stack
      key={chat.id}
      direction={user?.id === chat.user_id ? "row-reverse" : "row"}
    >
      <Avatar src={chat.avatar_url} name={chat.username} />
      <Stack
        direction="column"
        maxWidth="75%"
        padding={4}
        backgroundColor={user?.id === chat.user_id ? "blue.50" : "gray.100"}
        borderRadius={4}
      >
        <Stack
          direction="row"
          fontSize="xs"
          alignItems="center"
          justifyContent="space-between"
          gap={4}
        >
          <Text>{chat.username}</Text>
          {user?.id === chat.user_id && (
            <Menu>
              <MenuButton>&#8942;</MenuButton>
              <Portal>
                <MenuList>
                  <MenuItem onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? "Discard changes" : "Edit"}
                  </MenuItem>
                  <MenuItem onClick={() => removeChatMessage(chat.id)}>
                    Delete
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          )}
        </Stack>
        {isEditing ? (
          <Flex
            as="form"
            direction="column"
            gap={2}
            onSubmit={(e) => editChatMessage(e, chat.id)}
          >
            <FormControl>
              <Input
                type="text"
                value={message ?? ""}
                onChange={(e) => setMessage(e.target.value)}
                backgroundColor="white"
              />
            </FormControl>
            <Stack direction="row">
              <Button
                variant="outline"
                flexBasis="50%"
                colorScheme="blue"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button type="submit" colorScheme="blue" flexBasis="50%">
                Edit
              </Button>
            </Stack>
          </Flex>
        ) : (
          <Text>{chat.message}</Text>
        )}
      </Stack>
    </Stack>
  );
}

export default MessageContainer;
