import { CartProvider } from "@/context/CartContext";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "여행상품서비스",
  description: "프리미엄 국내외 여행 예약 플랫폼",
};

export default function RootLayout({ children }: any) {
  return (
    <html lang="ko">
      <body
        style={{
          margin: 0,
          fontFamily: "Pretendard, sans-serif",
          backgroundColor: "#f8fafc",
        }}
      >
        <CartProvider>
          {/* 🔥 네비게이션 */}
          <header
            style={{
              backgroundColor: "#0f172a",
              color: "white",
              padding: "18px 60px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link
              href="/"
              style={{
                fontSize: "22px",
                fontWeight: "bold",
                textDecoration: "none",
                color: "white",
              }}
            >
              ✈ 여행상품서비스
            </Link>

            <nav style={{ display: "flex", gap: "30px", alignItems: "center" }}>
              <Link href="/products" style={{ color: "white", textDecoration: "none" }}>
                여행상품
              </Link>
              <Link href="/cart" style={{ color: "white", textDecoration: "none" }}>
                장바구니
              </Link>

              <button
                style={{
                  padding: "8px 14px",
                  backgroundColor: "#2563eb",
                  border: "none",
                  borderRadius: "6px",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                로그인
              </button>
            </nav>
          </header>

          <main style={{ maxWidth: "1200px", margin: "0 auto" }}>
            {children}
          </main>

          {/* 🔥 Footer */}
          <footer
            style={{
              marginTop: "80px",
              padding: "40px",
              backgroundColor: "#0f172a",
              color: "white",
              textAlign: "center",
            }}
          >
            © 2026 여행상품서비스. All rights reserved.
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}