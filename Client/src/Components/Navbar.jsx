"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const AuthToken = localStorage.getItem("token");
    if (AuthToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("projects");
    localStorage.removeItem("Total");
    localStorage.removeItem("total");
    localStorage.removeItem("Status");
    localStorage.removeItem("UserEmail");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="flex items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <a href="/" className="text-xl font-bold text-indigo-600 hover:text-orange-500">
          WebFlow Manager
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <a key={item.name} href={item.href} className="text-gray-700 hover:text-indigo-600 font-medium">
              {item.name}
            </a>
          ))}
          {/* Login/Logout Button */}
          {isAuthenticated ? (
            <button onClick={handleLogout} className="text-red-500 hover:text-red-700 font-medium">
              Logout
            </button>
          ) : (
            <a href="/login" className="text-gray-700 hover:text-indigo-600 font-medium">
              Login
            </a>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button type="button" onClick={() => setMobileMenuOpen(true)} className="lg:hidden text-gray-700">
          <Bars3Icon className="h-6 w-6" />
        </button>
      </nav>

      {/* Mobile Navigation */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <DialogPanel className="fixed inset-y-0 right-0 w-64 bg-white shadow-lg px-6 py-4">
          <div className="flex justify-between">
            <span className="text-xl font-bold text-indigo-600">ProjectManager</span>
            <button onClick={() => setMobileMenuOpen(false)} className="text-gray-700">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="block text-gray-700 font-medium py-2 hover:text-indigo-600">
                {item.name}
              </a>
            ))}
            {/* Login/Logout Button for Mobile */}
            {isAuthenticated ? (
              <button onClick={handleLogout} className="block w-full text-left text-red-500 hover:text-red-700 font-medium py-2">
                Logout
              </button>
            ) : (
              <a href="/login" className="block text-gray-700 font-medium py-2 hover:text-indigo-600">
                Login
              </a>
            )}
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
