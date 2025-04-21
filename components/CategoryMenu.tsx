"use client";
import { useRef } from "react";

const categories = [
  { id: 1, name: "Cupcake", image: "/images/cupcake.svg" },
  { id: 2, name: "Sea food", image: "/images/seafood.svg" },
  { id: 3, name: "Juice", image: "/images/juice.svg" },
  { id: 4, name: "Nước có ga", image: "/images/nuoc_ga.jpg" },
  { id: 5, name: "Combo tiết kiệm", image: "/images/combo.png" },
  { id: 6, name: "Gà rán", image: "/images/garan.png"},
  //{id: 7, name: "Hamburger", image: "/images/hamburger.svg"}
];

export default function CategoryMenu({
  onCategorySelect,
  selectedCategory,
}: {
  onCategorySelect: (category: string) => void;
  selectedCategory: string | null;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += offset;
    }
  };

  return (
    <div className="relative flex items-center my-3">
      {/* Nút cuộn trái */}
      <button
        onClick={() => scroll(-200)}
        className="absolute left-0 z-10 h-full px-1 bg-gray-300 rounded-r-lg flex items-center"
      >
        <img src="/images/Polygon-2.svg" alt="Trái" className="w-5 h-5" />
      </button>

      {/* Danh sách loại món */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-4 py-3 bg-gray-200/80 rounded-xl"
      >
        {categories.map((cat, index) => {
          const isSelected = cat.name === selectedCategory;
          return (
            <div
              key={index}
              onClick={() => onCategorySelect(cat.name)}
              className={`min-w-[160px] max-w-[180px] flex-shrink-0 cursor-pointer rounded-2xl text-center p-4 transition-all duration-200 ${
                isSelected
                  ? "bg-orange-100 border-2 border-orange-500 scale-105 shadow-lg"
                  : "bg-white shadow-md"
              }`}
            >
      
              <img
                src={cat.image}
                alt={cat.name}
                className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 object-cover rounded-xl mx-auto"
              />
              <p className="font-medium mt-3 text-sm">{cat.name}</p>
            </div>
          );
        })}
      </div>

      {/* Nút cuộn phải */}
      <button
        onClick={() => scroll(200)}
        className="absolute right-0 z-10 h-full px-1 bg-gray-300 rounded-l-lg flex items-center"
      >
        <img src="/images/Polygon-1.svg" alt="Phải" className="w-5 h-5" />
      </button>
    </div>
  );
}
