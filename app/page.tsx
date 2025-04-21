"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import CategoryMenu from "@/components/CategoryMenu";
import ProductList from "@/components/ProductList";
import Cart from "@/components/Cart";
import allProducts from "@/data/products";
import { Product } from "@/types";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("Cupcake");
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);

  // Lấy giỏ hàng từ localStorage khi trang được tải lại
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Lưu giỏ hàng vào localStorage mỗi khi có sự thay đổi
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart"); // Nếu giỏ hàng trống, xóa khỏi localStorage
    }
  }, [cart]);

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleRemoveFromCart = (product: Product) => {
    setCart((prev) => prev.filter((item) => item.product.id !== product.id));
  };

  const handleIncreaseQuantity = (product: Product) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDecreaseQuantity = (product: Product) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === product.id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <div className="p-4">
      <Header />
      <div className="flex">
        {/* Vùng chính: CategoryMenu + ProductList */}
        <div className="flex-1 pr-[320px]">
          <CategoryMenu
            onCategorySelect={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
          {selectedCategory && (
            <ProductList
              products={allProducts[selectedCategory] || []}
              onAddToCart={handleAddToCart}
            />
          )}
        </div>

        {/* Giỏ hàng cố định */}
        <Cart
          items={cart}
          onRemoveFromCart={handleRemoveFromCart}
          onIncreaseQuantity={handleIncreaseQuantity}
          onDecreaseQuantity={handleDecreaseQuantity}
        />
      </div>
    </div>
  );
}
