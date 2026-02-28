"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }: any) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);

    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 1200);
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
      }}
    >
      <img
        src={product.image}
        alt={product.title}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
        }}
      />

      <div style={{ padding: "18px" }}>
        <h3>{product.title}</h3>

        <p style={{ fontWeight: "bold", color: "#2563eb" }}>
          {product.price.toLocaleString()}원
        </p>

        <button
          onClick={handleAdd}
          style={{
            marginTop: "14px",
            width: "100%",
            padding: "12px",
            backgroundColor: added ? "#16a34a" : "#0f172a",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.2s ease",
            transform: added ? "scale(0.97)" : "scale(1)",
          }}
        >
          {added ? "✔ 장바구니에 담겼어요" : "예약하기"}
        </button>
      </div>
    </div>
  );
}