import { Container } from "@chakra-ui/react";

interface ResponsiveContainerProps {
  children: React.ReactNode;
}

function ResponsiveContainer({ children }: ResponsiveContainerProps) {
  return (
    <Container
      maxW={{ base: "calc(100% - 52px)", md: "75%", lg: "65%", "2xl": "55%" }}
      py={8}
    >
      {children}
    </Container>
  );
}

export default ResponsiveContainer;
