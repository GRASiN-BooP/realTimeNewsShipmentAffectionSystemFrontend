import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../Context/User";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const res = await logout();
    if (res) {
      navigate("/");
    } else {
      alert("Logout failed");
    }
  };
  return (
    <nav className="w-full flex justify-between items-center p-4 h-16 fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <Link to="/">
        <img src="/GoCometLogoWithTitle.png" alt="Brandname" className="w-36" />
      </Link>
      {user && (
        <div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-md text-white font-gocomet bg-linear-to-r from-blue-900 to-gocomet"
          >
            Logout
          </button>
        </div>
      )}
      {!user && (
        <div className="flex items-center gap-4">
          <Link
            to="/authenticate"
            className="px-4 py-2 rounded-md text-white font-gocomet bg-linear-to-r from-blue-900 to-gocomet"
          >
            Log In
          </Link>
          <Link
            to="/authenticate"
            className="px-4 py-2 rounded-md text-white font-gocomet bg-linear-to-r from-blue-900 to-gocomet"
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}
