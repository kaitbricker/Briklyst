"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  affiliateUrl: string;
}

interface ProductCardProps {
  product: Product;
  primaryColor: string;
  accentColor: string;
}

export function ProductCard({ product, primaryColor, accentColor }: ProductCardProps) {
  const handleClick = async () => {
    try {
      await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id }),
      });
    } catch (error) {
      console.error("Failed to track click:", error);
    }
    window.open(product.affiliateUrl, "_blank");
  };

  return (
    <Card
      className="p-4"
      style={{
        backgroundColor: accentColor,
        color: primaryColor,
      }}
    >
      {product.imageUrl && (
        <div className="relative h-48 w-full">
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <h3 className="text-lg font-medium">{product.title}</h3>
      <p className="mt-1 text-sm text-gray-600">{product.description}</p>
      <p className="mt-2 font-medium">${product.price}</p>
      <Button
        className="mt-4 w-full"
        onClick={handleClick}
        style={{
          backgroundColor: primaryColor,
          color: accentColor,
        }}
      >
        View Product
      </Button>
    </Card>
  );
} 