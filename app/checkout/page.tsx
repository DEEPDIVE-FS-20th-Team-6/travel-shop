"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

type OrderForm = {
  name: string;
  phone: string;
  email: string;
  request: string;
};

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}
function isValidPhone(v: string) {
  return /^[0-9\- ]{9,13}$/.test(v.trim());
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart, getTotalPrice, getTotalQty } = useCart();

  const [form, setForm] = useState<OrderForm>({
    name: "",
    phone: "",
    email: "",
    request: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const summary = useMemo(() => {
    return {
      totalQty: getTotalQty(),
      totalPrice: getTotalPrice(),
    };
  }, [cart, getTotalPrice, getTotalQty]);

  const canSubmit =
    cart.length > 0 &&
    form.name.trim().length >= 2 &&
    isValidPhone(form.phone) &&
    isValidEmail(form.email);

  const onSubmit = async () => {
    setError("");
    if (!canSubmit) {
      setError("입력값을 확인해주세요. (이름/전화/이메일)");
      return;
    }

    setSubmitting(true);
    try {
      const orderId = `ORD-${Date.now()}`;

      const order = {
        id: orderId,
        createdAt: new Date().toISOString(),
        customer: { ...form },
        items: cart.map((it) => ({
          id: it.id,
          title: it.title,
          price: it.price,
          image: it.image,
          category: it.category,
          qty: it.qty,
        })),
        summary: {
          totalQty: summary.totalQty,
          totalPrice: summary.totalPrice,
        },
        status: "PAID",
      };

      const prev = JSON.parse(localStorage.getItem("orders") || "[]");
      localStorage.setItem("orders", JSON.stringify([order, ...prev]));

      clearCart();
      router.push(`/checkout/success?orderId=${encodeURIComponent(orderId)}`);
    } catch (e) {
      console.error(e);
      setError("주문 처리 중 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "60px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: 28, marginBottom: 12 }}>주문하기</h1>
        <p style={{ color: "#64748b", marginBottom: 18 }}>장바구니가 비어 있어요.</p>
        <Link href="/products" style={{ color: "#2563eb" }}>
          상품 보러가기 →
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 20px" }}>
      <h1 style={{ fontSize: 28, marginBottom: 24, textAlign: "center" }}>주문하기</h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: 24 }}>
        {/* 사용자 입력 */}
        <div
          style={{
            background: "white",
            borderRadius: 14,
            padding: 18,
            boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
          }}
        >
          <h2 style={{ fontSize: 18, marginBottom: 14 }}>주문자 정보</h2>

          <div style={{ display: "grid", gap: 12 }}>
            <label style={{ display: "grid", gap: 6 }}>
              <span style={{ fontSize: 13, color: "#475569" }}>이름</span>
              <input
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                placeholder="홍길동"
                style={{
                  padding: "12px 12px",
                  borderRadius: 10,
                  border: "1px solid #e2e8f0",
                  outline: "none",
                }}
              />
            </label>

            <label style={{ display: "grid", gap: 6 }}>
              <span style={{ fontSize: 13, color: "#475569" }}>전화번호</span>
              <input
                value={form.phone}
                onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                placeholder="010-1234-5678"
                style={{
                  padding: "12px 12px",
                  borderRadius: 10,
                  border: "1px solid #e2e8f0",
                  outline: "none",
                }}
              />
            </label>

            <label style={{ display: "grid", gap: 6 }}>
              <span style={{ fontSize: 13, color: "#475569" }}>이메일</span>
              <input
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                placeholder="email@example.com"
                style={{
                  padding: "12px 12px",
                  borderRadius: 10,
                  border: "1px solid #e2e8f0",
                  outline: "none",
                }}
              />
            </label>

            <label style={{ display: "grid", gap: 6 }}>
              <span style={{ fontSize: 13, color: "#475569" }}>요청사항(선택)</span>
              <textarea
                value={form.request}
                onChange={(e) => setForm((p) => ({ ...p, request: e.target.value }))}
                placeholder="예) 조용한 호텔 선호, 조식 포함 원해요"
                rows={4}
                style={{
                  padding: "12px 12px",
                  borderRadius: 10,
                  border: "1px solid #e2e8f0",
                  outline: "none",
                  resize: "vertical",
                }}
              />
            </label>

            {error && <div style={{ color: "#ef4444", fontSize: 13 }}>{error}</div>}
          </div>
        </div>

        {/* 주문 요약 */}
        <div
          style={{
            background: "white",
            borderRadius: 14,
            padding: 18,
            boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
            height: "fit-content",
          }}
        >
          <h2 style={{ fontSize: 18, marginBottom: 14 }}>주문 요약</h2>

          <div style={{ display: "grid", gap: 12, marginBottom: 16 }}>
            {cart.map((it) => (
              <div key={it.id} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <img
                  src={it.image || "https://picsum.photos/seed/fallback/120/90"}
                  alt={it.title}
                  style={{ width: 64, height: 48, borderRadius: 10, objectFit: "cover" }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{it.title}</div>
                  <div style={{ fontSize: 12, color: "#64748b" }}>
                    {it.category ?? "카테고리"} · 수량 {it.qty}
                  </div>
                </div>
                <div style={{ fontWeight: 800 }}>
                  {(it.price * it.qty).toLocaleString()}원
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: "#64748b" }}>총 수량</span>
              <b>{summary.totalQty}개</b>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
              <span style={{ color: "#64748b" }}>총 결제금액</span>
              <b style={{ fontSize: 18, color: "#2563eb" }}>
                {summary.totalPrice.toLocaleString()}원
              </b>
            </div>

            <button
              onClick={onSubmit}
              disabled={!canSubmit || submitting}
              style={{
                width: "100%",
                padding: "14px 14px",
                borderRadius: 12,
                border: "none",
                cursor: !canSubmit || submitting ? "not-allowed" : "pointer",
                background: !canSubmit || submitting ? "#94a3b8" : "#0f172a",
                color: "white",
                fontSize: 16,
                fontWeight: 800,
              }}
            >
              {submitting ? "처리 중..." : "주문 완료"}
            </button>

            <div style={{ marginTop: 10, textAlign: "center" }}>
              <Link href="/products" style={{ color: "#2563eb", fontSize: 13 }}>
                계속 쇼핑하기 →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}