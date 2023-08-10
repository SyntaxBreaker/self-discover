import { Badge, Stack } from "@chakra-ui/react";

function InterestList({ interests }: { interests: string[] }) {
  return (
    <Stack direction="row" marginTop={4} flexWrap="wrap">
      {interests.map((interest: string) => (
        <Badge colorScheme="green" padding={1} key={interest} variant="solid">
          {interest}
        </Badge>
      ))}
    </Stack>
  );
}

export default InterestList;
