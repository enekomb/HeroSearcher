import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import '../Stylesheets/Home.css';

const Home = ({ user }) => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate(); // Use navigate to redirect to login

  // Fetch the latest Marvel trailers from YouTube API
  useEffect(() => {
    const fetchMarvelTrailers = async () => 
	{
	  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
	  const channelId = process.env.REACT_APP_MARVEL_CHANNEL_ID;
      const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=2&type=video`;

      try {
        const response = await axios.get(url);
        const videoResults = response.data.items;
        setVideos(videoResults);
      } catch (error) {
        console.error('Error fetching Marvel trailers:', error);
      }
    };

    fetchMarvelTrailers();
  }, []);

  // Function to redirect to login
  const handleLoginRedirect = () => {
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="home-container">
      <h1>Welcome to HeroSearcher</h1>

      <div className="trailers-section">
        <h2>Latest Marvel Videos</h2>
        <div className="trailers">
          {videos.map((video) => (
            <div key={video.id.videoId} className="trailer-card">
              <iframe
                width="100%"
                height="200"
                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                title={video.snippet.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <p>{video.snippet.title}</p>
            </div>
          ))}
        </div>
      </div>

      {!user && (
        <div className="login-prompt-section">
          <h2>Log in to explore the app</h2>
          <button className="login-button" onClick={handleLoginRedirect}>
            Go to Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
