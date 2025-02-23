import React, { useEffect, useState } from "react";
import showMore from "../../../assets/images/more.svg";
import _defualtPic from "../../../assets/images/noProfilePic.png";
import { v4 } from "uuid";
import UpdateUserPopup from "../../pupups/UpdateUserPopup";
import InviteUserPopup from "../../pupups/InviteUserPopup";

function Users() {
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(false);
  const [updateUser, setUpdateUser] = useState(null);
  const [inviteUser, setInviteUser] = useState(false);
  const [showDetails, setShowDetails] = useState(null);

  useEffect(() => {
    const usersList = [
      {
        stateType: "ACTIVE",
        profilePic: null,
        fullname: "John Doe",
        roleName: "Role 1",
        email: "john.doe@example.com",
      },
      {
        stateType: "INACTIVE",
        profilePic: null,
        fullname: "Jane Smith",
        roleName: "Role 2",
        email: "jane.smith@example.com",
      },
      {
        stateType: "ACTIVE",
        profilePic: null,
        fullname: "Alice Johnson",
        roleName: "Role 3",
        email: "alice.johnson@example.com",
      },
      {
        stateType: "ACTIVE",
        profilePic: null,
        fullname: "Bob Brown",
        roleName: "Role 4",
        email: "bob.brown@example.com",
      },
      {
        stateType: "ACTIVE",
        profilePic: null,
        fullname: "Charlie Davis",
        roleName: "Role 5",
        email: "charlie.davis@example.com",
      },
      {
        stateType: "INACTIVE",
        profilePic: null,
        fullname: "Eve Wilson",
        roleName: "Role 6",
        email: "eve.wilson@example.com",
      },
    ];
    setAllUsers(usersList);
    setUsers(usersList);
    setShowDetails(null);
  }, [reload]);

  let getUsers = (state) => {
    if (state == "all") setUsers(allUsers);
    else if (state == "active") setUsers(allUsers.filter((u) => u.stateType == "ACTIVE"));
    else if (state == "inactive") setUsers(allUsers.filter((u) => u.stateType == "INACTIVE"));
  };

  let showUserOptions = (user) => {
    setUpdateUser(user);
  };

  let hideDetails = () => {
    setShowDetails(null);
  };

  return (
    <div onClick={hideDetails}>
      <div className="flex items-center h-16 px-8 pt-4">
        <select
          id="selectUserStatus"
          className="text-xl font-semibold hover:cursor-pointer"
          onChange={(e) => getUsers(e.target.value)}
        >
          <option value="all">All Users</option>
          <option value="active">Active Users</option>
          <option value="inactive">Inactive Users</option>
        </select>
        <div className="flex items-center justify-end w-full">
          <button
            className="self-end w-40 h-10 text-white rounded-lg bg-supplair-primary"
            onClick={() => {
              setInviteUser(true);
            }}
          >
            Invite User
          </button>
        </div>
      </div>
      <div>
        <table className="w-[96%] mx-[2%]">
          <thead className="text-gray-400 border-b-2 border-gray-300">
            <tr>
              <th className="px-6 py-4 font-normal text-start">User</th>
              <th className="font-normal">Role</th>
              <th className="font-normal">State</th>
              <th className="font-normal text-start">Contact</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                className={`border-b-2 border-gray-300 h-20 ${
                  user.stateType == "ACTIVE" ? "" : "bg-gray-200"
                }`}
                key={v4()}
              >
                <td className="p-2">
                  <img
                    src={user.profilePic || _defualtPic}
                    className="inline h-12 mx-4 border-2 rounded-full border-supplair-primary"
                  />
                  <h3 className="inline font-semibold text-supplair-primary">{user.fullname}</h3>
                </td>
                <td className="text-center">{user.roleName}</td>
                <td className="text-center">{user.stateType}</td>
                <td className="relative">
                  {user.email}
                  {showDetails == user.email ? (
                    <div className="absolute right-0 z-10 flex flex-col gap-2 p-2 bg-white rounded-lg shadow-sm -top-3 shadow-black h-fit w-fit">
                      <button
                        className="w-40 h-10 px-4 text-lg font-semibold rounded-lg hover:text-white hover:bg-supplair-primary text-start"
                        onClick={(e) => {
                          showUserOptions(user);
                        }}
                      >
                        Update
                      </button>
                    </div>
                  ) : (
                    <></>
                  )}
                </td>
                <td
                  className="hover:cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDetails(user.email);
                  }}
                >
                  <img
                    src={showMore}
                    alt=""
                    className="w-6"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {updateUser != null ? (
          <UpdateUserPopup
            user={updateUser}
            close={setUpdateUser}
            reload={reload}
            setReload={setReload}
          />
        ) : (
          <></>
        )}
        {inviteUser ? (
          <InviteUserPopup
            close={setInviteUser}
            reload={reload}
            setReload={setReload}
            setShowDetails={setShowDetails}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Users;
