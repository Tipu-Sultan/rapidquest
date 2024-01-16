import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Upload from './components/Upload';
import Videos from './components/Videos';
import Home from './components/Home';
import { useEffect, useState } from 'react';
import VideoGrid from './components/VideoGrid';
import Documentation from './components/Documentation';

function App() {
  const HOST = process.env.REACT_APP_API_HOST;
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const [editSubText, seteditSubText] = useState('Add subtitles');
  const [isAddSubtitles, setIsAddSubtitles] = useState(false)

  const enableAndDisableForm = () => {
    if (isAddSubtitles) {
      seteditSubText('Add subtitles');
      setIsAddSubtitles(false)
    } else {
      seteditSubText('Hide subtitles Form');
      setIsAddSubtitles(true)
    }
  };

  useEffect(() => {
    setLoading(true);

    fetch(`${HOST}/api/videos`)
      .then(response => response.json())
      .then(data => {
        setVideos(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching videos:', error);
        setLoading(false);
      });
  }, [HOST]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/upload' element={<Upload setVideos={setVideos}/>} />
          <Route path='/videos' element={<VideoGrid enableAndDisableForm={enableAndDisableForm} videos={videos} />} loading={loading} />
          <Route path='/videos/:videoId' element={<Videos isAddSubtitles={isAddSubtitles} editSubText={editSubText} enableAndDisableForm={enableAndDisableForm} videos={videos} />} />
          <Route path='/documentation' element={<Documentation />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
