import Layout from "./components/Layout/Layout";
import { AppProvider } from "./context/AppContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import { ChakraProvider } from "@chakra-ui/react";
import { ProtectedRoute } from "./context/ProtectedRoute";
import PageNotFound from "./components/Common/PageNotFound";
import Dashboard from "./components/Dashboard";
import Register from "./components/Auth/Register";

function App() {
  return (
    <AppProvider>
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route
                  path="/"
                  element={<Dashboard />}
                />
              </Route>
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </AppProvider>
  )
}

export default App;
