import { useEffect } from 'react';
import step1Image from '../assets/step1.png';
import step2Image from '../assets/step2.png';
import step3Image from '../assets/step3.png';
import step4Image from '../assets/step4.png';
import step5Image from '../assets/step2.png';
import { Link } from 'react-router-dom';

const steps = [
  {
    title: "Step 1: Connect Your Wallet",
    description: "To begin minting an NFT, you first need to connect your cryptocurrency wallet. Click on the 'Connect Wallet' button and select your preferred wallet from the list of supported options.",
    imageURL: step1Image
  },
  {
    title: "Step 2: Click the Mint Button",
    description: "After connecting your wallet, click on the 'Mint' button to initiate the minting process for the available NFT.",
    imageURL: step2Image
  },
  {
    title: "Step 3: Confirm the Transaction",
    description: "A transaction confirmation prompt will appear in your wallet. Review the details and ensure you have sufficient funds to cover the cost, then confirm the transaction.",
    imageURL: step3Image
  },
  {
    title: "Step 4: Wait for Confirmation",
    description: "The transaction might take some time to process. You can check the status in your wallet or on the transaction confirmation page.",
    imageURL: step4Image
  },
  {
    title: "Step 5: NFT Minted",
    description: "Congratulations! Your NFT has been minted. You can view it in your wallet or on the NFT marketplace where it was minted.",
    imageURL: step5Image
  }
];

const MintGuide = () => {
  useEffect(() => {
    document.title = "How to Mint an NFT - Minting Guide";
  }, []);

  return (
    <div className="mint-guide-section py-10">
      <div className="w-4/5 mx-auto">
        <h2 className="highlight-title text-3xl font-bold mb-6">How to Mint an NFT</h2>
        <div className="flex flex-col space-y-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:space-x-6 items-center p-6 shadow-lg bg-white bg-opacity-80 rounded-lg transform transition duration-300 hover:scale-105"
            >
              <img
                src={step.imageURL}
                alt={step.title}
                className="w-full md:w-1/3 rounded-lg object-cover mb-4 md:mb-0"
              />
              <div className="text-center md:text-left md:pl-4 text-black">
                <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                <p>{step.description}</p>
                {index === 4 && (
                  <Link
                    to="/"
                    className="mt-4 inline-block bg-pink-500 text-black py-2 px-4 rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
                  >
                    Go Mint Now
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MintGuide;
