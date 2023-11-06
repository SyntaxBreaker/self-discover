import { Flex, Image, Text, Box, Button } from "@chakra-ui/react";
import postImage from "../../assets/images/post.svg";
import { useAuth } from "../../context/AuthProvider";
import { IAuthContext } from "../../types/auth";
import { Link } from "react-router-dom";

function EmptyArticleList() {
    const { user } = useAuth() as IAuthContext;

    return (
        <Flex alignSelf="center" flexDirection="column" gap={2}>
            <Image src={postImage} alt="" boxSize="sm" />
            <Text fontSize="lg" textAlign="center" fontWeight="bold">Oops! It&apos;s empty here.</Text>
            <Text fontSize="sm" textAlign="center" color="gray.600">{user ? 'Start by adding a new article.' : 'Please log in to add an article.'}</Text>
            {<Box as={Button} colorScheme="facebook" textAlign="center">
                <Link to={user ? '/create' : '/signIn'}>
                    {user ? 'Add Article' : 'Sign in'}
                </Link>
            </Box>}
        </Flex>
    )
}

export default EmptyArticleList;