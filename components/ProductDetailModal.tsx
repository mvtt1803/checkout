"use client";

import { useState } from "react";
import { Product } from "@/types";

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
}: {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}) {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
        >
          ×
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Hình ảnh sản phẩm */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full md:w-[200px] h-[200px] object-cover rounded-lg"
          />

          {/* Thông tin chi tiết sản phẩm */}
          <div className="flex flex-col justify-between flex-1">
            <div>
              <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
              <p className="text-orange-500 font-bold text-xl mb-4">
                {product.price.toLocaleString("vi-VN")}đ
              </p>

              <div className="text-sm text-gray-600 mb-4">
                <p><span className="font-medium">Giá trị dinh dưỡng:</span> 250 kcal, 8g đường, 3g chất béo</p>
              </div>
            </div>

            {/* Tăng/giảm số lượng và nút thêm giỏ hàng */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full border flex items-center justify-center text-lg font-bold hover:bg-gray-100"
                >
                  -
                </button>
                <span className="font-semibold text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full border flex items-center justify-center text-lg font-bold hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition text-lg"
              >
                <img
                  src="/images/cart.svg"
                  alt="Giỏ hàng"
                  className="w-7 h-7"
                />
                {product.price.toLocaleString("vi-VN")}đ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
