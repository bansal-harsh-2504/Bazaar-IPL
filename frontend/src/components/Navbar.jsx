import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, Link, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const {
    setShowSearch,
    getCartCount,
    loggedIn,
    setLoggedIn,
    navigate,
    setToken,
    setCartItems,
    showSearchIcon,
    setShowSearchIcon,
    iplTeam,
    setIplTeam,
    setIsModalOpen2,
  } = useContext(ShopContext);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setShowSearchIcon(true);
    } else {
      setShowSearchIcon(false);
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    setIplTeam("");
    setLoggedIn(false);
    setToken("");
    localStorage.removeItem("token");
    setCartItems({});
    navigate("/login");
  };

  return (
    <div
      className={`${iplTeam} nav border px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mb-1 fixed top-0 left-0 w-full z-50 transition-all ${
        scrolled ? "backdrop-blur-md bg-white/50 shadow-md" : "bg-white"
      }`}
    >
      <div className="flex items-center justify-between py-3 font-medium">
        <div className="flex">
          <Link to={"/"}>
            <img src={assets.logo} className="h-[50px]" />
          </Link>
          <p className="m-2 translate-y-0.5">X</p>
          {iplTeam != "" ? (
            <img
              src={
                {
                  CSK: assets.csk_logo,
                  RCB: assets.rcb_logo,
                  DC: assets.dc_logo,
                  KKR: assets.kkr_logo,
                  GT: assets.gt_logo,
                }[iplTeam]
              }
              className="h-[50px] scale-[1.2] ml-5"
            />
          ) : (
            <img src={assets.ipl_logo} className="h-[50px] scale-[0.9] ml-5" />
          )}
        </div>

        <ul className="hidden sm:flex gap-5 text-sm text-black -translate-x-[50%]">
          <NavLink to="/" className="flex flex-col items-center gap-1">
            <p>HOME</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-black hidden" />
          </NavLink>
          <NavLink
            to="/collection"
            className="flex flex-col items-center gap-1"
          >
            <p>COLLECTION</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-black hidden" />
          </NavLink>
        </ul>

        <div className="flex items-center gap-6">
          {showSearchIcon ? (
            <img
              src={assets.search_icon}
              className="w-5 cursor-pointer"
              onClick={() => setShowSearch((prev) => !prev)}
            />
          ) : (
            <span className="w-5" />
          )}
          <div className="group relative">
            <img
              src={assets.profile_icon}
              className="w-5 cursor-pointer"
              onClick={() => (loggedIn ? null : navigate("/login"))}
            />
            {loggedIn && (
              <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                  <p
                    className="cursor-pointer hover:text-black"
                    onClick={() => setIsModalOpen2(true)}
                  >
                    Change Team
                  </p>
                  <Link to={"/orders"}>
                    <p className="cursor-pointer hover:text-black">Orders</p>
                  </Link>
                  <p
                    onClick={handleLogout}
                    className="cursor-pointer hover:text-black"
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>
          <Link to="/cart" className="relative">
            <img src={assets.cart_icon} className="w-5 min-w-5" />
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
              {getCartCount()}
            </p>
          </Link>
          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            className="w-5 cursor-pointer sm:hidden"
          />
        </div>

        {/* Sidebar for small screens */}
        <div
          className={`fixed top-0 left-0 bottom-0 bg-white z-50 transition-transform duration-300 transform ${
            visible ? "translate-x-0" : "translate-x-full"
          } w-full h-full`}
        >
          <div className="flex flex-col text-gray-600 h-full">
            {/* Close button */}
            <div
              onClick={() => setVisible(false)}
              className="flex items-center gap-4 p-3 cursor-pointer"
            >
              <img
                src={assets.dropdown_icon}
                className="h-4 rotate-180"
                alt="Back"
              />
              <p>Back</p>
            </div>

            {/* Navigation Links */}
            <NavLink
              to="/"
              className="pl-6 py-2 border-b"
              onClick={() => setVisible(false)}
            >
              <p>HOME</p>
            </NavLink>
            <NavLink
              to="/collection"
              className="pl-6 py-2 border-b"
              onClick={() => setVisible(false)}
            >
              <p>COLLECTION</p>
            </NavLink>

            {/* Additional Links */}
            <NavLink
              to="/orders"
              className="pl-6 py-2 border-b"
              onClick={() => setVisible(false)}
            >
              <p>ORDERS</p>
            </NavLink>
            <NavLink
              to="/cart"
              className="pl-6 py-2 border-b"
              onClick={() => setVisible(false)}
            >
              <p>CART</p>
            </NavLink>
            {loggedIn && (
              <p
                onClick={handleLogout}
                className="pl-6 py-2 cursor-pointer hover:text-black border-b"
              >
                Logout
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
