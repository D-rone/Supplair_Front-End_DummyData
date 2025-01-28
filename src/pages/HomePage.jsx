import React, { createContext, useContext, useEffect, useState } from "react";
import TopBar from "../components/home/TopBar";
import SideBar from "../components/home/SideBar";
import HomeBody from "../components/home/HomeBody";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import dummyData from "./userData.json";

const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);

function HomePage() {
  const navigate = useNavigate();
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [reload, setReload] = useState(false);

  const cookies = new Cookies();
  const storedAccessToken = cookies.get("access_token");

  console.log(storedAccessToken)
  if (!storedAccessToken) {
    navigate("/login");
  }

  useEffect(() => {
    setLoaded(true);
    setUserData(dummyData[storedAccessToken]);
  }, []);
  useEffect(() => {
    setLoaded(true);
    setUserData(dummyData[storedAccessToken]);
  }, [reload]);

  let closeProfilePopUp = () => {
    setProfileDropdown((old) => {
      if (old) return false;
    });
  };

  return (
    <div>
      {loaded ? (
        <UserContext.Provider value={{ userData, setUserData, reload, setReload }}>
          <TopBar
            profileDropdown={profileDropdown}
            setProfileDropdown={setProfileDropdown}
          />

          {/* Top Bar Spacer */}
          <div className="h-14"></div>
          <div
            className="relative flex font-raleway"
            onClick={closeProfilePopUp}
          >
            <SideBar />
            <HomeBody
              closeProfilePopUp={closeProfilePopUp}
              setLoaded={setLoaded}
            />
          </div>
        </UserContext.Provider>
      ) : (
        <></>
      )}
    </div>
  );
}

export default HomePage;
