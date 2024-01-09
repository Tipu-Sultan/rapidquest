import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  VStack,
  Box,
} from '@chakra-ui/react';
import SubtitleForm from './SubtitleForm';

const SubtitleModal = ({ setSelectedVideo, msg, onSubtitleSubmit, isModalOpen, handleCloseModal, subtitles, videoId }) => {
  const HOST = process.env.REACT_APP_API_HOST;
  const [selectedSubtitle, setSelectedSubtitle] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditClick = (subtitle) => {
    setSelectedSubtitle(subtitle);
    setIsEditMode(true);
  };

  const handleDeleteClick = async (subtitleId, videoId) => {
    try {
      const response = await fetch(`${HOST}/api/videos/${videoId}/${subtitleId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error('Error deleting subtitle:', response.statusText);
        return;
      }
      const videoData = await response.json();
      setSelectedVideo(videoData);
    } catch (error) {
      console.error('Error deleting subtitle:', error);
    }
  };


  return (
    <Modal isOpen={isModalOpen} onClose={handleCloseModal} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Subtitle Editor</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box h="300px" overflowY="auto" p={4} borderWidth="1px" borderRadius="md" mb={3}>
            <VStack spacing="4" align="stretch">
              {subtitles.map((subtitle, i) => (
                <SubtitleRow key={i} subtitle={subtitle} onDeleteClick={() => handleDeleteClick(subtitle._id,videoId)} onEditClick={() => handleEditClick(subtitle)} />
              ))}
            </VStack>
          </Box>
          <SubtitleForm
            videoId={videoId}
            isEditMode={isEditMode}
            initialSubtitle={selectedSubtitle}
            onSubtitleSubmit={onSubtitleSubmit}
            msg={msg}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleCloseModal}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const SubtitleRow = ({ subtitle, onEditClick, onDeleteClick }) => (
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
    <Text style={{ width: '400px' }}>
      [{subtitle.startTime} , {subtitle.endTime}]{': '}{subtitle.text}
    </Text>
    <Button variant="none" style={{ marginLeft: '8px' }} onClick={onEditClick}>
      Edit
    </Button>
    <Button variant="none" style={{ marginLeft: '8px' }} onClick={onDeleteClick}>
      <FaTrash />
    </Button>
  </div>
);

export default SubtitleModal;
