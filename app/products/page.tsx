"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
};

const products: Product[] = [
  { id: 1, title: "파리 5박 7일", price: 2590000, image: "https://picsum.photos/seed/paris/600/400", category: "유럽" },
  { id: 2, title: "로마 4박 6일", price: 2190000, image: "https://picsum.photos/seed/rome/600/400", category: "유럽" },
  { id: 3, title: "런던 5박 7일", price: 2890000, image: "https://picsum.photos/seed/london/600/400", category: "유럽" },
  { id: 4, title: "바르셀로나 4박 6일", price: 2390000, image: "https://picsum.photos/seed/barcelona/600/400", category: "유럽" },
  { id: 5, title: "도쿄 3박 4일", price: 1190000, image: "https://picsum.photos/seed/tokyo/600/400", category: "아시아" },
  { id: 6, title: "오사카 3박 4일", price: 1090000, image: "https://picsum.photos/seed/osaka/600/400", category: "아시아" },
  { id: 7, title: "타이베이 3박 4일", price: 890000, image: "https://picsum.photos/seed/taipei/600/400", category: "아시아" },
  { id: 8, title: "홍콩 2박 3일", price: 990000, image: "https://picsum.photos/seed/hongkong/600/400", category: "아시아" },
  { id: 9, title: "방콕 4박 6일", price: 990000, image: "https://picsum.photos/seed/bangkok/600/400", category: "동남아" },
  { id: 10, title: "다낭 4박 5일", price: 890000, image: "https://picsum.photos/seed/danang/600/400", category: "동남아" },
  { id: 11, title: "발리 5박 7일", price: 1490000, image: "https://picsum.photos/seed/bali/600/400", category: "동남아" },
  { id: 12, title: "푸껫 4박 6일", price: 1290000, image: "https://picsum.photos/seed/phuket/600/400", category: "동남아" },
  { id: 13, title: "뉴욕 5박 7일", price: 3290000, image: "https://picsum.photos/seed/newyork/600/400", category: "미주" },
  { id: 14, title: "LA 5박 7일", price: 3090000, image: "https://picsum.photos/seed/la/600/400", category: "미주" },
  { id: 15, title: "샌프란시스코 4박 6일", price: 3190000, image: "https://picsum.photos/seed/sf/600/400", category: "미주" },
  { id: 16, title: "밴쿠버 4박 6일", price: 2790000, image: "https://picsum.photos/seed/vancouver/600/400", category: "미주" },
  { id: 17, title: "시드니 5박 7일", price: 2990000, image: "https://picsum.photos/seed/sydney/600/400", category: "오세아니아" },
  { id: 18, title: "멜버른 5박 7일", price: 2890000, image: "https://picsum.photos/seed/melbourne/600/400", category: "오세아니아" },
  { id: 19, title: "제주 2박 3일", price: 399000, image: "https://picsum.photos/seed/jeju/600/400", category: "국내" },
  { id: 20, title: "부산 2박 3일", price: 349000, image: "https://picsum.photos/seed/busan/600/400", category: "국내" },
];

function toNumberOrUndefined(v: string) {
  const n = Number(v.replaceAll(",", "").trim());
  return Number.isFinite(n) && v.trim() !== "" ? n : undefined;
}

export default function ProductsPage() {
  // ✅ filters
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("전체");
  const [minPrice, setMinPrice] = useState(""); // input string
  const [maxPrice, setMaxPrice] = useState(""); // input string

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["전체", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    const kw = keyword.trim().toLowerCase();
    const min = toNumberOrUndefined(minPrice);
    const max = toNumberOrUndefined(maxPrice);

    return products.filter((p) => {
      // 1) 검색(제목 기준)
      const matchKeyword = kw === "" || p.title.toLowerCase().includes(kw);

      // 2) 카테고리
      const matchCategory = category === "전체" || p.category === category;

      // 3) 가격대
      const matchMin = min === undefined || p.price >= min;
      const matchMax = max === undefined || p.price <= max;

      return matchKeyword && matchCategory && matchMin && matchMax;
    });
  }, [keyword, category, minPrice, maxPrice]);

  const reset = () => {
    setKeyword("");
    setCategory("전체");
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 20px" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "18px", textAlign: "center" }}>
        여행 상품 목록
      </h1>

      {/* ✅ Filter Bar */}
      <div
        style={{
          background: "white",
          borderRadius: 14,
          padding: 16,
          boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
          marginBottom: 28,
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr 0.6fr 0.6fr auto",
          gap: 12,
          alignItems: "center",
        }}
      >
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="검색: 도시/상품명 (예: 파리, 도쿄)"
          style={{
            width: "100%",
            padding: "12px 12px",
            borderRadius: 10,
            border: "1px solid #e2e8f0",
            outline: "none",
          }}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 12px",
            borderRadius: 10,
            border: "1px solid #e2e8f0",
            background: "white",
            outline: "none",
          }}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <input
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          inputMode="numeric"
          placeholder="최소금액"
          style={{
            width: "100%",
            padding: "12px 12px",
            borderRadius: 10,
            border: "1px solid #e2e8f0",
            outline: "none",
          }}
        />

        <input
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          inputMode="numeric"
          placeholder="최대금액"
          style={{
            width: "100%",
            padding: "12px 12px",
            borderRadius: 10,
            border: "1px solid #e2e8f0",
            outline: "none",
          }}
        />

        <button
          onClick={reset}
          style={{
            padding: "12px 14px",
            borderRadius: 10,
            border: "1px solid #e2e8f0",
            background: "white",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          초기화
        </button>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14, color: "#64748b" }}>
        <span>총 {filtered.length}개</span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "28px",
        }}
      >
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p style={{ textAlign: "center", marginTop: 28, color: "#64748b" }}>
          조건에 맞는 상품이 없습니다.
        </p>
      )}
    </div>
  );
}