import { Image } from "@chakra-ui/react";
import { User } from "@supabase/supabase-js";

interface ProfileAvatarProps {
  user: User;
}

function ProfileAvatar({ user }: ProfileAvatarProps) {
  return (
    <Image
      boxSize="150px"
      objectFit="cover"
      src={
        user.user_metadata.avatar_url
          ? user.user_metadata.avatar_url
          : "https://bit.ly/dan-abramov"
      }
      alt="Your profile picture"
      borderRadius="full"
    />
  );
}

export default ProfileAvatar;
