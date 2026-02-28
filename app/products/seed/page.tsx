"use client";

import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";

const categories = ["유럽", "아시아", "미주", "오세아니아", "동남아", "국내"];
const cities = [
  "파리","로마","바르셀로나","런던","취리히","프라하","빈","암스테르담",
  "도쿄","오사카","후쿠오카","홍콩","타이베이","방콕","다낭","발리",
  "뉴욕","LA","샌프란시스코","밴쿠버","토론토",
  "시드니","멜버른","오클랜드",
  "제주","부산","강릉","여수"
];

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function SeedPage() {
  const seedProducts = async () => {
    for (let i = 0; i < 100; i++) {
      const city = cities[rand(0, cities.length - 1)];
      const category = categories[rand(0, categories.length - 1)];
      const nights = rand(2, 8);
      const days = nights + 1;
      const price = rand(49, 499) * 10000;

      await addDoc(collection(db, "products"), {
        title: `${city} ${nights}박 ${days}일`,
        category,
        price,
        image: `https://picsum.photos/seed/travel-${city}-${i}/600/400`,
      });
    }

    alert("🔥 100개 상품 생성 완료!");
  };

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "60px 20px", textAlign: "center" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "30px" }}>
        상품 더미 데이터 생성
      </h1>

      <button
        onClick={seedProducts}
        style={{
          padding: "16px 24px",
          fontSize: "16px",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        100개 생성
      </button>
    </div>
  );
}