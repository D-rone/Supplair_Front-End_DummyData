import React, { useEffect, useState } from "react";
import OrderDetailsModal from "./OrderDetailsModal";
import { useUserContext } from "../../../pages/HomePage";
import { supplairAPI } from "../../../utils/axios";

const OrdersTable = ({ filterOption, id }) => {
  const { userData, setUserData } = useUserContext();

  const [expandedOrder, setExpandedOrder] = useState(null);
  const [showSidebar, setShowSidebar] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [originalStatus, setOriginalStatus] = useState(null); // New state to store original status
  const [orders, setOrders] = useState([]);
  const [orderSelected, setOrderSelected] = useState([]);
  const [orderDetails, setOrderDetails] = useState({});

  useEffect(() => {
    setOrders([
      {
        delivery_date: "15/11/2023",
        order_number: "1234",
        client_name: "Mohamed",
        totalAmount: 15000,
        status: "ACCEPTED",
      },
      {
        delivery_date: "20/11/2023",
        order_number: "5678",
        client_name: "Alice",
        totalAmount: 20000,
        status: "PENDING",
      },
      {
        delivery_date: "25/11/2023",
        order_number: "9101",
        client_name: "John",
        totalAmount: 25000,
        status: "SHIPPED",
      },
      {
        delivery_date: "30/11/2023",
        order_number: "1121",
        client_name: "Emma",
        totalAmount: 30000,
        status: "DELIVERED",
      },
      {
        delivery_date: "05/12/2023",
        order_number: "3141",
        client_name: "Liam",
        totalAmount: 35000,
        status: "CANCELLED",
      },
      {
        delivery_date: "10/12/2023",
        order_number: "5161",
        client_name: "Olivia",
        totalAmount: 40000,
        status: "ACCEPTED",
      },
      {
        delivery_date: "15/12/2023",
        order_number: "7181",
        client_name: "Noah",
        totalAmount: 45000,
        status: "PENDING",
      },
      {
        delivery_date: "20/12/2023",
        order_number: "9202",
        client_name: "Sophia",
        totalAmount: 50000,
        status: "SHIPPED",
      },
      {
        delivery_date: "25/12/2023",
        order_number: "1222",
        client_name: "Mason",
        totalAmount: 55000,
        status: "DELIVERED",
      },
      {
        delivery_date: "30/12/2023",
        order_number: "3242",
        client_name: "Isabella",
        totalAmount: 60000,
        status: "CANCELLED",
      },
    ]);
  }, []);

  useEffect(() => {
    if (selectedOrder) {
      setOrderDetails({
        date: selectedOrder.delivery_date,
        orderId: "1235",
        customerName: selectedOrder.client_name,
        customerEmail: selectedOrder.client_name + "@gmail.com",
        customerAddress: "25 baghdadi Mohamed street",
        orderState: selectedOrder.status,
        productRows: [
          {
            product_name: "Product 11",
            qte: 50,
            product_price: 1500,
          },
          {
            product_name: "Product 2",
            qte: 10,
            product_price: 500,
          },
          {
            product_name: "Product 5",
            qte: 7,
            product_price: 15000,
          },
          {
            product_name: "Product 1",
            qte: 1,
            product_price: 30000,
          },
        ],
        totalAmount: selectedOrder.totalAmount,
        payedAmount: Math.ceil(selectedOrder.totalAmount - selectedOrder.totalAmount * 0.6),
      });
    }
  }, [selectedOrder]);

  const toggleSidebar = async (orderId) => {
    try {
      setOrderDetails({
        date: "12/07/2023",
        orderId: "1235",
        customerName: "Mohamed",
        customerEmail: "mohamed@gmail.com",
        customerAddress: "25 baghdadi Mohamed street",
        orderState: "Shipped",
        productRows: [
          {
            product_name: "Product 11",
            qte: 50,
            product_price: 1500,
          },
          {
            product_name: "Product 2",
            qte: 10,
            product_price: 500,
          },
          {
            product_name: "Product 5",
            qte: 7,
            product_price: 15000,
          },
          {
            product_name: "Product 1",
            qte: 1,
            product_price: 30000,
          },
        ],
        totalAmount: 12000,
        payedAmount: 5000,
      });
    } catch (error) {
      console.error("Error:", error);
    }

    if (orderId === expandedOrder) {
      setExpandedOrder(null);
      setSelectedOrder(null);
      setShowSidebar(false);
    } else {
      setExpandedOrder(orderId);
      const selectedOrder = orders.find((order) => order.order_number === orderId);
      setSelectedOrder(selectedOrder);
      setOriginalStatus(selectedOrder.status); // Set original status
      setShowSidebar(true);
    }
  };

  const filteredOrders =
    filterOption === "ALL" ? orders : orders.filter((order) => order.status === filterOption);

  const handleCloseSidebar = () => {
    setExpandedOrder(null);
    setSelectedOrder(null);
    setShowSidebar(false);
  };

  const handleNavigateOrder = (orderId) => {
    const selectedOrder = orders.find((order) => order.order_number === orderId);
    setSelectedOrder(selectedOrder);
    setOriginalStatus(selectedOrder.status); // Set original status when navigating
  };

  const updateOrderStatus = (orderId, newStatus, deliveryDate) => {
    // Find the index of the order in the orders array
    const index = orders.findIndex((order) => order.order_number === orderId);
    if (index !== -1) {
      // Update the status of the order in the orders array
      orders[index].status = newStatus;
      orders[index].delivery_date = deliveryDate;
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex">
        <div className="flex w-full transition-all duration-300">
          <div className={`${showSidebar ? "w-1/4" : "w-full"}`}>
            <table className="w-full divide-y divide-gray-200 border border-gray-200 border-2 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  {!showSidebar && (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Delivery Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Reference#
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Client Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3"></th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <React.Fragment key={order.order_number}>
                    {showSidebar ? (
                      <tr
                        className={`${
                          selectedOrder?.order_number === order.order_number
                            ? "bg-gray-200 cursor-pointer"
                            : "cursor-pointer"
                        }`}
                        onClick={() => handleNavigateOrder(order.order_number)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap font-semibold text-lg">
                          {order.client_name}
                          <span className="text-supplair-primary block font-semibold ">
                            {" "}
                            (#{order.order_number})
                          </span>
                        </td>
                      </tr>
                    ) : (
                      <tr className={expandedOrder === order.order_number ? "bg-gray-100" : ""}>
                        <td className="px-6 py-4 whitespace-nowrap font-semibold">
                          {order.delivery_date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-semibold">
                          {order.order_number}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-semibold">
                          {order.client_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-semibold">
                          {order.totalAmount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-semibold">
                          {order.status}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end items-center">
                          <button
                            className="bg-supplair-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
                            onClick={() => toggleSidebar(order.order_number)}
                          >
                            Show Details
                          </button>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <div
            className={`${
              showSidebar ? "w-3/4" : "w-0"
            } bg-white transition-all duration-300 overflow-hidden`}
          >
            {showSidebar && selectedOrder && (
              <OrderDetailsModal
                order={selectedOrder}
                orderDetails={orderDetails}
                onClose={handleCloseSidebar}
                originalStatus={originalStatus}
                updateOrderStatus={updateOrderStatus} // Pass the function to update status
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;
