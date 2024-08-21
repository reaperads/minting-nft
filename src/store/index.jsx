import { createGlobalState } from 'react-hooks-global-state';

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
  alert: { show: false, msg: '', color: '' },
  loading: { show: false, msg: '' },
  connectedAccount: '',
  contract: null,
  nfts: [],
  nftCount: 0,
});

const truncate = (text, startChars, endChars, maxLength) => {
  if (text.length > maxLength) {
    let start = text.substring(0, startChars);
    let end = text.substring(text.length - endChars, text.length);
    while (start.length + end.length < maxLength) {
      start += '.';
    }
    return start + end;
  }
  return text;
};

const setAlert = (msg, color = 'green') => {
  setGlobalState('alert', { show: true, msg, color });
  setTimeout(() => {
    setGlobalState('alert', { show: false, msg: '', color });
    setGlobalState('loading', { show: false, msg: '' });
  }, 8000);
};

const setLoadingMsg = (msg) => {
  const loading = getGlobalState('loading');
  setGlobalState('loading', { ...loading, msg });
};

const connectWallet = async () => {
  const { ethereum } = window;
  if (!ethereum) {
    alert('Please install MetaMask');
    return;
  }
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  setGlobalState('connectedAccount', accounts[0]);
};

const disconnectWallet = () => {
  setGlobalState('connectedAccount', '');
  alert('Wallet disconnected');
};

export {
  useGlobalState,
  setGlobalState,
  getGlobalState,
  truncate,
  setAlert,
  setLoadingMsg,
  connectWallet,
  disconnectWallet,
};
