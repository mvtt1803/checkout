"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import RegisterForm from "@/components/RegisterForm";

export default function LoginPage() {
  const [showRegister, setShowRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Tài khoản mặc định
  const defaultUser = {
    email: "user@example.com",
    password: "123456",
    username: "DieuDieu",
    avatar: "/images/user.svg"
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!email || !password) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
  
    if (email === defaultUser.email && password === defaultUser.password) {
      // Lưu thông tin người dùng vào localStorage
      localStorage.setItem("user", JSON.stringify({
        username: defaultUser.username,
        avatar: defaultUser.avatar
      }));
      localStorage.setItem("currentUser", defaultUser.username);
  
      // Tải lại giỏ hàng từ tài khoản
      const savedCart = localStorage.getItem(`cart_${defaultUser.username}`);
      if (savedCart) {
        localStorage.setItem("cart", savedCart); // Tạm lưu giỏ hàng hiện tại
      } else {
        localStorage.setItem("cart", "[]"); // Giỏ hàng trống
      }
  
      alert("Đăng nhập thành công!");
      router.push("/home");
    } else {
      alert("Email hoặc mật khẩu không đúng!");
    }
  };
  

  if (showRegister) return <RegisterForm />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
      <div className="flex bg-[#1d1b35] rounded-2xl shadow-2xl w-[880px] p-4 gap-x-8">
        {/* Poster bên trái */}
        <div className="w-1/2 bg-white rounded-xl overflow-hidden">
          <img
            src="/images/POSTER.svg"
            alt="Food Poster"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form bên phải */}
        <div className="w-1/2 p-6 flex flex-col justify-center text-white">
          <div className="flex flex-col items-center">
            <img
              src="/images/logo.svg"
              alt="FASTF Logo"
              className="w-20 h-20 mb-2"
            />
            <h2 className="text-xl font-bold mb-6">ĐĂNG NHẬP</h2>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full py-2 rounded-md bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-bold hover:brightness-110"
            >
              ĐĂNG NHẬP
            </button>
          </form>
          <p className="mt-4 text-center text-sm">
            Bạn chưa có tài khoản?{" "}
            <button
              onClick={() => setShowRegister(true)}
              className="text-orange-400 hover:underline"
            >
              ĐĂNG KÝ
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
