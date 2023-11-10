import { Container } from "@chakra-ui/react";

function ResponsiveContainer({ children }: { children: React.ReactNode }) {
  return (
    <Container
      maxW={{ base: "100%", md: "75%", lg: "65%", "2xl": "55%" }}
      py={8}
    >
      {children}
    </Container>
  );
}

export default ResponsiveContainer;
