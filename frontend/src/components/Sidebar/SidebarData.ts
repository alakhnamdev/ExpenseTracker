import {
  LayoutGrid,
  PlusCircle,
  SquareChartGantt,
  Lightbulb,
  BookOpenText,
} from "lucide-react";
export const sidebarItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutGrid,
  },
  {
    label: "Create Expense",
    href: "/add-expense",
    icon: PlusCircle,
  },
  {
    label: "View Expenses",
    href: "/expenses",
    icon: SquareChartGantt,
  },
  {
    label: "Create Budget",
    href: "/create-budgets",
    icon: PlusCircle,
  },
  {
    label: "View Budgets",
    href: "/budgets",
    icon: SquareChartGantt,
  },
  {
    label: "Suggestions",
    href: "/suggestions",
    icon: Lightbulb,
  },
  {
    label: "Reports",
    href: "/reports",
    icon: BookOpenText,
  },
];
