import React from "react";
import Card from "./Card";

function Dashboard() {

  return (
    <div className="flex flex-col w-full">
      <h1 className="px-4 py-2 m-5 text-4xl font-bold text-gray-800 bg-white rounded-lg shadow-lg w-fit dark:shadow-2x">
        Dashboard
      </h1>

      <div className="ml-5 ">
        <h1 className="px-4 py-2 mb-3 text-2xl font-bold text-gray-800 bg-white rounded-lg shadow-lg w-fit dark:shadow-2x">
          Orders
        </h1>
        <div className="flex flex-wrap justify-center">
          <Card
            number={"298"}
            title="Total Orders"
          />
          <Card
            number={"07"}
            title="New Orders"
          />
          {/* <Card number={34} title="Orders per Month" /> */}
          <Card
            number={"37"}
            title="Not Delivered"
          />
        </div>
      </div>

      <div className="ml-5 ">
        <h1 className="px-4 py-2 m-5 mb-3 text-2xl font-bold text-gray-800 bg-white rounded-lg shadow-lg w-fit dark:shadow-2x">
          Products
        </h1>
        <div className="flex flex-wrap justify-center">
          <Card
            className="ml-5 "
            number={"03"}
            title="Products to restock"
          />
          <Card
            className="ml-5 "
            number={"175"}
            title="All products"
          />
          <Card
            className="ml-5 "
            number={"11"}
            title="Products Group "
          />
        </div>
      </div>
      <div className="py-10"></div>
    </div>
  );
}

export default Dashboard;
