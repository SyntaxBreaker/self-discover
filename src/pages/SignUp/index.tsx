import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { supabase } from "../../utils/supabase";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { AuthError } from "@supabase/supabase-js";
import ResponsiveContainer from "../../components/ResponsiveContainer";

function SignUp() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [error, setError] = useState<AuthError | null>(null);

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const { error } = await supabase.auth.signUp({
      email: loginData.email,
      password: loginData.password,
      options: {
        data: {
          username: loginData.username ?? loginData.email.split("@")[0],
        },
      },
    });

    if (!error) {
      navigate("/signIn");
    } else {
      setError(error);
    }
  };

  return (
    <ResponsiveContainer>
      <Heading as="h1" size="lg" textAlign="center" color="gray.700">
        Sign up
      </Heading>
      <Box
        as="form"
        onSubmit={handleSubmit}
        marginTop={8}
        bgColor="white"
        padding={8}
        borderRadius={8}
      >
        <FormControl isInvalid={Boolean(error)}>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            value={loginData.email}
            name="email"
            onChange={handleChange}
          />
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        </FormControl>
        <FormControl marginTop={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={loginData.password}
            name="password"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl marginTop={4}>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            value={loginData.username}
            name="username"
            onChange={handleChange}
            maxLength={14}
          />
        </FormControl>
        <Button
          marginTop={4}
          width="100%"
          type="submit"
          fontSize="sm"
          colorScheme="blue"
        >
          Sign up
        </Button>
        <Text marginTop={4} fontSize="sm" align="right">
          Already have an account?{" "}
          <ChakraLink
            as={ReactRouterLink}
            to="/signIn"
            textDecoration="underline"
            color="blue"
          >
            Sign In
          </ChakraLink>
        </Text>
      </Box>
    </ResponsiveContainer>
  );
}

export default SignUp;
