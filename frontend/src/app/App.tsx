import { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode'

import Login from "../login/Login";
import Messages from "../messages/Messages";
import ProtectedMessages from "../messages/ProtectedMessages";
import Home from "../home/Home"


import { CustomJwtPayload } from "../entities/CustomJwtPayload";

import { getAuthToken, getLogin } from "../services/BackendService";
import LayoutPage from "src/layout/LayoutPage";
import LandingPage from "src/landingPage/LandingPage";

export function App() {

  let token = getAuthToken();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {

    if (token !== null) {
        setIsAuthenticated(true);
        const decoded = jwtDecode<CustomJwtPayload>(token);
        console.log(decoded);
        if (decoded.role == "ADMIN") {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    } else {
        setIsAuthenticated(false);
    }

  }, []);


  return (
      <div>
        {!isAuthenticated && <LandingPage></LandingPage>}
        {isAuthenticated && <Home></Home>}
      </div>
  );
}

export default App;
