import React, { useEffect, useState } from "react";
import CompanyProfile from "./CompanyProfile";
import UserProfile from "./UserProfile";
import { useUserContext } from "../../pages/HomePage";
import { toast } from "react-toastify";

function Profile() {
  const { userData, setUserData } = useUserContext();
  const { reload, setReload } = useState(false);
  const [updatedData, setUpdatedData] = useState({});

  useEffect(() => {
    console.log(updatedData);
  }, [updatedData]);

  const hundleSave = async (e) => {
    e.preventDefault();
    toast.success("User Details Updated");
  };

  return (
    <div
      className="flex flex-col w-full h-full"
      style={{ paddingBottom: "200px" }}
    >
      <div className="flex items-center">
        <h1 className="flex items-center w-full h-16 mt-2 ml-10 text-xl font-bold">
          EDIT PROFILE :
        </h1>
      </div>
      <div className="flex items-center">
        <h1 className="flex items-center w-full h-16 mt-2 ml-10  font-semibold">
          Personal Profile :
        </h1>
      </div>
      <UserProfile
        userData={userData}
        setUpdatedData={setUpdatedData}
      />
      <div className="flex items-center">
        <h1 className="flex items-center w-full h-16 mt-2 ml-10  font-semibold">
          Company Profile :
        </h1>
      </div>
      <CompanyProfile
        updatedData={updatedData}
        setUserData={setUserData}
        setUpdatedData={setUpdatedData}
        hundleSave={hundleSave}
        userData={userData}
        setReload={setReload}
      />
    </div>
  );
}

export default Profile;
