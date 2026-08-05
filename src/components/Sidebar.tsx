import { NavLink } from "react-router-dom";

const menu = [
  {
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    label: "Clientes",
    path: "/clientes",
  },
  {
    label: "Mascotas",
    path: "/mascotas",
  },
  {
    label: "Turnos",
    path: "/turnos",
  },
  {
    label: "Caja",
    path: "/caja",
  },
  {
    label: "Facturas",
    path: "/facturas",
  },
  {
    label: "Gastos",
    path: "/gastos",
  },

  {
    label: "Historias Clínicas",
    path: "/historias-clinicas",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white">
      <div className="border-b border-slate-700 p-6">
        <h1 className="text-2xl font-bold">VetFlow</h1>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {menu.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2 transition-colors ${
                    isActive
                      ? "bg-slate-700 font-semibold"
                      : "hover:bg-slate-800"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
