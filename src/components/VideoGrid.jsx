import { Link } from 'react-router-dom';
import { SimpleGrid, Heading, Button, Image, VStack, Box } from '@chakra-ui/react';
import Layout from '../layout/Layout';

const VideoGrid = ({ videos,enableAndDisableForm }) => {
    return (
        <Layout>
            <SimpleGrid my={10} columns={[1, 2, 3, 6]} spacing={4} h={['auto', 'auto', '80%']} w={['100%', '80%']} mx="auto">
                {videos.map(video => (
                    <Box key={video._id} cursor="pointer" borderWidth="1px" borderRadius="lg" overflow="hidden" transition="all 0.3s">
                        <Image src={`https://w0.peakpx.com/wallpaper/638/541/HD-wallpaper-blogger-green-logo-green-brickwall-blogger-logo-social-networks-blogger-neon-logo-blogger-thumbnail.jpg`} alt={video.title} h="150px" objectFit="cover" />
                        <VStack align="stretch" p={4}>
                            <Heading size="sm" mb={2}>
                                {video.title}
                            </Heading>
                            <Link to={`/videos/${video._id}`}>
                                <Button colorScheme="teal" size="sm" w="100%">
                                    Watch Now
                                </Button>
                            </Link>
                            <Link to={`/videos/${video._id}`}>
                                <Button colorScheme="teal" size="sm" w="100%" onClick={() => enableAndDisableForm()}>
                                    Add Subtitles
                                </Button>
                            </Link>
                        </VStack>
                    </Box>
                ))}
            </SimpleGrid>
        </Layout>
    );
};

export default VideoGrid;
