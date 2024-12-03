import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import toast from "react-hot-toast";

const ChangeTeam = ({ isOpen, onClose }) => {
  const { iplTeam, setIplTeam, token, backendUrl } = useContext(ShopContext);
  const iplTeams = ["CSK", "GT", "RCB", "KKR"];
  const [selectedTeam, setSelectedTeam] = useState(iplTeam);
  const [loading, setLoading] = useState(false);

  const changeTeam = async (newTeam) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${backendUrl}/api/team/change`,
        {
          team: newTeam,
        },
        {
          headers: { token },
        }
      );
      if (res.data.success) {
        setIplTeam(res.data.iplTeam);
        toast.success("Team changed successfully!");
        onClose();
      } else {
        console.error("Failed to change team:", res.data.message);
      }
    } catch (error) {
      console.error("Error changing team:", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Select your new team
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>
        <div>
          {iplTeams.map((team, idx) => (
            <button
              className={`m-2 border rounded-md px-5 py-2 ${
                selectedTeam === team ? "border-2 bg-[#1a1a1a] text-white" : ""
              }`}
              key={idx}
              onClick={() => setSelectedTeam(team)}
            >
              {team}
            </button>
          ))}
        </div>
        <button
          onClick={() => changeTeam(selectedTeam)}
          className={`btn ${iplTeam} mt-6 w-full border-black border px-6 py-2 text-[#1a1a1a] font-semibold rounded-lg shadow-md hover:bg-[#1a1a1a] focus:outline-none hover:text-white focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition flex justify-center items-center`}
        >
          {loading ? <Loader /> : "Confirm selection"}
        </button>
      </div>
    </div>
  );
};

const Loader = () => {
  return <div className="h-10 w-10 border-4 border rounded-full" />;
};
export default ChangeTeam;