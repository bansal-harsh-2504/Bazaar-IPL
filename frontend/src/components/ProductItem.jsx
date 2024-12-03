import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency, iplTeam } = useContext(ShopContext);

  return (
    <div className={`${iplTeam} card shadow-xl border-2 rounded-b-xl`}>
      <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
        <div className="overflow-hidden">
          <img
            src={image[0]}
            className="hover:scale-110 transition ease-in-out"
            alt=""
          />
        </div>
        <div className={`pl-5 pb-2`}>
          <p className="pt-3 pb-1 text-sm">{name.slice(0, 28)}...</p>
          <div className="text-sm font-medium">
            {currency}
            {price}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
