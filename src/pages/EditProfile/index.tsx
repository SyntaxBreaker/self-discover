import {
  Alert,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { AuthError, User } from "@supabase/supabase-js";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabase";
import ResponsiveContainer from "../../components/ResponsiveContainer";

interface IAlertData {
  status: "success" | "error" | null;
  message: string | null;
}

function EditProfile() {
  const { user, error } = useLoaderData() as {
    user: User | null;
    error: AuthError | null;
  };
  const navigate = useNavigate();

  const [userInformation, setUserInformation] = useState({
    username: user?.user_metadata.username ?? "",
    avatar_url: user?.user_metadata.avatar_url ?? "",
    website: user?.user_metadata.website ?? "",
    interests: user?.user_metadata.interests ?? [],
  });
  const [alertData, setAlertData] = useState<IAlertData>({
    status: error ? "error" : null,
    message: error?.message ?? null,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInformation((prev) => ({
      ...prev,
      [event.target.name]:
        event.target.name === "interests"
          ? event.target.value.trim().split(",")
          : event.target.value,
    }));
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const { error } = await supabase.auth.updateUser({
      data: userInformation,
    });

    if (error) {
      setAlertData({
        status: "error",
        message: error.message,
      });
    } else {
      setAlertData({
        status: "success",
        message: "Profile updated successfully",
      });

      setTimeout(() => navigate(0), 1000);
    }
  };

  return (
    <ResponsiveContainer>
      <Heading textAlign="center">Edit profile</Heading>
      <Flex
        as="form"
        onSubmit={handleSubmit}
        direction="column"
        gap={4}
        bgColor="white"
        padding={8}
        borderBottomRadius={8}
        borderRadius={error ? 0 : 8}
        marginTop={error ? 0 : 8}
      >
        {alertData.message && (
          <Alert status={alertData.status ? alertData.status : undefined}>
            {alertData.message}
          </Alert>
        )}
        <FormControl>
          <FormLabel>Username:</FormLabel>
          <Input
            type="text"
            value={userInformation.username}
            name="username"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Avatar URL:</FormLabel>
          <Input
            type="url"
            value={userInformation.avatar_url}
            name="avatar_url"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Website:</FormLabel>
          <Input
            type="url"
            value={userInformation.website}
            name="website"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Interests:</FormLabel>
          <Input
            type="text"
            value={userInformation.interests}
            name="interests"
            onChange={handleChange}
          />
          <FormHelperText>
            Interests must be separated using commas.
          </FormHelperText>
        </FormControl>
        <Button width="100%" type="submit">
          Submit
        </Button>
      </Flex>
    </ResponsiveContainer>
  );
}

export default EditProfile;
