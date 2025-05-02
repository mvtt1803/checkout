"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [user, setUser] = useState<{ username: string; avatar?: string } | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data from localStorage", error);
      }
    }
  }, []);

  const handleLogout = () => {
    const username = localStorage.getItem("currentUser");
    if (username) {
      localStorage.removeItem(`cart_${username}`);
    }
    localStorage.removeItem("currentUser");
    localStorage.removeItem("user");
    router.push("/login");
  };

  const handleMouseEnter = () => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsDropdownOpen(false), 200);
  };

  return (
    <header className="bg-[#1d1b35] fixed w-full top-0 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => router.push("/home")}
        >
          <Image
            src="/images/logo.svg"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-md"
          />
          <span className="text-white font-bold text-xl">FASTFOOD</span>
        </div>

        {user && (
          <div
            className="relative group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex items-center gap-3 cursor-pointer">
              <Image
                src={user.avatar || "/images/user.svg"}
                alt="User Avatar"
                width={40}
                height={40}
                className="rounded-full border-2 border-orange-500"
              />
              <span className="text-white font-medium">{user.username}</span>
            </div>

            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-[#2a2746] rounded-lg shadow-xl border border-[#37335e]">
                <ul className="py-2">
                  <li
                    className="px-4 py-2 hover:bg-[#37335e] text-white cursor-pointer"
                    onClick={() => router.push("/profile")}
                  >
                    Tài khoản
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-[#37335e] text-white cursor-pointer"
                    onClick={handleLogout}
                  >
                    <span className="text-red-400">Đăng xuất</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}