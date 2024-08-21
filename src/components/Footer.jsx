import ethlogo from '../assets/owner.png';
import { Link } from 'react-router-dom'; // Jika Anda menggunakan React Router

const Footer = () => (
  <footer className="footer-section w-full flex justify-between items-center flex-col p-4 backdrop-blur-md">
    <div className="w-full flex flex-col justify-between items-center my-4 mx-auto">
      <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-2 w-full">
        <p className="text-white text-base text-center mx-2 cursor-pointer"><Link to="/">Home</Link></p>
        <p className="text-white text-base text-center mx-2 cursor-pointer"><Link to="/artworks">Artworks</Link></p>
        <p className="text-white text-base text-center mx-2 cursor-pointer"><Link to="/mint-guide">How To Mint</Link></p>
        <p className="text-white text-base text-center mx-2 cursor-pointer"><Link to="/community">Community</Link></p>
      </div>
      <div className="flex flex-row justify-center items-center mt-2">
        <img src={ethlogo} alt="logo" className="w-5" />
        <span className="text-white text-xs ml-2">Stress Capital 21 With Love ❤️</span>
      </div>
    </div>
  </footer>
);

export default Footer;
