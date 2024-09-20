import { Heading } from "@chakra-ui/react";
import ResponsiveContainer from "../../components/ResponsiveContainer";
import ProfileForm from "../../components/ProfileForm";

function EditProfile() {
  return (
    <ResponsiveContainer>
      <Heading as="h1" size="lg" textAlign="center" color="gray.700">
        Edit profile
      </Heading>
      <ProfileForm />
    </ResponsiveContainer>
  );
}

export default EditProfile;
