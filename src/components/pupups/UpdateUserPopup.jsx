import React, { useEffect, useReducer, useState } from "react";
import PopUp1 from "./PopUp16";
import { toast } from "react-toastify";

function UpdateUserPopup({ user, close, reload, setReload, setShowDetails }) {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    setRoles([
      { roleName: "Role 1", permissions: ["Inventory", "Sales", "Billing"] },
      { roleName: "Role 2", permissions: ["Inventory"] },
      { roleName: "Role 3", permissions: ["Billing"] },
      { roleName: "Role 4", permissions: ["Announcements"] },
      { roleName: "Role 5", permissions: ["Users & Roles"] },
    ]);
  }, []);

  let closePopup = (e) => {
    if (!updated) close(null);
    else if (confirm("Are you sure you want to cancel ?")) close(null);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    if (updated) {
      toast.success("User Updated");
      setReload(!reload);

      close(null);
    }
  };

  const [updated, setUpdated] = useState(false);
  const updateReducer = (state, newValue) => {
    setUpdated(true);
    return newValue;
  };

  const [role, setRole] = useReducer(updateReducer, user.roleName);
  const [active, setActive] = useReducer(updateReducer, user.stateType);

  return (
    <PopUp1
      closeMe={closePopup}
      title="Update User"
    >
      <div className="p-4">
        <form onSubmit={handleUpdateUser}>
          <div className="flex flex-col gap-1 mb-6 text-sm font-semibold">
            <span>Email :</span>
            <input
              type="text"
              readOnly
              value={user.email}
              className="w-full h-10 px-6 border-2 border-gray-400 rounded-lg focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1 mb-6 text-sm font-semibold">
            <span>User Name :</span>
            <input
              type="text"
              required
              value={user.fullname}
              readOnly
              className="w-full h-10 px-6 border-2 border-gray-400 rounded-lg focus:outline-supplair-primary"
            />
          </div>
          <div className="flex flex-col gap-1 mb-6 text-sm font-semibold">
            <span>User Role :</span>
            <select
              type="text"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full h-10 px-6 border-2 border-gray-400 rounded-lg focus:outline-supplair-primary"
            >
              {roles.map((role) => (
                <option
                  value={role.roleName}
                  key={role.roleName}
                >
                  {role.roleName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1 mb-6 text-sm font-semibold">
            <span>User Status :</span>
            <select
              type="text"
              required
              value={active}
              onChange={(e) => setActive(e.target.value)}
              className="w-full h-10 px-6 border-2 border-gray-400 rounded-lg focus:outline-supplair-primary"
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
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
              value="Update"
              className={`${updated ? `hover:cursor-pointer approveBtn` : "cancelBtn"} `}
            />
          </div>
        </form>
      </div>
    </PopUp1>
  );
}

export default UpdateUserPopup;
