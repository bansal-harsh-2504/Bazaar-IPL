import { Routes, Route } from "react-router-dom";
import {
  Home,
  Collection,
  Cart,
  Login,
  Orders,
  PlaceOrder,
  Product,
} from "./pages/export";
import { Navbar } from "./components/export";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { Toaster } from "react-hot-toast";
import Verify from "./pages/Verify";

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-[78px] px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <SearchBar />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/collection"} element={<Collection />} />
          <Route path={"/product/:productId"} element={<Product />} />
          <Route path={"/cart"} element={<Cart />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/place-order"} element={<PlaceOrder />} />
          <Route path={"/orders"} element={<Orders />} />
          <Route path={"/verify"} element={<Verify />} />
        </Routes>
        <Footer />
        <Toaster position="bottom-right" />
      </div>
    </div>
  );
};

export default App;
