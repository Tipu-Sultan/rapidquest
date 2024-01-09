import { Card, CardBody, Heading, VStack, Image } from '@chakra-ui/react'
import React from 'react'

const VideoList = ({ videos, handleVideoClick }) => {
    return (
        <VStack align="stretch" p={4}>
            <Heading size="lg">Related Videos</Heading>
            {videos.map((video) => (
                <Card
                    key={video._id}
                    onClick={() => handleVideoClick(video._id)}
                    cursor="pointer"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    transition="all 0.3s"
                >
                    <Image
                        src={`https://w0.peakpx.com/wallpaper/638/541/HD-wallpaper-blogger-green-logo-green-brickwall-blogger-logo-social-networks-blogger-neon-logo-blogger-thumbnail.jpg`}
                        alt={video.title}
                        h={['150px', '200px', '150px']}
                        objectFit="cover"
                    />
                    <CardBody>
                        <Heading size="sm">{video.title}</Heading>
                    </CardBody>
                </Card>
            ))}
        </VStack>
    )
}

export default VideoList