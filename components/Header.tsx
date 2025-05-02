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
      localStorage.removeItem("cart"); // Xóa giỏ hàng tạm thời
    }
    localStorage.removeItem("currentUser"); // Xóa tên tài khoản hiện tại
    localStorage.removeItem("user"); // Xóa thông tin người dùng
    alert("Đã đăng xuất thành công!");
    router.push("/login");
  };
  

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200);
  };

  return (
    <header className="flex items-center justify-between p-3 bg-white shadow-md sticky top-0 z-50">
      {/* Biểu tượng và tiêu đề */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => router.push("/home")}
      >
        <Image
          src="/images/home-button-1.svg"
          alt="Home icon"
          width={40}
          height={40}
          className="rounded-md"
        />
        <span className="text-blue-600 font-semibold text-xl">Trang chủ</span>
      </div>

      {/* Thông tin người dùng */}
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
              width={32}
              height={32}
              className="rounded-full border border-gray-300"
            />
            <span className="text-gray-700 font-medium">{user.username}</span>
          </div>

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute top-[calc(100%+10px)] right-0 w-[180px] bg-gray-100 border border-gray-300 rounded-md shadow-lg overflow-hidden">
              <ul>
                <li
                  className="px-4 py-2 hover:bg-blue-100 hover:text-blue-600 cursor-pointer"
                  onClick={() => router.push("/profile")}
                >
                  Tài khoản
                </li>
                <li
                  className="px-4 py-2 hover:bg-blue-100 hover:text-blue-600 cursor-pointer"
                  onClick={() => router.push("/rewards")}
                >
                  Điểm thưởng
                </li>
                <li
                  className="px-4 py-2 hover:bg-blue-100 hover:text-blue-600 cursor-pointer"
                  onClick={() => router.push("/notifications")}
                >
                  Thông báo
                </li>
                <li
                  className="px-4 py-2 hover:bg-red-100 hover:text-red-600 cursor-pointer"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </li>
                <li
                  className="px-4 py-2 hover:bg-blue-100 hover:text-blue-600 cursor-pointer"
                  onClick={() => router.push("/support")}
                >
                  Liên hệ CSKH
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
