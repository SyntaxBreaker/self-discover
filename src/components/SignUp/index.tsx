import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { supabase } from "../../utils/supabase";

function SignUp() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

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
          <FormHelperText>We'll never share you email.</FormHelperText>
        </FormControl>
        <FormControl marginTop={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={loginData.password}
            name="password"
            onChange={handleChange}
          />
          <FormHelperText>We'll never share your password</FormHelperText>
        </FormControl>
        <Button marginTop={4} width="100%" type="submit">
          Sign up
        </Button>
      </Box>
    </Container>
  );
}

export default SignUp;
