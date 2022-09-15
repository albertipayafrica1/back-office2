import SettingsIcon from "@mui/icons-material/Settings";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LinkIcon from "@mui/icons-material/Link";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TransitEnterexitIcon from "@mui/icons-material/TransitEnterexit";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import BarChartIcon from "@mui/icons-material/BarChart";
import AddCardIcon from "@mui/icons-material/AddCard";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

export const menuItems = [
  {
    id: 1,
    url: "/dashboard/home",
    name: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    id: 2,
    url: "/dashboard/transactions/payins?page=0",
    name: "Transactions",
    icon: <TransitEnterexitIcon />,
  },
  {
    id: 3,
    url: "/dashboard/settlements?page=0",
    name: "Settlements",
    icon: <AddCardIcon />,
  },

  {
    id: 4,
    url: "/dashboard/paymentLinks?page=0",
    name: "Payment Links",
    icon: <LinkIcon />,
  },

  {
    id: 6,
    url: "/dashboard/subAccounts?page=0",
    name: "SubAccounts",
    icon: <SupervisorAccountIcon />,
  },

  {
    id: 5,
    url: "/dashboard/reports",
    name: "Reports",
    icon: <BarChartIcon />,
  },

  {
    id: 7,
    url: "/dashboard/iPayLite",
    name: "iPay Lite",
    icon: <ShoppingCartIcon />,
  },
];

export const settingsMenuListItems = {
  name: "Settings",
  icon: <SettingsIcon />,
  dropDown: [
    {
      id: 1,
      name: "Users",
      url: "/dashboard/settings/users",
      icon: <ManageAccountsIcon />,
    },
    {
      id: 2,
      icon: <AutoAwesomeIcon />,
      name: "Appearance",
      url: "/dashboard/settings/appearance",
    },
  ],
};
