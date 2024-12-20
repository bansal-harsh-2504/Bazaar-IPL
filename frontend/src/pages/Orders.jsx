import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import toast from "react-hot-toast";
import ChangeTeam from "./ChangeTeam";

const Orders = () => {
  const { currency, token, backendUrl, isModalOpen2, handleCloseModal2 } =
    useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }
      const res = await axios.get(backendUrl + "api/order/userOrders", {
        headers: { token },
      });

      if (res.data.success) {
        let allOrderItems = [];
        res.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrderItems.push(item);
          });
        });
        setOrderData(allOrderItems.reverse());
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="pt-16 min-h-[45vh]">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      {orderData.length != 0 ? (
        <div>
          {orderData.map((item, idx) => (
            <div
              key={idx}
              className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex items-start gap-6 text-sm">
                <img src={item.image[0]} className="w-16 sm:w-20" />
                <div>
                  <p className="sm:text-base font-medium">{item.name}</p>
                  <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                    <p>
                      {currency}
                      {item.price}
                    </p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p>
                    Date:{" "}
                    <span className="text-gray-400">
                      {new Date(item.date).toLocaleDateString()}
                    </span>{" "}
                    Payment:{" "}
                    <span className="text-gray-400">{item.paymentMethod}</span>
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between">
                <div className="flex item-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="text-sm md:text-base">{item.status}</p>
                </div>
                <button
                  onClick={loadOrderData}
                  className="border px-4 py-2 text-sm font-medium rounded-sm"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center">
          <p className="text-gray-700 text-lg font-medium">No orders found</p>
        </div>
      )}
      <ChangeTeam isOpen={isModalOpen2} onClose={handleCloseModal2} />
    </div>
  );
};

export default Orders;
