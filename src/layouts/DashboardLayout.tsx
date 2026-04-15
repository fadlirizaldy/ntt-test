import { Outlet, Link, useNavigate, useLocation } from "react-router";
// import { useAuth } from '../contexts/AuthContext';
import { Home, Package, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Layout() {
  // const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // logout();
    navigate("/login");
  };

  const isActive = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  const menuItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/product", label: "Products", icon: Package },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r min-h-screen">
        <div className="p-4 border-b h-16 flex items-center">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6" />
            <h1 className="text-xl">Admin Panel</h1>
          </div>
        </div>
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active =
              isActive(item.path) &&
              (item.path === "/" ? location.pathname === "/" : true);
            return (
              <Link key={item.path} to={item.path} className="block">
                <Button
                  variant={active ? "default" : "ghost"}
                  className="w-full justify-start gap-2 py-5 cursor-pointer"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white border-b h-16">
          <div className="h-full px-6 flex items-center justify-end gap-4">
            {/* <span className="text-sm">{user?.name}</span> */}
            <span className="text-sm">fadli</span>
            <Button
              variant="outline"
              onClick={handleLogout}
              size="sm"
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
