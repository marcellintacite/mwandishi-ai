import { BookHeart, CassetteTape, Save } from "lucide-react";

export const dashboardCards = [
  {
    link: "/dashboard/composition",
    title: "Composition",
    icon: <CassetteTape size={20} color="#3339" />,
    className: "bg-gradient-to-r from-violet-200 to-pink-200",
  },
  {
    link: "/dashboard/ameliorer",
    title: "Améliorer",
    icon: <BookHeart size={20} color="#3339" />,
    className:
      "bg-gradient-to-r from-rose-200 to-pink-300 box-shadow-pink-200 shadow-sm shadow-pink-500/50",
  },
  {
    link: "/dashboard/save",
    title: "Enreigistrer",
    icon: <Save size={20} color="#3339" />,
    className: "bg-gradient-to-r from-violet-200 to-pink-200",
  },
];
