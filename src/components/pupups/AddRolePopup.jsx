import React, { useEffect, useReducer, useState } from "react";
import PopUp1 from "./PopUp16";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { useUserContext } from "../../pages/HomePage";

function AddRolePopup({ close, setUpdate }) {
  const cookies = new Cookies();
  const storedAccessToken = cookies.get("access_token");
  const formData = new FormData();
  const { userData, setUserData } = useUserContext();
  let closePopup = (e) => {
    if (!updated) close(null);
    else if (confirm("Are you sure you want to cancel ?")) close(null);
  };

  const handleAddRole = async (e) => {
    e.preventDefault();

    if (updated) {
      if (name.trim().length < 3) {
        toast.error("Invalid Role Name");
        return;
      }
      if (rights.length == 0) {
        toast.error("Rights must be not empty");
        return;
      }
      try {
        setTimeout(() => {
          toast.success("Role added");
          setUpdateGet((prev) => !prev);
          onClose(false);
        }, 1000);
      } catch (error) {
        if (error.response) {
          console.error("Server Error:", error.response.data);
          console.error("Status Code:", error.response.status);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error:", error.message);
        }
        toast.error(error.response.data, { autoClose: false });
        return;
      }

      setUpdate(false);
      close(null);
    }
  };

  const [updated, setUpdated] = useState(false);
  const updateReducer = (state, newValue) => {
    setUpdated(true);
    return newValue;
  };

  const [name, setName] = useReducer(updateReducer, "");
  const [rights, setRights] = useReducer(updateReducer, []);
  const handleCheckboxChange = (e) => {
    const right = e.target.value;
    const isChecked = e.target.checked;

    setUpdated(true);

    if (isChecked) {
      setRights([...rights, right]);
    } else {
      setRights(rights.filter((r) => r !== right));
    }
  };

  return (
    <PopUp1
      closeMe={closePopup}
      title="Add Role"
    >
      <div className="p-4">
        <form onSubmit={handleAddRole}>
          <div className="flex flex-col gap-1 mb-6 text-sm font-semibold">
            <span>Role Name :</span>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-10 px-6 border-2 border-gray-400 rounded-lg focus:outline-supplair-primary"
            />
          </div>
          <div className="flex flex-col gap-1 mb-6 text-sm font-semibold">
            <span>Access Rights :</span>
            <div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  value="HOME"
                  className="mx-4 my-2 size-4 hover:cursor-pointer"
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="HOME">Home</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  value="INVENTORY"
                  className="mx-4 my-2 size-4 hover:cursor-pointer"
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="INVENTORY">Inventory</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  value="SALES"
                  className="mx-4 my-2 size-4 hover:cursor-pointer"
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="SALES">Sales</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  value="ANNOUNCEMENT"
                  className="mx-4 my-2 size-4 hover:cursor-pointer"
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="ANNOUNCEMENT">Announcements</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  value="USERS"
                  className="mx-4 my-2 size-4 hover:cursor-pointer"
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="USERS">Users & Roles</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  value="BILLING"
                  className="mx-4 my-2 size-4 hover:cursor-pointer"
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="BILLING">Billing</label>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-5">
            <button
              onClick={closePopup}
              className="cancelBtn"
              type="button"
            >
              Cancel
            </button>
            <input
              type="submit"
              value="Save"
              className={`${updated ? `hover:cursor-pointer approveBtn` : "cancelBtn"} `}
            />
          </div>
        </form>
      </div>
    </PopUp1>
  );
}

export default AddRolePopup;
