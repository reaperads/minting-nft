import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { isWalletConnected, loadNfts } from './Stress';
import { useGlobalState } from './store';
import Alert from './components/Alert';
import Artworks from './components/Artworks';
import Community from './components/Community'; // Import the new component
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import Loading from './components/Loading';
import MintGuide from './components/MintGuide';
import './index.css';

const App = () => {
  const [nfts] = useGlobalState('nfts');

  useEffect(() => {
    const initialize = async () => {
      await isWalletConnected().then(() => console.log('Blockchain Loaded'));
      await loadNfts();
    };

    initialize();

    const handleScroll = () => {
      const artworksBackground = document.querySelector('.artworks-background');
      const artworksSection = document.querySelector('.artworks-section');

      if (artworksSection && artworksBackground) {
        const artworksRect = artworksSection.getBoundingClientRect();
        const isArtworksInView = artworksRect.top < window.innerHeight && artworksRect.bottom >= 0;

        if (isArtworksInView) {
          artworksBackground.classList.add('artworks-focused');
        } else {
          artworksBackground.classList.remove('artworks-focused');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="app-container flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/artworks" element={<Artworks artworks={nfts} />} />
          <Route path="/mint-guide" element={<MintGuide />} />
          <Route path="/community" element={<Community />} /> {/* Add the new route */}
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </main>
      <Footer />
      <Loading />
      <Alert />
    </div>
  );
};

export default App;
