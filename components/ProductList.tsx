// ProductList.tsx
"use client";

import { Product } from "@/types";
import { useState } from "react";
import ProductDetailModal from "@/components/ProductDetailModal";

export default function ProductList({
  products,
  onAddToCart,
}: {
  products: Product[];
  onAddToCart: (product: Product) => void;
}) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="mt-3 bg-gray-400/20 rounded-lg p-3 overflow-y-auto max-h-[70vh]">
      <div className="grid grid-cols-3 gap-4">
        {products.map((item) => (
          <div
            key={item.id}
            className="p-4 shadow-md rounded-lg bg-white hover:shadow-lg transition flex flex-col items-center"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-[180px] h-[260px] object-cover rounded-md cursor-pointer"
              onClick={() => setSelectedProduct(item)}
            />
            <h3 className="mt-3 font-semibold text-xl text-center">{item.name}</h3>
            <div className="flex items-center justify-between gap-4 mt-3 w-full">
              <p className="text-orange-500 font-bold text-xl">
                {item.price.toLocaleString("vi-VN")}đ
              </p>
              <button onClick={() => onAddToCart(item)}>
                <img
                  src="/images/shopping-cart.svg"
                  alt="Giỏ hàng"
                  className="w-8 h-8"
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={onAddToCart}
        />
      )}
    </div>
  );
}
