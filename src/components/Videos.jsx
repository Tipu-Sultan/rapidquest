import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Spinner,
  Button,
  Grid,
  useColorModeValue,
  GridItem,
  Container,
} from '@chakra-ui/react';
import Layout from '../layout/Layout';
import Subtitle from './Subtitle';
import SubtitleForm from './SubtitleForm';
import VideoList from './VideoList';
import SubtitleModal from './SubtitleModal';
import './video.css';

const Video = ({ videos, loading, enableAndDisableForm, editSubText, isAddSubtitles }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const HOST = process.env.REACT_APP_API_HOST;
  const bgColor = useColorModeValue('gray.100', 'gray.900');
  const { videoId } = useParams();
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [msg, setMsg] = useState('')
  const navigate = useNavigate();

  const handleSubtitleSubmit = async (subtitleData) => {
    try {
      const response = await fetch(`${HOST}/api/videos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subtitleData),
      });

      if (!response.ok) {
        setMsg('Something wrong or wrong input');
        return;
      }
      const videoData = await response.json();
      setSelectedVideo(videoData.updatedVideo)
      setMsg(videoData.msg);
    } catch (error) {
      setMsg('error msg');
    }
  };


  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  useEffect(() => {
    const video = videos.find((video) => video._id === videoId);
    setSelectedVideo(video);
  }, [videoId, videos]);

  const handleVideoClick = (newVideoId) => {
    navigate(`/videos/${newVideoId}`);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`https://storage.cloud.google.com/edunify/${encodeURIComponent(selectedVideo.filename)}`)
    .then(() => {
      alert('Link copied to clipboard!');
    }).catch((err) => {
      console.error('Unable to copy to clipboard', err);
    });
  }


  if (loading) {
    return <Spinner size="xl" />;
  }

 
  return (
    <Layout>
      <Container maxW={'container.xl'} py={6}>
        <Grid templateColumns={['1fr', '1fr', '3fr 1fr']} gap={6}>
          <Box mb={8} w="100%">
            <Box position="relative">
              {selectedVideo && (
                <>
                  <video
                    ref={videoRef}
                    src={`https://storage.cloud.google.com/edunify/${encodeURIComponent(selectedVideo.filename)}`}
                    controls
                    onTimeUpdate={handleTimeUpdate}
                    width="100%"
                    height="100%"
                    borderRadius="md"
                    style={{ borderRadius: "5px" }}
                    muted
                    preload="auto"
                    className="custom-video-player"
                  />
                  <Subtitle subtitles={selectedVideo?.subtitles} currentTime={currentTime}  />
                  {isModalOpen && <SubtitleModal msg={msg} setSelectedVideo={setSelectedVideo} onSubtitleSubmit={handleSubtitleSubmit} videoId={videoId} subtitles={selectedVideo?.subtitles} isModalOpen={isModalOpen} handleCloseModal={handleCloseModal} />}
                </>
              )}
            </Box>
            <Box mt={4} >
              <Button mr={3} variant={'outline'} color={'green.400'} onClick={() => enableAndDisableForm()}>{editSubText}</Button>
              <Button mr={3} variant={'outline'} color={'yellow.400'} onClick={handleOpenModal}>Edit Subtitles</Button>
              <Button variant={'outline'} color={'blue.400'} onClick={handleShare}>Share</Button>
              {isAddSubtitles && !isModalOpen && <SubtitleForm msg={msg} videoId={selectedVideo?._id} onSubtitleSubmit={handleSubtitleSubmit} />}
            </Box>
          </Box>
          <GridItem colSpan={[1, 1, 1]} mt={[4, 0, 0]}>
            <VideoList videos={videos} handleVideoClick={handleVideoClick} />
          </GridItem>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Video;
