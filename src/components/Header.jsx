import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connectWallet, disconnectWallet } from '../Stress';
import { truncate, useGlobalState, getGlobalState } from '../store';
import customLogo from '../assets/ethlogo.png'; // Replace with the path to your new logo

const Header = () => {
  const [connectedAccount, setConnectedAccount] = useGlobalState('connectedAccount');
  const [showDisconnect, setShowDisconnect] = useState(false);
  const disconnectRef = useRef(null);

  useEffect(() => {
    const handleMouseClick = (event) => {
      if (disconnectRef.current && disconnectRef.current.contains(event.target)) {
        return;
      }
      setShowDisconnect(false);
    };

    document.addEventListener('mousedown', handleMouseClick);

    return () => {
      document.removeEventListener('mousedown', handleMouseClick);
    };
  }, []);

  const handleConnectButtonClick = async () => {
    if (!connectedAccount) {
      await connectWallet();
      const account = getGlobalState('connectedAccount');
      setConnectedAccount(account);
    } else {
      setShowDisconnect(!showDisconnect);
    }
  };

  const handleDisconnectButtonClick = async () => {
    await disconnectWallet(false); // Call disconnectWallet without reloading the page
    setConnectedAccount(null);
    setShowDisconnect(false);
  };

  return (
    <nav className="navbar w-full flex justify-between items-center py-4 px-6 backdrop-blur-md">
      <div className="relative">
        <img className="custom-logo w-40 h-14 cursor-pointer transition duration-300" src={customLogo} alt="Custom Logo" />
      </div>
      <ul className="md:flex-[0.5] text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
      <li className="mx-4 cursor-pointer nav-item"><Link to="/">Home</Link></li>
        <li className="mx-4 cursor-pointer nav-item"><Link to="/artworks">Artworks</Link></li>
        <li className="mx-4 cursor-pointer nav-item"><Link to="/mint-guide">How To Mint</Link></li>
        <li className="mx-4 cursor-pointer nav-item"><Link to="/community">Community</Link></li>
      </ul>
      <div className="relative">
        <button className="shadow-xl shadow-black text-white bg-[#e32970] px-4 py-2 rounded-full cursor-pointer" onClick={handleConnectButtonClick}>
          {connectedAccount ? truncate(connectedAccount, 4, 4, 11) : 'Connect Wallet'}
        </button>
        {connectedAccount && showDisconnect && (
          <div className="absolute top-12 right-0 bg-white py-2 px-4 shadow-lg rounded-md" ref={disconnectRef}>
            <button className="text-[#e32970] hover:text-red-600 cursor-pointer" onClick={handleDisconnectButtonClick}>
              Disconnect Wallet
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
