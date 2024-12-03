import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import ChangeTeam from "./ChangeTeam";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, isModalOpen2, handleCloseModal2 } =
    useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("S");
  const [windowDimension, setWindowDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const fetchProductData = async () => {
    if (!products || products.length === 0) return;
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return;
      }
    });
  };

  const detectSize = () => {
    setWindowDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimension]);

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  if (!productData) {
    return <div className="text-center py-10">Loading product details...</div>;
  }

  return productId ? (
    <div className="pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData?.image?.map((item, idx) => (
              <img
                src={item}
                key={idx}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                onClick={() => setImage(item)}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} className="w-full h-auto" />
          </div>
        </div>

        <div className="flex-1">
          <h1 className="text-4xl font-semibold">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} className="w-3 5" />
            <img src={assets.star_icon} className="w-3 5" />
            <img src={assets.star_icon} className="w-3 5" />
            <img src={assets.star_icon} className="w-3 5" />
            <img src={assets.star_dull_icon} className="w-3 5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium mb-3">
            {currency}
            {productData.price}
          </p>
          <p className="">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p className="text-gray-400">
              Size: <span className="text-black">{size}</span>
            </p>
            <div className="flex gap-2">
              {productData?.sizes?.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setSize(item)}
                  className={`cursor-pointer border py-2 px-4 rounded-xl ${
                    item === size ? "text-white bg-[#1a1a1a]" : "bg-gray-200"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)}
            className="hover:bg-black border-2 border-black hover:text-white px-8 py-3 text-sm active:bg-gray-700 rounded-xl"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available for this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      <ChangeTeam isOpen={isModalOpen2} onClose={handleCloseModal2} />
    </div>
  ) : (
    <div className="opacity-0">
      <ChangeTeam isOpen={isModalOpen2} onClose={handleCloseModal2} />
    </div>
  );
};

export default Product;
