"use client";

import { Input } from "@heroui/react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchInput({ className = "" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setQuery(q);
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/arama?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={`w-full ${className}`}>
      <Input
        type="search"
        placeholder="Ürün ara..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        startContent={<Search className="w-4 h-4 text-default-400" />}
        classNames={{
          base: "max-w-full",
          input: "text-foreground",
          inputWrapper: "bg-default-100 dark:bg-default-50/10 border-none",
        }}
        isClearable
        onClear={() => setQuery("")}
        size="sm"
      />
    </form>
  );
}
