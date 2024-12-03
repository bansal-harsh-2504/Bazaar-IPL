import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/Bestseller";
import OurPolicy from "../components/OurPolicy";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Welcome from "../components/Welcome";

const Home = () => {
  const { showWelcomeMessage, setShowWelcomeMessage, iplTeam, userName } =
    useContext(ShopContext);

  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setShowWelcomeMessage(false);
  };

  return (
    <div>
      {showWelcomeMessage && (
        <Welcome
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          iplTeam={iplTeam}
          userName={userName}
        />
      )}
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
    </div>
  );
};

export default Home;
