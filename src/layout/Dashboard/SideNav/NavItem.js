import {
  BarChart2,
  Users,
  UserCheck,
  User,
  CheckSquare,
  Menu,
  Box,
  Cast,
  Truck,
  Home,
  Type,
} from "react-feather";

export const NavItems = [
  {
    key: 1,
    title: "Dashboard",
    path: "/",
    icon: <BarChart2 />,
  },
  {
    key: 2,
    title: "Customers",
    path: "/customers",
    icon: <Users />,
  },
  {
    key: 3,
    title: "Employees",
    path: "/employees",
    icon: <UserCheck />,
  },
  {
    key: 4,
    title: "Employee Type",
    path: "/employee-type",
    icon: <Type />,
  },
  {
    key: 5,
    title: "Admin",
    path: "/admin",
    icon: <User />,
  },
  {
    key: 6,
    title: "Booking",
    path: "/booking",
    icon: <CheckSquare />,
  },
  {
    key: 7,
    title: "Services",
    path: "/services",
    icon: <Menu />,
  },
  {
    key: 8,
    title: "Merchandise Type",
    path: "/merchandise-type",
    icon: <Box />,
  },
  {
    key: 9,
    title: "Payment",
    path: "/payment",
    icon: <Cast />,
  },
  {
    key: 10,
    title: "Vehical",
    path: "/vehical",
    icon: <Truck />,
  },
  {
    key: 11,
    title: "Container",
    path: "/container",
    icon: <Box />,
  },
  {
    key: 12,
    title: "Warehouse",
    path: "/warehouse",
    icon: <Home />,
  },
];
