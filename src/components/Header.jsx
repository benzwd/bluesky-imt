import React, { useEffect } from "react";
import { Home, User, Bot, LogOut } from "lucide-react";
import { useAuth } from "react-oidc-context";
import { signOutRedirect } from "../auth";

export default function Header() {
  const auth = useAuth();

  useEffect(() => {
    if (auth.isAuthenticated && window.location.search.includes("code=")) {
      window.history.replaceState({}, document.title, "/");
    }
  }, [auth.isAuthenticated]);

  const logout = () => {
    auth.removeUser();
    signOutRedirect();
  };

  const navItems = [
    { label: "Home", icon: Home },
    { label: "Profile", icon: User },
    { label: "BOT Météo", icon: Bot },
  ];
  return (
    <nav className="flex items-center justify-between p-4 rounded-lg mb-5">
      <div className="flex-1 flex space-x-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-secondary cursor-pointer"
            >
              <Icon className="w-5 h-5" />
              <span className="hidden lg:inline text-sm font-medium">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center">
        {!auth.isAuthenticated ? (
          <button onClick={() => auth.signinRedirect()} className="btn-primary">
            Login
          </button>
        ) : (
          <button
            onClick={logout}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-secondary text-red-500 cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden lg:inline text-sm font-medium">Logout</span>
          </button>
        )}
      </div>
    </nav>
  );
}
