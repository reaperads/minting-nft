import React, { useState, useEffect } from 'react';
import ethlogo from '../assets/owner.png';
import { useGlobalState } from '../store';

const Artworks = () => {
  const [globalNfts] = useGlobalState('nfts');
  const [nfts, setNfts] = useState([]);
  const [end, setEnd] = useState(4);
  const [count] = useState(4);

  const getNfts = () => {
    return globalNfts.slice(0, end);
  };

  useEffect(() => {
    const nfts = getNfts();
    console.log('Loaded NFTs:', nfts);
    setNfts(nfts);
  }, [globalNfts, end]);

  return (
    <div className="artworks-section py-10 relative">
      <div className="w-11/12 max-w-screen-xl mx-auto text-center">
        <h4 className="highlight-title mb-6 text-4xl font-bold text-white">Artworks</h4>

        <div className="flex flex-wrap justify-center items-center gap-6">
          {nfts.map((nft, i) => (
            <a
              key={i}
              href={nft.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative shadow-xl shadow-black p-4
                bg-white rounded-lg item w-60 h-60 object-cover 
                bg-no-repeat bg-cover overflow-hidden cursor-pointer
                transition-all duration-75 delay-100 hover:shadow-[#bd255f]"
              style={{ backgroundImage: `url(${nft.imageURL})` }}
            >
              <div
                className="absolute bottom-0 left-0 right-0
                  flex flex-row justify-between items-center
                  label-gradient p-2 w-full text-white text-sm"
              >
                <p>{`Stress Capital NFT #${nft.id}`}</p>
                <div className="flex justify-center items-center space-x-2">
                  <img
                    className="w-4 cursor-pointer"
                    src={ethlogo}
                    alt={`SCPTL NFT collection #${nft.id}`}
                  />
                  {nft.cost}
                </div>
              </div>
            </a>
          ))}
        </div>

        {globalNfts.length > nfts.length && (
          <div className="flex justify-center items-center mt-8">
            <button
              className="shadow-xl shadow-black text-white
              bg-[#e32970] hover:bg-[#bd255f] p-3
              rounded-full cursor-pointer"
              onClick={() => setEnd(end + count)}
            >
              Load more
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Artworks;
