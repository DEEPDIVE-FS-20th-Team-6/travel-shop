"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, getTotalPrice, clearCart } = useCart();

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "60px 20px" }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>장바구니</h1>

      {cart.length === 0 ? (
        <div>
          비어있음 · <Link href="/products">상품 보러가기 →</Link>
        </div>
      ) : (
        <>
          {cart.map((it) => (
            <div key={it.id} style={{ display: "flex", justifyContent: "space-between", padding: 12, borderBottom: "1px solid #e2e8f0" }}>
              <div>
                <b>{it.title}</b> <span style={{ color: "#64748b" }}>x{it.qty}</span>
              </div>
              <div>
                {(it.price * it.qty).toLocaleString()}원{" "}
                <button onClick={() => removeFromCart(it.id)}>삭제</button>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 16, fontWeight: 800 }}>
            총액: {getTotalPrice().toLocaleString()}원
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button onClick={clearCart}>비우기</button>
            <Link href="/checkout">주문하기 →</Link>
          </div>
        </>
      )}
    </div>
  );
}