import React from 'react';
import logo from '../assets/owner.png'; // Ensure the path to the logo is correct
import github from '../assets/github_icon.png'; // Ensure the path to the GitHub icon is correct
import twitter from '../assets/twitter_icon.png'; // Ensure the path to the Twitter icon is correct
import discord from '../assets/dc_icon.png'; // Ensure the path to the Facebook icon is correct
import '../index.css';

const Community = () => {
  return (
    <div className="community-section hero-section flex flex-col items-center justify-center text-center">
      <div className="hero-content flex flex-col items-center">
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="Stress Capital Logo" className="logo mb-4 glow-effect" />
          <h1 className="text-white text-5xl font-bold mb-4">
            Stress Capital <br />
            <span className="text-gradient-3d">Community</span>
          </h1>
          <p className="text-white font-semibold text-sm mt-4 max-w-2xl mx-auto">
            Stress Capital is a Decentralized Autonomous Organization (DAO) consisting of members who are crypto and NFT enthusiasts as well as airdroppers. Join us and become part of a vibrant community where you can explore and share insights about the latest trends and opportunities in the crypto and NFT space.
          </p>
          
          <div className="flex justify-center space-x-4 mt-6">
            <a href="https://github.com/Daltonic" className="bg-white p-2 rounded-full hover:scale-105 transition" target="_blank" rel="noopener noreferrer">
              <img className="w-8 h-8" src={github} alt="Github" />
            </a>
            <a href="https://discord.com/invite/stresscapitals" className="bg-white p-2 rounded-full hover:scale-105 transition" target="_blank" rel="noopener noreferrer">
              <img className="w-8 h-8" src={discord} alt="Discord" />
            </a>
            <a href="https://x.com/stresscapitals" className="bg-white p-2 rounded-full hover:scale-105 transition" target="_blank" rel="noopener noreferrer">
              <img className="w-8 h-8" src={twitter} alt="Twitter" />
            </a>
          </div>
          
        </div>
        
        <div className="org-chart text-white text-left mt-12">
          <h2 className="text-3xl font-bold mb-4">Organizational Structure</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-icon">1</div>
              <div className="timeline-content">
                <h3>Founder</h3>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon">2</div>
              <div className="timeline-content">
                <h3>Admin</h3>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon">3</div>
              <div className="timeline-content">
                <h3>Moderator</h3>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon">4</div>
              <div className="timeline-content">
                <h3>Collab Manager</h3>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon">5</div>
              <div className="timeline-content">
                <h3>Research+</h3>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon">6</div>
              <div className="timeline-content">
                <h3>Staff</h3>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon">7</div>
              <div className="timeline-content">
                <h3>Inner Dao</h3>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon">8</div>
              <div className="timeline-content">
                <h3>Inner Trial</h3>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon">9</div>
              <div className="timeline-content">
                <h3>Member</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
