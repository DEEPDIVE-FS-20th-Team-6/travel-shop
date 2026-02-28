"use client";

import { useEffect } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Home() {
  useEffect(() => {
    const test = async () => {
      const querySnapshot = await getDocs(collection(db, "test"));
      console.log("🔥 Firebase 연결 성공:", querySnapshot);
    };

    test();
  }, []);

  return (
    <div
      style={{
        height: "500px",
        backgroundImage: "url('https://picsum.photos/1200/600?travel')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
      }}
    >
      <div>
        <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
          당신의 다음 여행은 어디인가요?
        </h1>

        <p style={{ fontSize: "20px", marginBottom: "30px" }}>
          전 세계 프리미엄 여행 상품을 한눈에 비교하세요
        </p>

        <Link href="/products">
          <button
            style={{
              padding: "14px 28px",
              fontSize: "16px",
              backgroundColor: "#2563eb",
              border: "none",
              borderRadius: "8px",
              color: "white",
              cursor: "pointer",
            }}
          >
            여행상품 보러가기
          </button>
        </Link>
      </div>
    </div>
  );
}