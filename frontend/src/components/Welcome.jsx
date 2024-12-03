const Welcome = ({ isOpen, onClose, iplTeam, userName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Welcome, {userName}!
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>
        <p className="text-lg text-gray-700">
          You&apos;ve been assigned to Team{" "}
          <span className="font-bold">{iplTeam.toUpperCase()}</span>. Score big with your next purchase!
        </p>
      </div>
    </div>
  );
};

export default Welcome;
