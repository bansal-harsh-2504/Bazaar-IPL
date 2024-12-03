import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const Popup = ({ isOpen, onClose, method }) => {
  const { navigate } = useContext(ShopContext);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 sm:p-6">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl max-w-sm sm:max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-bold">
            Order Placed Successfully
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-3xl sm:text-4xl"
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        <p className="text-base sm:text-lg mb-4">
          Your order has been placed successfully with {method}.
        </p>
        <p className="text-base sm:text-lg">Congratulations!</p>
        <div className="mt-6">
          <button
            onClick={() => navigate("/orders")}
            className="w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-200"
          >
            Go to Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
