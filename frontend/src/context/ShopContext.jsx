import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const delivery_fee = import.meta.env.VITE_DELIVERY_FEE;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [showSearchIcon, setShowSearchIcon] = useState(false);
  const [iplTeam, setIplTeam] = useState("");
  const [showFooter, setShowFooter] = useState(true);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [userName, setUserName] = useState("");
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    if (token) {
      try {
        const res = await axios.post(
          backendUrl + "api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
        if (res.data.success) {
          setCartItems(cartData);
          toast.success("Item added to cart.");
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        toast.error(error.message);
        console.log("Error while adding to cart : ", error.message);
      }
    } else {
      toast.error("Login required.");
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.log("Error getting cart count : ", error.message);
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;

    if (token) {
      try {
        const res = await axios.post(
          backendUrl + "api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );

        if (!res.data.success) {
          toast.error(res.data.message);
        } else {
          setCartItems(cartData);
        }
      } catch (error) {
        console.log(error.message);
        toast.error(error.message);
      }
    }
  };

  const getUserCart = async (token) => {
    try {
      const res = await axios.get(backendUrl + "api/cart/get", {
        headers: { token },
      });
      if (res.data.success) {
        setCartItems(res.data.cartData);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {
          console.log("Error in getting cartAmount : ", error.message);
        }
      }
    }
    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const res = await axios.get(backendUrl + "api/product/list");
      if (res.data.success) {
        setProducts(res.data.products);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log("Error getting Products data : ", error.message);
    }
  };
  const getUserTeam = async () => {
    try {
      const res = await axios.post(
        backendUrl + "api/team/get",
        {},
        {
          headers: { token },
        }
      );
      if (res.data.success) {
        setIplTeam(res.data.iplTeam);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log("Error getting User team : ", error.message);
    }
  };

  const handleCloseModal2 = () => {
    setIsModalOpen2(false);
  };

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    getProductsData();
    if (token) {
      getCartCount();
      getUserTeam();
    }
  }, [token]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
    loggedIn,
    setLoggedIn,
    showSearchIcon,
    setShowSearchIcon,
    iplTeam,
    setIplTeam,
    showFooter,
    setShowFooter,
    showWelcomeMessage,
    setShowWelcomeMessage,
    userName,
    setUserName,
    isModalOpen2,
    setIsModalOpen2,
    handleCloseModal2,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
