import Login from "./layout/Auth/Login";
import Register from "./layout/Auth/Register";
import { Route, Routes } from "react-router-dom";
import Overview from "./session/Overview/Overview";
import Layout from "./layout/Dashboard/Layout";
import Customers from "./session/Customers/Customers";
import Employees from "./session/Employees/Employees";
import Admin from "./session/Admin/Admin";
import Services from "./session/Services/Services";
import Vehicals from "./session/Vehicals/Vehicals";
import MerchandiseType from "./session/MerchandiseType/MerchandiseType";
import Containers from "./session/Containers/Containers";
import Warehouse from "./session/Warehouse/Warehouse";
import EmployeeType from "./session/EmployeeType/EmployeeType";
import Booking from "./session/Booking/Booking";
import Shipping from "./session/Shipping/Shipping";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Overview />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/employee-type" element={<EmployeeType />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/services" element={<Services />} />
          <Route path="/vehical" element={<Vehicals />} />
          <Route path="/merchandise-type" element={<MerchandiseType />} />
          <Route path="/container" element={<Containers />} />
          <Route path="/payment" element={<Admin />} />
          <Route path="/warehouse" element={<Warehouse />} />
          <Route path="/shipping" element={<Shipping />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
