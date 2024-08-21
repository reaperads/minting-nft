import abi from './abis/src/contracts/stresscapital.sol/StressCapital.json';
import address from './abis/contractAddress.json';
import { getGlobalState, setGlobalState, setAlert } from './store';
import { ethers } from 'ethers';

const contractAddress = address.address;
const contractAbi = abi.abi;
const opensea_uri = `https://testnets.opensea.io/assets/sepolia/${contractAddress}/`;

const getEthereumContract = () => {
  const { ethereum } = window;
  if (!ethereum) {
    console.error('No ethereum object found. Please install MetaMask or another Ethereum wallet extension.');
    alert('No ethereum object found. Please install MetaMask or another Ethereum wallet extension.');
    return null;
  }

  const connectedAccount = getGlobalState('connectedAccount');

  if (connectedAccount) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);

    return contract;
  } else {
    return getGlobalState('contract');
  }
};

const isWalletConnected = async () => {
  try {
    const { ethereum } = window;
    if (!ethereum) {
      return false;
    }
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    if (accounts.length) {
      setGlobalState('connectedAccount', accounts[0]);
      return true;
    } else {
      setGlobalState('connectedAccount', null);
      return false;
    }
  } catch (error) {
    console.error('Error checking wallet connection:', error);
    return false;
  }
};

const connectWallet = async () => {
  try {
    const { ethereum } = window;
    if (!ethereum) {
      alert('Please install MetaMask');
      return;
    }
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    setGlobalState('connectedAccount', accounts[0]);

    window.ethereum.on('chainChanged', () => {
      window.location.reload();
    });

    window.ethereum.on('accountsChanged', async (accounts) => {
      if (accounts.length === 0) {
        disconnectWallet(false); // Call disconnectWallet without reloading the page
      } else {
        setGlobalState('connectedAccount', accounts[0]);
      }
    });
  } catch (error) {
    console.error('Error connecting wallet:', error);
  }
};

const disconnectWallet = (reload = true) => {
  setGlobalState('connectedAccount', null);
  alert('Wallet disconnected');
  if (reload) {
    window.location.reload(); // Ensure the page reloads after disconnecting only if reload is true
  }
};

const payToMint = async () => {
  try {
    const { ethereum } = window;
    if (!ethereum) {
      alert('Please install MetaMask');
      return;
    }
    const connectedAccount = getGlobalState('connectedAccount');
    const contract = getEthereumContract();
    if (!contract) return;

    const amount = ethers.utils.parseEther('0.001');

    const tx = await contract.payToMint({
      from: connectedAccount,
      value: amount._hex,
    });

    await tx.wait(); // Wait for the transaction to be mined

    await loadNfts(); // Load NFTs after minting
    setGlobalState('nftCount', getGlobalState('nftCount') + 1); // Update the NFT count
  } catch (error) {
    console.error('Error minting NFT:', error);
    setAlert(error.message, 'red'); // Use setAlert to show the error message
    throw error; // Ensure the error is thrown to handle it in the calling function
  }
};

const loadNfts = async () => {
  try {
    const { ethereum } = window;
    if (!ethereum) {
      alert('Please install MetaMask');
      return;
    }

    const contract = getEthereumContract();
    if (!contract) return;

    const nfts = await contract.getAllNFTs();

    console.log('NFTs:', nfts); // Add logging to see the fetched NFTs

    setGlobalState('nfts', structuredNfts(nfts));
    setGlobalState('nftCount', nfts.length); // Perbarui jumlah NFT berdasarkan panjang array yang diambil
  } catch (error) {
    console.error('Error loading NFTs:', error); // Improved error logging
    setAlert(error.message, 'red'); // Use setAlert to show the error message
  }
};

const structuredNfts = (nfts) =>
  nfts.map((nft) => ({
    id: Number(nft.id),
    url: opensea_uri + nft.id,
    buyer: nft.buyer,
    imageURL: nft.imageURL,
    cost: parseInt(nft.cost._hex) / 10 ** 18,
    timestamp: new Date(nft.timestamp.toNumber()).getTime(),
  })).reverse();

export {
  isWalletConnected,
  connectWallet,
  disconnectWallet,
  payToMint,
  loadNfts,
};
