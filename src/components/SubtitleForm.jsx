import React, { useState, useEffect } from 'react';
import { Button, Input, Flex, FormControl, FormLabel, VStack, Text } from '@chakra-ui/react';

const SubtitleForm = ({ videoId, onSubtitleSubmit, isEditMode, initialSubtitle, msg }) => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [text, setText] = useState('');
  const [subtitleId, setSubtitleId] = useState('');

  useEffect(() => {
    if (isEditMode && initialSubtitle) {
      setStartTime(initialSubtitle.startTime);
      setEndTime(initialSubtitle.endTime);
      setText(initialSubtitle.text);
      setSubtitleId(initialSubtitle._id);
    }
  }, [isEditMode, initialSubtitle]);

  const handleSubtitleSubmit = () => {
    onSubtitleSubmit({videoId,subtitleId,startTime, endTime,text });
    setStartTime('');
    setEndTime('');
    setText('');
  };

  return (
    <VStack mt={4} align="stretch" spacing={4} p={4} borderWidth="1px" borderRadius="md">
      <FormControl>
        <FormLabel>Start Time</FormLabel>
        <Input
          placeholder="00:00:00"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>End Time</FormLabel>
        <Input
          placeholder="00:00:00"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Subtitle Text</FormLabel>
        <Input
          placeholder="Enter subtitle text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </FormControl>

      <Flex justify="flex-end">
        <Button colorScheme="teal" onClick={handleSubtitleSubmit}>
          {isEditMode ? 'Update Subtitle' : 'Save Subtitle'}
        </Button>
      </Flex>
      <Text color={'green.100'}>{msg}</Text>
    </VStack>
  );
};

export default SubtitleForm;
