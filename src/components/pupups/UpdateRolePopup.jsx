import React, { useReducer, useState } from "react";
import PopUp1 from "./PopUp16";
import { toast } from "react-toastify";
import { useUserContext } from "../../pages/HomePage";

function UpdateRolePopup({ role, close, setUpdate }) {
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
      } else {
        toast.success("Role added");
      }
      try {
        setUpdate(false);
      } catch (error) {
        console.error("Error:", error);
      }
      close(null);
    }
  };

  const [updated, setUpdated] = useState(false);
  const updateReducer = (state, newValue) => {
    setUpdated(true);
    return newValue;
  };

  const [name, setName] = useState(role.roleName);
  const [rights, setRights] = useReducer(updateReducer, role.permissions);
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
                  checked={rights.includes("HOME")}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="HOME">Home</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  value="INVENTORY"
                  className="mx-4 my-2 size-4 hover:cursor-pointer"
                  checked={rights.includes("INVENTORY")}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="INVENTORY">Inventory</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  value="SALES"
                  className="mx-4 my-2 size-4 hover:cursor-pointer"
                  checked={rights.includes("SALES")}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="SALES">Sales</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  value="ANNOUNCEMENT"
                  className="mx-4 my-2 size-4 hover:cursor-pointer"
                  checked={rights.includes("ANNOUNCEMENT")}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="ANNOUNCEMENT">Announcements</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  value="USERS"
                  className="mx-4 my-2 size-4 hover:cursor-pointer"
                  checked={rights.includes("USERS")}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="USERS">Users & Roles</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  value="BILLING"
                  className="mx-4 my-2 size-4 hover:cursor-pointer"
                  checked={rights.includes("BILLING")}
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

export default UpdateRolePopup;
