import {
  Button,
  Container,
  Input,
  VStack,
  Progress,
  Textarea,
  Text
} from '@chakra-ui/react';
import React, { useState } from 'react';
import axios from 'axios';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { toast } from 'react-toastify';
import Layout from '../layout/Layout';

const Upload = ({ setVideos }) => {
  const HOST = process.env.REACT_APP_API_HOST
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [wait, setWait] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);
  };

  const handleUpload = async (e) => {
    e.preventDefault();


    setWait(true);
    setUploadProgress(0);

    if (!file) {
      alert('Please select a file to upload');
      setWait(false);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);

    try {
      const response = await axios.post(`${HOST}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          setUploadProgress(progress);
        },
      });

      toast.success(response.data.message);
      setVideos(response.data.videosData)
      setWait(false);
      setFile(null);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error uploading file:', error);
      setWait(false);
    }
  };

  return (
    <Layout>
      <Container maxW={'container.xl'} h={'100vh'} p={'16'}>
        <VStack
          color={'purple.500'}
          h={'full'}
          justifyContent={'center'}
          spacing={8}
        >
          <AiOutlineCloudUpload size="10vmax" />

          <form>
            <VStack spacing={4}>
              <Input
                required
                type={'file'}
                onChange={handleFileChange}
                css={{
                  '&::file-selector-button': {
                    border: 'none',
                    width: 'calc(100% + 36px)',
                    height: '100%',
                    marginLeft: '-18px',
                    color: 'purple',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                  },
                }}
              />
              {fileName && <Text>{fileName}</Text>}
              <Input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Button
                colorScheme={'purple'}
                type={'submit'}
                onClick={handleUpload}
                width={['100%', '100%', '50%']}
              >
                {wait ? 'Please wait..' : 'Upload'}
              </Button>
            </VStack>
            {uploadProgress >= 0 && (
              <Progress
                value={Number(uploadProgress)}
                colorScheme="purple"
                size="sm"
                w="100%"
                mt={4}
                borderRadius={'md'}
                textAlign="center"
                display="flex"
                alignItems="center"
                height={3}
              >
                {uploadProgress}%
              </Progress>
            )}
          </form>
        </VStack>
      </Container>
    </Layout>
  );
};

export default Upload;