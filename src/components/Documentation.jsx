import { Box, Heading, Text, Link, Divider, VStack, Image } from '@chakra-ui/react';
import Layout from '../layout/Layout';
import subIMg from '../subtitle.png'
const Documentation = () => {
    return (
        <Layout>
            <Box maxW="800px" mx="auto" py="8">
                <VStack align="start" spacing="6">
                    <Heading as="h1" fontSize="3xl" mb="4">
                        Project Documentation
                    </Heading>
                    <Text>GitHub URL: <Link target='_blank' color={'teal'} href="https://github.com/Tipu-Sultan/rapidquest">Front-End Code</Link></Text>
                    <Text>GitHub URL: <Link target='_blank' color={'teal'} href="https://github.com/Tipu-Sultan/rapidquest-server">Back-End Code</Link></Text>
                    <Text>Hosted URL: <Link target='_blank' color={'teal'} href="https://rapidquest.vercel.app/"> RapidQuest</Link></Text>
                    <Divider my="6" />
                    <Box>
                        <Heading as="h2" fontSize="2xl" mb="2">
                            Upload
                        </Heading>
                        <Text>
                            The upload section allows users to upload video files. Users can provide a title and description for each
                            video during the upload process.

                            <p>['HOST/api/upload']</p>
                        </Text>
                    </Box>

                    <Divider my="6" />

                    <Box>
                        <Heading as="h2" fontSize="2xl" mb="2">
                            Videos
                        </Heading>
                        <Text>
                            The videos section displays a list of uploaded videos. Users can click on a video to view details or play
                            the video. Videos are displayed with a thumbnail, title, and watch button.
                        </Text>
                    </Box>

                    <Divider my="6" />

                    <Box>
                        <Heading as="h2" fontSize="2xl" mb="2">
                            Video Play
                        </Heading>
                        <Text>
                            The video play section allows users to watch selected videos. Videos are played using the HTML5 video player.
                        </Text>
                    </Box>

                    <Divider my="6" />

                    <Box>
                        <Heading as="h2" fontSize="2xl" mb="2">
                            Add Subtitles
                        </Heading>
                        <Text>
                            Users can add custom subtitles to videos at specific timestamps. Subtitles are associated with specific
                            moments in the video and will be displayed in sync during playback.

                            <p>['HOST/api/videos/VideoId']</p>
                            <p>['HOST/api/videos/VideoId/SubtitleId']</p>
                        </Text>
                        <Image mt={5} src={subIMg} borderRadius="md"/>
                    </Box>

                    <Divider my="6" />

                    <Box>
                        <Heading as="h2" fontSize="2xl" mb="2">
                            API
                        </Heading>
                        <Text>
                            The API supports uploading video files, adding subtitles, and retrieving video details and subtitles. MongoDB is
                            used as the database to store video and subtitle information.

                            <p>['HOST/api/videos']</p>
                            <p>['HOST/api/videos/VideoId']</p>
                        </Text>
                    </Box>

                    <Divider my="6" />
                    <Box>
                        <Heading as="h2" fontSize="2xl" mb="2">
                            Hosting
                        </Heading>
                        <Text>
                            The project is hosted on Vercel. The frontend is hosted separately from the backend, ensuring scalability and
                            optimal performance.
                        </Text>
                    </Box>
                </VStack>
            </Box>
        </Layout>
    );
};

export default Documentation;
