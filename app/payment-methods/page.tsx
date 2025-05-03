"use client";

import { useRouter } from "next/navigation";

export default function PaymentMethodsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0f172a]">
      {/* Header */}
      <header className="bg-[#1d1b35] p-4 fixed w-full top-0 z-10">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="hover:opacity-80 transition-opacity"
          >
            <img
              src="/images/back.svg"
              alt="Quay lại"
              className="w-6 h-6"
            />
          </button>
          <h1 className="text-xl font-bold text-white flex-1 text-center">
            Payment
          </h1>
        </div>
      </header>

      {/* Nội dung chính */}
      <main className="pt-20 pb-24 px-4 max-w-2xl mx-auto">
        <div className="space-y-4">
          {/* Thẻ tín dụng */}
          <button className="w-full p-4 bg-[#2a2746] rounded-lg text-white hover:bg-[#37335e] transition-colors flex justify-between items-center">
            <span>Thanh toán bằng thẻ tín dụng</span>
            <img
              src="/images/mastercard.png"
              alt="Thẻ tín dụng"
              className="w-12 h-8 object-contain"
            />
          </button>

          {/* VNPAY */}
          <button className="w-full p-4 bg-[#2a2746] rounded-lg text-white hover:bg-[#37335e] transition-colors flex justify-between items-center">
            <span>Thanh toán bằng VNPAY</span>
            <img
              src="/images/vnpay.png"
              alt="VNPAY"
              className="w-12 h-8 object-contain"
            />
          </button>

          {/* MoMo */}
          <button className="w-full p-4 bg-[#2a2746] rounded-lg text-white hover:bg-[#37335e] transition-colors flex justify-between items-center">
            <span>Thanh toán bằng MoMo</span>
            <img
              src="/images/momo.png"
              alt="MoMo"
              className="w-12 h-8 object-contain"
            />
          </button>
        </div>

        {/* Nhóm nút hành động */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <button
            onClick={() => router.back()}
            className="py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={() => alert("Xác nhận thanh toán thành công!")}
            className="py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Xác nhận
          </button>
        </div>
      </main>
    </div>
  );
}