"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CheckoutSuccessPage() {
  const [orderId, setOrderId] = useState<string | null>(null);
  const [order, setOrder] = useState<any>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // ✅ 브라우저에서만 쿼리 읽기
    const params = new URLSearchParams(window.location.search);
    const id = params.get("orderId");
    setOrderId(id);

    // ✅ 브라우저에서만 localStorage 읽기
    try {
      if (!id) {
        setOrder(null);
        setLoaded(true);
        return;
      }
      const raw = localStorage.getItem("orders") || "[]";
      const orders = JSON.parse(raw);
      const found = orders.find((o: any) => o.id === id) ?? null;
      setOrder(found);
    } catch {
      setOrder(null);
    } finally {
      setLoaded(true);
    }
  }, []);

  // 로딩 중 UI (선택)
  if (!loaded) {
    return (
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "60px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: 28, marginBottom: 10 }}>결제 완료</h1>
        <p style={{ color: "#64748b" }}>주문 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (!orderId) {
    return (
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "60px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: 28, marginBottom: 10 }}>결제 완료</h1>
        <p style={{ color: "#64748b" }}>주문 정보를 찾을 수 없어요.</p>
        <Link href="/products" style={{ color: "#2563eb" }}>상품 보러가기 →</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "60px 20px" }}>
      <h1 style={{ fontSize: 28, marginBottom: 10, textAlign: "center" }}>결제 완료 🎉</h1>
      <p style={{ color: "#64748b", textAlign: "center", marginBottom: 24 }}>
        주문번호: <b>{orderId}</b>
      </p>

      {order && (
        <div style={{ background: "white", borderRadius: 14, padding: 18, boxShadow: "0 8px 20px rgba(0,0,0,0.05)" }}>
          <h2 style={{ fontSize: 18, marginBottom: 12 }}>주문 요약</h2>
          <div style={{ display: "grid", gap: 10 }}>
            {order.items?.map((it: any) => (
              <div key={it.id} style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{it.title} × {it.qty}</span>
                <b>{(it.price * it.qty).toLocaleString()}원</b>
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid #e2e8f0", marginTop: 14, paddingTop: 14, display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#64748b" }}>총 결제금액</span>
            <b style={{ fontSize: 18 }}>{order.summary?.totalPrice?.toLocaleString?.() ?? "0"}원</b>
          </div>
        </div>
      )}

      {!order && (
        <div style={{ textAlign: "center", color: "#64748b" }}>
          저장된 주문 데이터를 찾지 못했어요. (새로고침/다른 기기 접속이면 그럴 수 있어요)
        </div>
      )}

      <div style={{ marginTop: 18, textAlign: "center", display: "flex", gap: 10, justifyContent: "center" }}>
        <Link href="/orders" style={{ padding: "10px 14px", borderRadius: 10, background: "#0f172a", color: "white" }}>
          주문내역 보기
        </Link>
        <Link href="/products" style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #e2e8f0" }}>
          계속 쇼핑하기
        </Link>
      </div>
    </div>
  );
}