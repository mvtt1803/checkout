"use client"; 

import { Product } from "@/types";
import { useRouter } from "next/navigation";

interface CartProps {
  items: { product: Product; quantity: number }[];
  onRemoveFromCart: (product: Product) => void;
  onIncreaseQuantity: (product: Product) => void;
  onDecreaseQuantity: (product: Product) => void;
}

export default function Cart({
  items,
  onRemoveFromCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
}: CartProps) {
  const router = useRouter();

  const totalPrice = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (items.length === 0) {
      alert("Vui lòng thêm sản phẩm vào giỏ hàng");
      return;
    }
    router.push("/payment-methods");
  };

  return (
    <div
      className={`fixed right-2 bottom-0 w-[260px] sm:w-[290px] md:w-[320px] max-h-[calc(100vh-80px)] p-3 bg-white rounded-t-lg shadow-md text-sm z-40 overflow-hidden ${
        items.length > 0 ? "translate-y-[-50px]" : "translate-y-0"
      } transition-transform duration-300`}
    >
      <h2 className="text-xl sm:text-2xl font-bold mb-3 flex items-center gap-2">
        <img src="/images/shopping-cart.svg" alt="Cart" className="w-7 h-7 sm:w-8 sm:h-8" />
        Your Cart 
        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm">
          {items.length}
        </span>
      </h2>

      {items.length === 0 ? (
        <p className="text-center text-gray-500">Mời quý khách chọn món</p>
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto pr-1 max-h-[calc(100vh-200px)]">
            <ul className="space-y-3">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 w-[55%]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-8 h-8 object-cover rounded"
                    />
                    <span className="truncate text-xs">{product.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <p className="text-orange-500 font-bold text-xs sm:text-sm">
                      {product.price.toLocaleString("vi-VN")}đ
                    </p>
                    <button
                      onClick={() => onDecreaseQuantity(product)}
                      className="px-1 text-gray-600 border border-gray-300 rounded"
                    >
                      -
                    </button>
                    <span>{quantity}</span>
                    <button
                      onClick={() => onIncreaseQuantity(product)}
                      className="px-1 text-gray-600 border border-gray-300 rounded"
                    >
                      +
                    </button>
                    <button onClick={() => onRemoveFromCart(product)}>
                      <img
                        src="/images/remove.jpg"
                        alt="Remove"
                        className="w-4 h-4 sm:w-5 sm:h-5"
                      />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-3 text-xs sm:text-sm font-semibold">
            <div className="flex justify-between mb-2">
              <span>Tổng cộng:</span>
              <span>{totalPrice.toLocaleString("vi-VN")}đ</span>
            </div>
            <button
              className="w-full bg-orange-500 text-white py-1.5 rounded-md"
              onClick={handleCheckout}
            >
              Thanh toán
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
