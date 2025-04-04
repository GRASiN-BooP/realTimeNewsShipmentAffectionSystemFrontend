import React from "react";

export default function Navbar() {
  const user = false;
  return (
    <nav className="w-full flex justify-between items-center p-4 h-16 sticky top-0 z-10 bg-white">
      <img src="/GoCometLogoWithTitle.png" alt="Brandname" className="w-36" />
      {user && (
        <div>
          <button className="px-4 py-2 rounded-md text-white font-gocomet bg-linear-to-r from-blue-900 to-gocomet">
            Logout
          </button>
        </div>
      )}
      {!user && (
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 rounded-md text-white font-gocomet bg-linear-to-r from-blue-900 to-gocomet">
            Log In
          </button>
          <button className="px-4 py-2 rounded-md text-white font-gocomet bg-linear-to-r from-blue-900 to-gocomet">
            Sign Up
          </button>
        </div>
      )}
    </nav>
  );
}
