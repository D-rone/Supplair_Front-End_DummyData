import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faAddressBook,
  faEnvelope,
  faPhone,
  faTrademark,
  faTimes,
  faDownload,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import Cookies from "universal-cookie";
import { ScaleLoader } from "react-spinners";
import { toast } from "react-toastify";

function SuperAdminAccounts() {
  const [showAccountsMenu, setShowAccountsMenu] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showTableHeaders, setShowTableHeaders] = useState(true);
  const [updatedData, setUpdatedData] = useState([]);
  const [data, setData] = useState([]);
  const [companyDetails, setCompanyDetails] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState({
    data: [],
    showCategoryMenu: false,
  });

  const categories = [
    "FRESH_PRODUCE",
    "MEAT_AND_POULTRY",
    "SEAFOOD",
    "DAIRY_AND_EGGS",
    "GRAINS_AND_BAKERY",
    "CANNED_AND_PACKAGED_GOODS",
    "BEVERAGES",
    "FROZEN_FOODS",
    "SNACKS_AND_CONFECTIONERY",
    "ORGANIC_AND_SPECIALTY_FOODS",
    "ETHNIC_FOODS",
    "HEALTH_AND_WELLNESS",
    "BULK_AND_WHOLESALE",
    "GOURMET_AND_SPECIALTY",
    "FOOD_SERVICE_EQUIPMENT_AND_SUPPLIES",
  ];

  const companiesList = [
    {
      key: "0",
      companyName: "SolidEx",
      contact: "(+213)41 36 32 02",
      state: "ACTIVE",
    },
    {
      key: "1",
      companyName: "TechCorp",
      contact: "(+213)41 36 32 03",
      state: "INACTIVE",
    },
    {
      key: "2",
      companyName: "Innovatech",
      contact: "(+213)41 36 32 04",
      state: "BLOCKED",
    },
    {
      key: "3",
      companyName: "Green Solutions",
      contact: "(+213)41 36 32 05",
      state: "ACTIVE",
    },
    {
      key: "4",
      companyName: "FutureWorks",
      contact: "(+213)41 36 32 06",
      state: "INACTIVE",
    },
    {
      key: "5",
      companyName: "EcoBuild",
      contact: "(+213)41 36 32 07",
      state: "BLOCKED",
    },
    {
      key: "6",
      companyName: "DataStream",
      contact: "(+213)41 36 32 08",
      state: "ACTIVE",
    },
    {
      key: "7",
      companyName: "NextGen",
      contact: "(+213)41 36 32 09",
      state: "INACTIVE",
    },
    {
      key: "8",
      companyName: "AlphaTech",
      contact: "(+213)41 36 32 10",
      state: "BLOCKED",
    },
    {
      key: "9",
      companyName: "QuantumLeap",
      contact: "(+213)41 36 32 11",
      state: "ACTIVE",
    },
    {
      key: "10",
      companyName: "SkyNet",
      contact: "(+213)41 36 32 12",
      state: "INACTIVE",
    },
    {
      key: "11",
      companyName: "Cyberdyne",
      contact: "(+213)41 36 32 13",
      state: "BLOCKED",
    },
    {
      key: "12",
      companyName: "NanoTech",
      contact: "(+213)41 36 32 14",
      state: "ACTIVE",
    },
    {
      key: "13",
      companyName: "BioGen",
      contact: "(+213)41 36 32 15",
      state: "INACTIVE",
    },
    {
      key: "14",
      companyName: "AstroDynamics",
      contact: "(+213)41 36 32 16",
      state: "BLOCKED",
    },
  ];
  useEffect(() => {
    setUpdatedData(companiesList);
    setData(companiesList);
  }, []);

  const toggleAccountsMenu = () => {
    setShowAccountsMenu(!showAccountsMenu);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setShowAccountsMenu(false);
    if (filter == "Active") {
      setUpdatedData(data.filter((item) => item.state === "ACTIVE"));
    } else if (filter == "Inactive") {
      setUpdatedData(data.filter((item) => item.state === "INACTIVE"));
    } else if (filter == "Blocked") {
      setUpdatedData(data.filter((item) => item.state === "BLOCKED"));
    } else {
      setUpdatedData(data);
    }
  };

  const handleEditClick = (company) => {
    setSelectedCompany(company);
    setShowSidebar(true);
  };

  const handleCompanyNameClick = async (company) => {
    setCompanyDetails({
      name: "Solidex",
      email: "contact@solidex.com",
      number: "(+213)669 29 19 46",
      address: "25 Rue Baghdadi Mohamed",
      fileUrls: [],
      stateType: "ACTIVE",
      categories: ["FRESH_PRODUCE", "DAIRY_AND_EGGS", "FROZEN_FOODS"],
    });
    setSelectedCategories({
      data: ["FRESH_PRODUCE", "DAIRY_AND_EGGS", "FROZEN_FOODS"],
      showCategoryMenu: false,
    });

    setSelectedCompany(company);
    setShowSidebar(true);
    setShowTableHeaders(false);
  };

  const handleSaveChanges = (updatedCompany) => {
    const updatedDataArray = updatedData.map((company) =>
      company.key === updatedCompany.key ? updatedCompany : company
    );
    setShowSidebar(false);
  };

  const Sidebar = ({ selectedCompany, onSaveChanges }) => {
    const [state, setState] = useState("");
    const [category, setCategory] = useState("");
    const [showStateMenu, setShowStateMenu] = useState(false);
    const [sidebarHeight, setSidebarHeight] = useState(0);

    useEffect(() => {
      const sidebarElement = document.getElementById("sidebar");
      if (sidebarElement) {
        setSidebarHeight(sidebarElement.offsetHeight);
      }
    }, []);

    useEffect(() => {
      if (selectedCompany) {
        setState(companyDetails.stateType);
      }
    }, [selectedCompany]);

    const handleStateChange = (selectedState) => {
      setState(selectedState);
      setShowStateMenu(false);
    };

    const toggleCategoryMenu = () => {
      setSelectedCategories({
        data: selectedCategories.data,
        showCategoryMenu: !selectedCategories.showCategoryMenu,
      });
    };

    const handleCategorySelect = (cat) => {
      console.log(selectedCategories.data);
      if (selectedCategories.data.includes(cat)) {
        setSelectedCategories({
          data: selectedCategories.data.filter((c) => c !== cat),
          showCategoryMenu: selectedCategories.showCategoryMenu,
        });
      } else {
        setSelectedCategories({
          data: [...selectedCategories.data, cat],
          showCategoryMenu: selectedCategories.showCategoryMenu,
        });
      }
    };

    const toggleStateMenu = () => {
      setShowStateMenu(!showStateMenu);
    };

    const handleSaveChanges = async () => {
      const updatedCompany = {
        ...selectedCompany,
        state: state,
      };
      if (selectedCategories.data.length === 0) {
        toast.error("You does not select any category", { autoClose: false });
        return;
      }
      toast.dismiss();
      setLoaded(true);

      setTimeout(() => {
        toast.success("Company Updated");
        setLoaded(false);
      }, 1000);

      setUpdatedData(companiesList);
      setData(companiesList);
      onSaveChanges(updatedCompany);
    };

    return (
      <div
        style={{ position: "relative" }}
        className="h-full"
      >
        <div
          id="sidebar"
          className="fixed top-0 right-0 h-full w-[60%] bg-white shadow-lg p-6 flex flex-col overflow-auto p-20"
        >
          <div className="flex justify-between items-center mt-10 mb-4">
            <p className="text-2xl font-bold mb-3">{selectedCompany?.companyName}</p>
            <button
              className="text-supplair-primary hover:text-supplair-primary-darker"
              onClick={() => setShowSidebar(false)}
            >
              <FontAwesomeIcon
                icon={faTimes}
                className="h-6 w-6"
              />
            </button>
          </div>
          <div className="mb-4 flex items-center">
            <span className=" text-supplair-primary px-2 py-1 rounded-md mr-2">email</span>
            <span>{companyDetails.email}</span>
          </div>
          <div className="mb-4 flex items-center">
            <span className="text-supplair-primary px-2 py-1 rounded-md mr-2">phone</span>
            <span>{companyDetails.number}</span>
          </div>
          <div className="mb-4 flex items-center">
            <span className="text-supplair-primary px-2 py-1 rounded-md mr-2">address</span>
            <span>{companyDetails.address}</span>
          </div>
          <div className="mb-4 flex flex-col">
            <span className="text-supplair-primary px-2 py-1 rounded-md mr-2">
              trade registries:
            </span>
            {companyDetails.fileUrls.map((filepath, i) => (
              <div className="px-10 py-2">
                <span>Trade Registry {i}</span>
                <a
                  key={i}
                  href={filepath}
                  target="_blank"
                >
                  <FontAwesomeIcon
                    size="lg"
                    icon={faDownload}
                    className="text-supplair-primary ml-2 cursor-pointer"
                  />
                </a>
              </div>
            ))}
          </div>
          <div className="mb-8 flex flex-col relative">
            <div className="mb-1">
              <span className="text-supplair-primary">Select Categories</span>
            </div>
            <div className="relative inline-block text-left w-full">
              <div>
                <button
                  type="button"
                  className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-supplair-primary"
                  id="categories-menu"
                  aria-haspopup="true"
                  aria-expanded={selectedCategories.showCategoryMenu}
                  onClick={toggleCategoryMenu}
                >
                  {selectedCategories.length > 0
                    ? `${selectedCategories.length} selected`
                    : "Select Categories"}
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="-mr-1 ml-2 h-5 w-5"
                  />
                </button>
              </div>
              {selectedCategories.showCategoryMenu && (
                <div className="absolute z-10 right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="categories-menu"
                    style={{ height: "150px", overflow: "scroll" }}
                  >
                    {categories.map((category) => (
                      <label
                        key={category}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      >
                        <input
                          type="checkbox"
                          className="mr-2 leading-tight"
                          checked={selectedCategories.data.includes(category)}
                          onChange={() => handleCategorySelect(category)}
                        />
                        <span className="ml-2">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex-shrink-0 mb-4">
            <div className="mb-1">
              <span className="text-supplair-primary">Select state</span>
            </div>
            <div className="relative inline-block text-left w-full">
              <div>
                <button
                  type="button"
                  className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-supplair-primary"
                  id="state-menu"
                  aria-haspopup="true"
                  aria-expanded={showStateMenu}
                  onClick={toggleStateMenu}
                >
                  {state || "inactive"}
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="-mr-1 ml-2 h-5 w-5"
                  />
                </button>
              </div>
              {showStateMenu && (
                <div className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="state-menu"
                  >
                    {/* Radio button options */}
                    <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                      <input
                        type="radio"
                        className="mr-2 leading-tight"
                        checked={state === "ACTIVE"}
                        onChange={() => handleStateChange("ACTIVE")}
                      />
                      <span className="ml-2">active</span>
                    </label>
                    <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                      <input
                        type="radio"
                        className="mr-2 leading-tight"
                        checked={state === "INACTIVE"}
                        onChange={() => handleStateChange("INACTIVE")}
                      />
                      <span className="ml-2">inactive</span>
                    </label>
                    <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                      <input
                        type="radio"
                        className="mr-2 leading-tight"
                        checked={state === "BLOCKER"}
                        onChange={() => handleStateChange("BLOCKED")}
                      />
                      <span className="ml-2">blocked</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            className="bg-supplair-primary text-white px-4 py-2 rounded"
            onClick={handleSaveChanges}
          >
            Save
          </button>
          {loaded ? (
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)", // Corrected
              }}
            >
              <ScaleLoader />
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <div className="absolute top-8 left-0 right-0 mx-auto w-[95%]">
      <div className="flex items-center justify-between">
        <div className="flex items-center relative">
          <h2 className="text-2xl font-bold mr-2">All Accounts</h2>
          <button
            className="p-2 rounded-md text-supplair-primary"
            onClick={toggleAccountsMenu}
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {showAccountsMenu && (
            <div className="absolute top-10 left-0 bg-white shadow-lg rounded-md p-2 w-48">
              <div
                className="px-4 py-2 hover:bg-supplair-primary hover:text-white rounded-md cursor-pointer"
                onClick={() => handleFilterChange("All")}
              >
                All
              </div>
              <div
                className="px-4 py-2 hover:bg-supplair-primary hover:text-white rounded-md cursor-pointer"
                onClick={() => handleFilterChange("Active")}
              >
                Active
              </div>
              <div
                className="px-4 py-2 hover:bg-supplair-primary hover:text-white rounded-md cursor-pointer"
                onClick={() => handleFilterChange("Inactive")}
              >
                Inactive
              </div>
              <div
                className="px-4 py-2 hover:bg-supplair-primary hover:text-white rounded-md cursor-pointer"
                onClick={() => handleFilterChange("Blocked")}
              >
                Blocked
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-full mt-8">
        <table className="w-full border-separate border-spacing-y-1">
          {!showSidebar && (
            <thead>
              <tr>
                <th className="text-left text-gray-500 py-2 border-b-2 border-gray-300">
                  Company Name
                </th>
                <th className="text-left text-gray-500 py-2 border-b-2 border-gray-300">Contact</th>
                <th className="text-left text-gray-500 py-2 border-b-2 border-gray-300">State</th>
                <th className="text-center text-gray-500 py-2 border-b-2 border-gray-300">Edit</th>
              </tr>
            </thead>
          )}
          <tbody>
            {updatedData.map((data, index) => (
              <tr
                key={index}
                className={`${
                  selectedCompany?.key === data.key && showSidebar ? "bg-gray-200" : "bg-white"
                }`}
              >
                <td
                  className={`text-left py-2 border-b border-gray-300 text-supplair-primary font-semibold cursor-pointer ${
                    selectedCompany?.key === data.key && showSidebar ? "bg-gray-200" : "bg-white"
                  }`}
                  onClick={() => handleCompanyNameClick(data)}
                >
                  {data.companyName}
                </td>
                <td
                  className={`text-left py-2 border-b border-gray-300 ${
                    selectedCompany?.key === data.key && showSidebar ? "bg-gray-200" : "bg-white"
                  }`}
                >
                  {data.contact}
                </td>
                <td
                  className={`text-left py-2 border-b border-gray-300 ${
                    selectedCompany?.key === data.key && showSidebar ? "bg-gray-200" : "bg-white"
                  }`}
                >
                  {data.state}
                </td>
                <td
                  className={`py-2 text-center border-b border-gray-300 ${
                    selectedCompany?.key === data.key && showSidebar ? "bg-gray-200" : "bg-white"
                  }`}
                >
                  <button
                    className="focus:outline-none"
                    onClick={() => handleCompanyNameClick(data)}
                  >
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className="text-supplair-primary cursor-pointer"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showSidebar && (
        <div className="fixed top-0 right-0 h-screen bg-white shadow-lg flex flex-col">
          <Sidebar
            selectedCompany={selectedCompany}
            onSaveChanges={handleSaveChanges}
          />
        </div>
      )}
    </div>
  );
}
export default SuperAdminAccounts;
