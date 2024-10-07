import React, { useEffect, useState } from 'react';
import '../Stylesheets/About.css'; // Import the CSS file

const About = () => {
  const [githubProfile, setGithubProfile] = useState(null);

  useEffect(() => {
    // Fetch GitHub profile information
    fetch('https://api.github.com/users/enekomb')
      .then((response) => response.json())
      .then((data) => setGithubProfile(data))
      .catch((error) => console.error('Error fetching GitHub profile:', error));
  }, []);

  return (
    <div className="about-container">
      <h1>About</h1>
      <p>Welcome to HeroSearcher, your app to find your favorite comic book characters.</p>
      <p>This application allows you to search for comic characters, save your favorites, and much more.</p>
      <p>Developed using React and Firebase, HeroSearcher offers a fast and intuitive experience.</p>

      <h2>Features</h2>
      <ul>
        <li>Search for comic characters</li>
        <li>Log in with Google and GitHub</li>
        <li>Save your favorite characters</li>
      </ul>

      <h2>Contact</h2>
      <p>If you have any questions or suggestions, feel free to reach out.</p>

      {/* Flexbox container for the profile cards */}
      <div className="profile-cards">
        {/* GitHub Profile Card */}
        <div className="github-card">
          {githubProfile ? (
            <>
              <img src={githubProfile.avatar_url} alt="GitHub Avatar" className="github-avatar" />
              <h3>enekomb</h3> {/* Display GitHub username instead of full name */}
              <p>{githubProfile.bio}</p>
              <div className="github-info">
                <span>Followers: {githubProfile.followers}</span>
                <span>Repos: {githubProfile.public_repos}</span>
              </div>
              <a href={githubProfile.html_url} target="_blank" rel="noopener noreferrer" className="github-link">
                View GitHub Profile
              </a>
            </>
          ) : (
            <p>Loading GitHub profile...</p>
          )}
        </div>

        {/* LinkedIn Profile Card */}
        <div className="linkedin-card">
          <img
            src="https://media.licdn.com/dms/image/v2/C5603AQGio-vpWS4MaQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1638314577656?e=1733961600&v=beta&t=9OvJ0sn3E8IiLfQoipodhrB3yWdGxYNhqlR2WSYg7YE"
            alt="LinkedIn Avatar"
            className="linkedin-avatar"
          />
          <h3>Eneko Muñoz Bordona</h3>
          <p>Software Engineer | Full Stack Developer</p>
          <a
            href="https://www.linkedin.com/in/eneko-mu%C3%B1oz-bordona/"
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin-link"
          >
            View LinkedIn Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
