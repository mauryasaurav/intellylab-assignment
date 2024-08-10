import React, { useMemo } from "react";
import Layout from "./components/Layout/Layout";
import { AppProvider } from "./context/AppContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import { ChakraProvider } from "@chakra-ui/react";
import { ProtectedRoute } from "./context/ProtectedRoute";
import PublicRoute from "./context/PublicRoute";
import PageNotFound from "./components/Common/PageNotFound";
import Register from "./components/Auth/Register";
import UserManagement from "./components/Home/UserManagement";
import Dashboard from "./components/Home/Dashboard";
import Users from "./components/Home/Users";

function App() {
  const routes = useMemo(() => (
    <Routes>
      <Route element={<PublicRoute redirectTo="/" />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<ProtectedRoute redirectTo="/login" />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  ), []);

  return (
    <AppProvider>
      <ChakraProvider>
        <BrowserRouter>
          {routes}
        </BrowserRouter>
      </ChakraProvider>
    </AppProvider>
  );
}

export default App;
