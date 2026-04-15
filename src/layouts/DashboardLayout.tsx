import { Outlet, Link, useNavigate, useLocation } from "react-router";
import { Home, Package, LogOut, LayoutDashboard, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

export default function Layout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
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

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b h-16">
          <div className="h-full px-6 flex items-center justify-end gap-4">
            {user && (
              <div className="flex items-center gap-3">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.username}
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="h-4 w-4 text-gray-600" />
                  </div>
                )}
                <div className="text-sm">
                  <p className="font-medium">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-gray-500">@{user.username}</p>
                </div>
              </div>
            )}
            <Button
              variant="outline"
              onClick={handleLogout}
              size="sm"
              className="gap-2 cursor-pointer"
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
