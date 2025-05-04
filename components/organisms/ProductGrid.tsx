"use client";

import { Button } from "@/components/atoms/Button";
import { ProductCard } from "../molecules/ProductCard";
import { Typography } from "../atoms/Typography";
import type { BaseProps, Product } from "@/types";

export interface ProductGridProps extends BaseProps {
  title: string;
  products: Product[];
  showMoreText?: string;
  onShowMore?: () => void;
}

export function ProductGrid({
  title,
  products,
  showMoreText = "Show More",
  onShowMore,
}: ProductGridProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <Typography as="h2" variant="h2" className="text-center mb-12">
          {title}
        </Typography>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              description={product.description}
              price={product.price}
              originalPrice={product.originalPrice}
              imageSrc={product.imageSrc}
              discount={product.discount}
              isNew={product.isNew}
            />
          ))}
        </div>

        {showMoreText && (
          <div className="flex justify-center mt-12">
            <Button
              variant="outline"
              className="border-amber-700 text-amber-700 hover:bg-amber-50 px-8"
              onClick={onShowMore}
            >
              {showMoreText}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
