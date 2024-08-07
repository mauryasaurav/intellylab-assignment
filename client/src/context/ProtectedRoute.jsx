import { Box } from "@chakra-ui/react";
import * as React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AppContext from "./AppContext";
import { destroyToken, handlerErrors } from "../constants/helpers";
import useToastHook from "../components/Common/Toast"
import useApi from "../hooks/useApi";
const authRoute = new RegExp(
  "\\blogin\\b\\bregister\\b"
);

export const ProtectedRoute = ({ children }) => {
  const { setLoggedInUser } = React.useContext(AppContext);
  const location = useLocation();
  const toast = useToastHook();

  const navigate = useNavigate();

  const handleRedirection = async (user) => {
    if (!user.success) {
      destroyToken(navigate)
      toast("Something went wrong! Please try again in sometime.");
    }

    setLoggedInUser(user);
    if (authRoute.test(location.pathname)) {
      navigate(`/dashboard`);
    }
  };

  const redirectToLogin = (user) => {
    if (user.status === 401) {
      localStorage.removeItem("token");
      navigate("/login");
    }

    if (authRoute.test(location.pathname)) {
      navigate(location.pathname || "/login");
    } else {
      navigate("/login");
    }
  };

  const { data, error, loading, callApi } = useApi();
  if (!!data) {
    handleRedirection(data)
  }

  if (!!error) toast(handlerErrors(error), "error")

  React.useEffect(() => {
    callApi({
      url: '/api/user/user_auth',
      method: 'GET',
    });
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Box> Loading... </Box>;
  }

  return <React.Fragment>{children ?? <Outlet />}</React.Fragment>;
};
