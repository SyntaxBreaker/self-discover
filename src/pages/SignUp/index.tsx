import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { supabase } from "../../utils/supabase";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

function SignUp() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email: loginData.email,
      password: loginData.password,
    });

    console.log(data);
    console.log(error);

    if(!error) {
      navigate("/signIn");
    }
  };

  return (
    <Container maxW="50%" py={8}>
      <Heading textAlign="center">Sign up</Heading>
      <Box
        as="form"
        onSubmit={handleSubmit}
        marginTop={8}
        bgColor="white"
        padding={8}
        borderRadius={8}
      >
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            value={loginData.email}
            name="email"
            onChange={handleChange}
          />
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
          Sign up
        </Button>
        <Text marginTop={4} align="center">
          Already have an account?{" "}
          <ChakraLink
            as={ReactRouterLink}
            to="/signIn"
            textDecoration="underline"
            color="#3182CE"
          >
            Sign In
          </ChakraLink>
        </Text>
      </Box>
    </Container>
  );
}

export default SignUp;
