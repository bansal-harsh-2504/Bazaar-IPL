import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import toast from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const {
    token,
    setToken,
    navigate,
    backendUrl,
    loggedIn,
    setLoggedIn,
    setIplTeam,
    setShowWelcomeMessage,
    setUserName,
  } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        backendUrl +
          `api/user/${currentState === "Sign Up" ? "register" : "login"}`,
        { name, email, password }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        resetFields();
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        setLoggedIn(true);
        setIplTeam(res.data.iplTeam);
        setShowWelcomeMessage(true);
        setUserName(res.data.userName);
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log("Error in Login.jsx : ", error.message);
    }
  };

  const resetFields = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
    resetFields();
  }, []);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="flex justify-center items-center h-[80vh] p-4 sm:p-6">
      <div className="border w-full max-w-md p-6 sm:p-10 shadow-xl rounded-xl bg-white">
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col items-center w-full gap-4 text-gray-800"
        >
          <div className="inline-flex items-center gap-2 mb-2 mt-4">
            <p className="prata-regular text-3xl">{currentState}</p>
            <hr className="border-gray-300 flex-grow" />
          </div>
          {currentState === "Login" ? (
            ""
          ) : (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-800 rounded-md focus:outline-none focus:ring focus:ring-gray-400"
              placeholder="Name"
              required
            />
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-800 rounded-md focus:outline-none focus:ring focus:ring-gray-400"
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-800 rounded-md focus:outline-none focus:ring focus:ring-gray-400"
            placeholder="Password"
            required
          />
          <div className="w-full flex justify-between text-sm mt-[-8px]">
            {currentState === "Login" ? (
              <p className="cursor-pointer text-gray-500 hover:text-gray-700">
                Forgot your password?
              </p>
            ) : (
              <p>Already have an account?</p>
            )}
            {currentState === "Login" ? (
              <p
                className="cursor-pointer text-blue-600 hover:underline"
                onClick={() => {
                  resetFields();
                  setCurrentState("Sign Up");
                }}
              >
                Create Account
              </p>
            ) : (
              <p
                className="cursor-pointer text-blue-600 hover:underline"
                onClick={() => {
                  resetFields();
                  setCurrentState("Login");
                }}
              >
                Login Here
              </p>
            )}
          </div>
          <button className="bg-black text-white font-light px-8 py-2 mt-4 rounded-md hover:bg-gray-800 transition">
            {currentState === "Login" ? "Login" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
