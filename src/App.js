import { HashRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthProvider } from "./context/AuthContext";

import "./index.css";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./ProtectedRoute";
import React, { useState } from "react";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import PayPage from "./pages/PayPage";
import OrdersPage from "./pages/OrdersPage";
import products from "./states/productsData";

import { useSound } from "use-sound";
import buyEffect from "../src/sound/buyEffect.mp3";
import RecipePage from "./pages/RecipePage";
import CatalogPage from "./pages/CatalogPage";
import KeepAliveService from "./KeepAliveService";
import DashboardPage from "./pages/DashboardPage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4FA41B", // ✅ sin espacio
    },
    secondary: {
      main: "#8B4513", // ✅ sin espacio
    },
    terceary: {
      main: "#2B4141",
    },
    mp: {
      main: "#00A3E0",
    },
    white: {
      main: "#ffffff",
    },
    backg: {
      main: "#F4FEC1",
    },
  },
  typography: {
    fontFamily: ["Bree Serif", "Arial", "sans-serif"].join(","),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  customBreakpoints: {
    mobileShort: "@media (max-width: 430px) and (max-height: 700px)",
    mobileTall: "@media (max-width: 430px) and (min-height: 701px)",
    tabletAndUp: "@media (min-width: 431px)",
  },
});

function App() {
  const [searchbarVisible, setSearchbarVisible] = useState(false);
  const [address, setAddress] = useState("");
  const [editingAddress, setEditingAddress] = useState(false);
  const [drawerOpenCart, setDrawerOpenCart] = useState(false);
  const [checkedTACC, setCheckedTACC] = useState(false);
  const [checkedGluten, setCheckedGluten] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("none");
  const [cartItems, setCartItems] = useState([]);
  const [play] = useSound(buyEffect);

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <KeepAliveService />
        <HashRouter>
          <Navbar
            setSearchbarVisible={setSearchbarVisible}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setCartItems={setCartItems}
          />
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  products={products}
                  searchbarVisible={searchbarVisible}
                  setSearchbarVisible={setSearchbarVisible}
                  drawerOpenCart={drawerOpenCart}
                  setDrawerOpenCart={setDrawerOpenCart}
                  checkedTACC={checkedTACC}
                  setCheckedTACC={setCheckedTACC}
                  checkedGluten={checkedGluten}
                  setCheckedGluten={setCheckedGluten}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                  play={play}
                />
              }
            />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/recipe" element={<RecipePage />} />
            <Route
              path="/catalog"
              element={
                <CatalogPage
                  products={products}
                  searchbarVisible={searchbarVisible}
                  setSearchbarVisible={setSearchbarVisible}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                  play={play}
                />
              }
            />
            <Route element={<ProtectedRoute />}>
              <Route
                path="/pay"
                element={
                  <PayPage
                    editingAddress={editingAddress}
                    setEditingAddress={setEditingAddress}
                    address={address}
                    setAddress={setAddress}
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                    play={play}
                  />
                }
              />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/orders" element={<OrdersPage />} />
            </Route>
          </Routes>
        </HashRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
