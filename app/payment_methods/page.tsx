"use client";

import { useRouter } from "next/navigation";

export default function PaymentMethodsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0f172a] p-8">
      <div className="max-w-2xl mx-auto bg-[#1d1b35] rounded-2xl p-8 text-white">
        <h1 className="text-2xl font-bold mb-6 text-center">CHỌN PHƯƠNG THỨC THANH TOÁN</h1>
        
        <div className="space-y-4">
          <button className="w-full p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
            Thẻ tín dụng
          </button>
          
          <button className="w-full p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
            Ví điện tử
          </button>
          
          <button className="w-full p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
            Thanh toán khi nhận hàng
          </button>
        </div>

        <button
          onClick={() => router.back()}
          className="mt-8 w-full py-2 bg-orange-500 rounded-lg hover:bg-orange-600 transition"
        >
          Quay lại
        </button>
      </div>
    </div>
  );
}