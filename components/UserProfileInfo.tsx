"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function CustomerInfo() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<"account" | "history" | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-white shadow-sm sticky top-0 z-50">
        {/* Biểu tượng và tiêu đề trang chủ */}
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => router.push("/home")}
        >
          <Image
            src="/images/home-button-1.svg"
            alt="Home icon"
            width={40}
            height={40}
          />
          <span className="text-blue-600 font-bold text-2xl">Back to home</span>
        </div>

        {/* Nút đóng */}
        <button
          className="text-red-600 hover:text-red-800 text-2xl font-bold transition-transform transform hover:scale-110"
          onClick={() => router.push("/home")}
        >
          ×
        </button>
      </div>

      {/* Main layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-[260px] border-r p-5 bg-white shadow-lg">
          <div className="flex flex-col items-center gap-3 mb-5">
            <div className="w-24 h-24 bg-gray-300 rounded-full" />
            <h1 className="text-lg font-bold text-gray-800">Thông tin khách hàng</h1>
          </div>

          <ul className="divide-y divide-gray-300">
            <li
              className="py-3 hover:bg-gray-100 cursor-pointer text-center text-gray-700 font-medium"
              onClick={() => setSelectedTab("account")}
            >
              Quản lý tài khoản
            </li>
            <li
              className="py-3 hover:bg-gray-100 cursor-pointer text-center text-gray-700 font-medium"
              onClick={() => setSelectedTab("history")}
            >
              Lịch sử giao dịch
            </li>
            <li
              className="py-3 hover:bg-gray-100 cursor-pointer text-center text-red-600 font-medium"
              onClick={handleLogout}
            >
              Đăng xuất
            </li>
          </ul>
        </div>

        {/* Main content */}
        {selectedTab && (
          <div className="flex-1 flex justify-center items-center">
            <div className="relative w-full max-w-4xl bg-white p-8 shadow-lg rounded-lg">
              {selectedTab === "account" && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Quản lý tài khoản</h2>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Họ"
                      className="p-2 border rounded bg-gray-100"
                    />
                    <input
                      type="text"
                      placeholder="Tên"
                      className="p-2 border rounded bg-gray-100"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 border rounded mb-4 bg-gray-100"
                  />
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full p-2 border rounded mb-4 bg-gray-100"
                  />
                  <div className="relative mb-4">
                    <input
                      type="password"
                      placeholder="Mật khẩu"
                      className="w-full p-2 border rounded bg-gray-100"
                    />
                    <span className="absolute right-3 top-2 text-gray-500 cursor-pointer">👁️</span>
                  </div>
                  <div className="flex gap-4">
                    <button className="bg-green-500 text-white px-4 py-2 rounded">Lưu</button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded">Lưu và thoát</button>
                  </div>
                </div>
              )}

              {selectedTab === "history" && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Lịch sử giao dịch</h2>
                  <p>Chức năng này đang được phát triển!</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
