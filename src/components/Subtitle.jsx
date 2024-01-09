import React, { useState, useEffect } from 'react';

const Subtitle = ({ subtitles, currentTime }) => {
  const [currentSubtitle, setCurrentSubtitle] = useState(null);

  useEffect(() => {
    const subtitle = subtitles.find(sub => currentTime >= sub.startTime && currentTime <= sub.endTime);
    setCurrentSubtitle(subtitle);
  }, [currentTime, subtitles]);

  return (
    <div>
      {currentSubtitle && <p style={{padding:'10px'}}>{currentSubtitle.text}</p>}
    </div>
  );
};

export default Subtitle;
