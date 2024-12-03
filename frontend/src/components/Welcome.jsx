const Welcome = ({ isOpen, onClose, iplTeam, userName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 w-[50%]">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl focus:outline-none"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Welcome, {userName}!
        </h2>

        <p className="text-lg text-gray-700 text-center leading-relaxed">
          You&apos;ve been assigned to Team{" "}
          <span className="font-bold text-indigo-600">{iplTeam}</span>. <br />
          Score big with your next purchase!
        </p>
      </div>
    </div>
  );
};

export default Welcome;
