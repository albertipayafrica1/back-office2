import SettingsIcon from "@mui/icons-material/Settings";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LinkIcon from "@mui/icons-material/Link";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TransitEnterexitIcon from "@mui/icons-material/TransitEnterexit";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import BarChartIcon from "@mui/icons-material/BarChart";
import AddCardIcon from "@mui/icons-material/AddCard";

export const MenuItems = [
  {
    id: 1,
    url: "/dashboard/home",
    name: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    id: 2,
    url: "/dashboard/transactions",
    name: "Transactions",
    icon: <TransitEnterexitIcon />,
  },
  {
    id: 3,
    url: "/dashboard/settlements",
    name: "Settlements",
    icon: <AddCardIcon />,
  },

  {
    id: 4,
    url: "/dashboard/paymentLinks",
    name: "Payment Links",
    icon: <LinkIcon />,
  },

  {
    id: 5,
    url: "/dashboard/reports",
    name: "Reports",
    icon: <BarChartIcon />,
  },

  {
    id: 6,
    url: "/dashboard/kopeshaLoans",
    name: "KopeshaLoans",
    icon: <MonetizationOnIcon />,
  },

  {
    id: 7,
    url: "/dashboard/iPayLite",
    name: "iPay Lite",
    icon: <ShoppingCartIcon />,
  },

  {
    id: 8,
    url: "/dashboard/settings",
    name: "Settings",
    icon: <SettingsIcon />,
  },
];
