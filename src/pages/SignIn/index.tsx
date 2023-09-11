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
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { useAuth } from "../../context/AuthProvider";
import { IAuthContext } from "../../types/auth";
import { AuthError } from "@supabase/supabase-js";
import ResponsiveContainer from "../../components/ResponsiveContainer";

function SignIn() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<AuthError | null>(null);

  const navigate = useNavigate();
  const { user } = useAuth() as IAuthContext;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email: loginData.email,
      password: loginData.password,
    });

    setError(error);
  };

  const resendEmail = async () => {
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: loginData.email,
    });

    setError(error);
  };

  useEffect(() => {
    if (user?.email) {
      navigate("/");
    }
  }, [user]);

  return (
    <ResponsiveContainer>
      <Heading textAlign="center">Sign in</Heading>
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
          {error?.message === "Email not confirmed" ? (
            <FormErrorMessage>
              Email not confirmed.{" "}
              <Button
                color="#3182CE"
                variant="link"
                marginLeft={1}
                size="sm"
                onClick={resendEmail}
              >
                Resend verification email
              </Button>
            </FormErrorMessage>
          ) : (
            <FormErrorMessage>{error?.message}</FormErrorMessage>
          )}
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
        <Button marginTop={4} width="100%" type="submit">
          Sign in
        </Button>
        <Text marginTop={4} align="center">
          New to LearnShare?{" "}
          <ChakraLink
            as={ReactRouterLink}
            to="/signUp"
            textDecoration="underline"
            color="blue"
          >
            Sign Up
          </ChakraLink>
        </Text>
      </Box>
    </ResponsiveContainer>
  );
}

export default SignIn;
