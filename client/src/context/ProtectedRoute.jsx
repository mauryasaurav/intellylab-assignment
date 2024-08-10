import * as React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { destroyToken } from "../utils/helpers";
import useApi from "../hooks/useApi";
import AppContext from "./AppContext";

export const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setLoggedInUser } = React.useContext(AppContext);

  const { data, callApi } = useApi();
  React.useEffect(() => {
    (async () =>
      await callApi({
        url: '/api/user/check_auth',
        method: 'GET'
      })
    )()
  }, [])


  React.useEffect(() => {
    if (data) setLoggedInUser(data.data)
    if (!localStorage.getItem("token")) {
      destroyToken(navigate)
    } else {
      navigate(location.pathname);
    }
  }, [data])

  return <React.Fragment>{children ?? <Outlet />}</React.Fragment>;
};
