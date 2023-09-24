import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "upkit/dist/style.min.css";
import { listen } from "./app/listener";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import Invoice from "./pages/Invoice";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import RegisterSuccess from "./pages/RegisterSuccess";
import UserAccount from "./pages/UserAccount";
import UserAddress from "./pages/UserAddress";
import UserAddressAdd from "./pages/UserAddressAdd";
import UserOrder from "./pages/UserOrder";

function App() {
  useEffect(() => {
    listen();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-success" element={<RegisterSuccess />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/pesanan" element={<UserOrder />} />
        <Route path="/account" element={<UserAccount />} />
        <Route path="/invoice/:order_id" element={<Invoice />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/alamat-pengiriman/tambah" element={<UserAddressAdd />} />
        <Route path="/alamat-pengiriman" element={<UserAddress />} />
        <Route path="/*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
