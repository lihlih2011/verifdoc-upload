import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../components/landing/ui/logo";

// Assume these icons are imported from an icon library
import {
  BoxCubeIcon,
  ChevronDownIcon,
  GridIcon,
  ListIcon,
  PlugInIcon,
  UserCircleIcon,
} from "../icons";
import { useSidebar } from "../context/SidebarContext";
import { useAuth } from "../context/AuthContext";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Tableau de Bord",
    subItems: [{ name: "SCANNER & ANALYSE", path: "/dashboard", pro: false }],
  },
  {
    icon: <PlugInIcon />,
    name: "INTÉGRATION ODOO",
    path: "/dashboard/webhooks",
  },
  {
    icon: <UserCircleIcon />,
    name: "CRM & Dossiers",
    subItems: [
      { name: "Mes Clients", path: "/dashboard/clients", pro: false },
      { name: "Prospects", path: "/dashboard/prospects", pro: false },
      { name: "Historique", path: "/dashboard/history", pro: false },
    ],
  },
  {
    icon: <BoxCubeIcon />,
    name: "Entreprise (ERP)",
    subItems: [
      { name: "Facturation", path: "/dashboard/finance", pro: false },
      { name: "Équipe", path: "/dashboard/team", pro: false },
      { name: "Conformité", path: "/dashboard/compliance", pro: false },
    ],
  },
  {
    name: "Support",
    icon: <ListIcon />,
    subItems: [
      { name: "Tickets", path: "/dashboard/tickets", pro: false },
      { name: "Centre d'aide", path: "/dashboard/kb", pro: false },
    ],
  },
];

const othersItems: NavItem[] = [
  {
    icon: <PlugInIcon />,
    name: "Développeurs",
    subItems: [
      { name: "Clés API", path: "/dashboard/api-keys", pro: false },
      { name: "Intégrations (Odoo)", path: "/dashboard/webhooks", pro: false },
      { name: "Logs", path: "/dashboard/logs", pro: false },
    ],
  },
  {
    icon: <UserCircleIcon />, // Using UserIcon for Admin
    name: "Administration",
    path: "/dashboard/admin",
  },
  {
    icon: <UserCircleIcon />,
    name: "Paramètres",
    path: "/dashboard/settings",
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const { user } = useAuth();
  const location = useLocation();

  const filteredOthersItems = othersItems.filter(item => {
    if (item.name === "Administration") {
      return user?.role === "admin";
    }
    return true;
  });

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : filteredOthersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "others",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [location, isActive]);



  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => (
    <ul className="flex flex-col gap-2">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200
                ${openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:bg-gray-800/50 hover:text-gray-200"
                } 
                ${!isExpanded && !isHovered ? "justify-center" : ""}`}
            >
              <span className={`transition-colors ${openSubmenu?.type === menuType && openSubmenu?.index === index ? "text-primary-400" : "text-gray-500 group-hover:text-gray-300"}`}>
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="font-medium text-sm flex-1 text-left">{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`w-4 h-4 transition-transform duration-200 ${openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                    ? "rotate-180 text-primary-400"
                    : "text-gray-500"
                    }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200
                  ${isActive(nav.path)
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:bg-gray-800/50 hover:text-gray-200"
                  }`}
              >
                <span className={`transition-colors ${isActive(nav.path) ? "text-primary-400" : "text-gray-500 group-hover:text-gray-300"}`}>
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="font-medium text-sm">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (openSubmenu?.type === menuType && openSubmenu?.index === index) && (
            <div className="mt-1 ml-9 border-l border-gray-800 pl-4 animate-fadeIn">
              <ul className="space-y-1">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`block py-1.5 text-sm transition-colors ${isActive(subItem.path)
                        ? "text-primary-400 font-medium"
                        : "text-gray-500 hover:text-gray-300"
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{subItem.name}</span>
                        {subItem.pro && <span className="text-[10px] bg-primary-500/10 text-primary-400 px-1.5 py-0.5 rounded border border-primary-500/20">PRO</span>}
                        {subItem.new && <span className="text-[10px] bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded border border-blue-500/20">NEW</span>}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-gray-950 border-r border-gray-800 h-screen transition-all duration-300 ease-in-out z-50 
        ${isExpanded || isMobileOpen
          ? "w-[280px]"
          : isHovered
            ? "w-[280px]"
            : "w-[80px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start pl-2"
          }`}
      >
        <Logo />
      </div>

      <div className="flex flex-col overflow-y-auto mb-6 no-scrollbar flex-1">
        <nav className="flex flex-col gap-6">
          <div>
            <h2
              className={`mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500 ${!isExpanded && !isHovered
                ? "hidden"
                : "block px-3"
                }`}
            >
              Principal
            </h2>
            {renderMenuItems(navItems, "main")}
          </div>

          <div>
            <h2
              className={`mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500 ${!isExpanded && !isHovered
                ? "hidden"
                : "block px-3"
                }`}
            >
              Configuration
            </h2>
            {renderMenuItems(filteredOthersItems, "others")}
          </div>
        </nav>
      </div>

      {(isExpanded || isHovered || isMobileOpen) && (
        <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 mx-1">
          <h4 className="text-white font-medium text-sm mb-1">Stockage Utilisé</h4>
          <div className="w-full h-1.5 bg-gray-700 rounded-full mb-2 overflow-hidden">
            <div className="h-full bg-primary-500 w-[65%]"></div>
          </div>
          <p className="text-xs text-gray-400">14.2 GB / 20 GB</p>
        </div>
      )}

    </aside>
  );
};

export default AppSidebar;
