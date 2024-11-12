import React, { useEffect } from 'react';
import avatar from '../assets/owner.png';
import github from '../assets/github_icon.png';
import discord from '../assets/dc_icon.png';
import twitter from '../assets/twitter_icon.png';
import linkedIn from '../assets/linkedIn_icon.png';
import medium from '../assets/medium_icon.png';
import { setAlert, setGlobalState, useGlobalState } from '../store';
import { payToMint, loadNfts } from '../Stress';

const Hero = () => {
  const [nfts] = useGlobalState('nfts');
  const [connectedAccount] = useGlobalState('connectedAccount');
  const [nftCount] = useGlobalState('nftCount');

  useEffect(() => {
    loadNfts(); // Load NFTs ketika komponen di-mount
  }, [nftCount]); // Tambahkan dependency nftCount agar useEffect dipanggil ulang saat nftCount berubah

  useEffect(() => {
    console.log('NFT Count Updated:', nftCount);
  }, [nftCount]);

  const onMintNFT = async () => {
    if (!connectedAccount) {
      setAlert('Please connect your wallet first', 'red');
      return;
    }

    setGlobalState('loading', {
      show: true,
      msg: 'Minting new NFT to your account',
    });

    try {
      await payToMint();
      setAlert('Minting Successful...', 'green');
      await loadNfts(); // Load NFTs after successful mint
    } catch (error) {
      console.error('Error during minting:', error);
      if (error.code === 'ACTION_REJECTED') {
        setAlert('Transaction rejected by user', 'red');
      } else {
        setAlert('Minting Failed', 'red');
      }
      setGlobalState('loading', { show: false, msg: '' });
    }
  };

  return (
    <div id="hero" className="hero-section flex flex-col items-center justify-center text-center" style={{ padding: '80px 20px' }}>
      <div className="hero-content">
        <h1 className="text-white text-5xl font-bold mb-4">
          A.I Arts <br />
          <span className="text-gradient">NFTs</span> Collection
        </h1>
        <p className="text-white font-semibold text-sm mb-4">
          Mint and collect the hottest NFTs around.
        </p>
        <button
          className={`shadow-xl shadow-black text-white px-6 py-2 rounded-full cursor-pointer mb-4 ${
            connectedAccount ? 'bg-[#e32970] hover:bg-[#bd255f]' : 'bg-gray-400 cursor-not-allowed'
          }`}
          onClick={onMintNFT}
          disabled={!connectedAccount}
        >
          Mint Now
        </button>
        <div className="owner-info flex items-center justify-center bg-[#000000ad] rounded-full p-2 cursor-pointer mb-4">
          <img className="w-5 h-5 object-contain rounded-full mr-3" src={avatar} alt="Owner Avatar" />
          <div className="flex flex-col items-start">
            <span className="text-white text-sm">0xd1a...3aa5</span>
            <span className="text-[#e32970] text-xs">Stress Capital</span>
          </div>
        </div>
        <p className="text-white text-sm font-medium mb-4">
        Stress Capital leads innovation in the digital world by creating an NFT collection that focuses on technological excellence and artistic aesthetics.<br />
        Each NFT in this collection not only offers unique artwork but is also supported by advanced and transparent smart contracts.
        </p>
        <div className="flex justify-center space-x-2 mb-4">
          <a href="https://github.com/reaperads" className="bg-white p-1 rounded-full hover:scale-105 transition"  target="_blank" rel="noopener noreferrer">
            <img className="w-7 h-7" src={github} alt="Github" />
          </a>
          <a href="https://www.linkedin.com/in/agdaalif" className="bg-white p-1 rounded-full hover:scale-105 transition"  target="_blank" rel="noopener noreferrer">
            <img className="w-7 h-7" src={linkedIn} alt="LinkedIn" />
          </a>
          <a href="https://discord.com/invite/stresscapitals" className="bg-white p-1 rounded-full hover:scale-105 transition"  target="_blank" rel="noopener noreferrer">
            <img className="w-7 h-7" src={discord} alt="Discord" />
          </a>
          <a href="https://x.com/stresscapitals" className="bg-white p-1 rounded-full hover:scale-105 transition"  target="_blank" rel="noopener noreferrer">
            <img className="w-7 h-7" src={twitter} alt="Twitter" />
          </a>
          <a href="https://agdaalif.medium.com/" className="bg-white p-1 rounded-full hover:scale-105 transition"  target="_blank" rel="noopener noreferrer">
            <img className="w-7 h-7" src={medium} alt="Medium" />
          </a>
        </div>
        <div className="bg-white px-3 py-1 rounded-full shadow-xl text-black hover:bg-[#bd255f] hover:text-white transition inline-block">
          <span className="text-xs font-bold">{nftCount}/99</span> {/* Use nftCount to show the current count */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
