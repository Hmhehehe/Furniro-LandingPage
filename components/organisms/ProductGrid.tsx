"use client";

import { Button } from "@/components/atoms/Button";
import { ProductCard } from "../molecules/ProductCard";
import { Typography } from "../atoms/Typography";
import { useProducts } from "@/hooks/useProducts";

interface ProductGridProps {
  title: string;
  showMoreText?: string;
  onShowMore?: () => void;
  categoryFilter?: string;
  limit?: number;
}

export function ProductGrid({
  title,
  showMoreText = "Show More",
  onShowMore,
  categoryFilter,
  limit,
}: ProductGridProps) {
  const { products, loading, error } = useProducts();

  console.log("ProductGrid render:", {
    productsCount: products.length,
    loading,
    error,
    products: products.slice(0, 2), // Log first 2 products for debugging
  });

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Typography as="h2" variant="h2" className="text-center mb-12">
            {title}
          </Typography>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-200 rounded-lg h-96 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <Typography variant="h2" className="text-red-500 mb-4">
            Error loading products
          </Typography>
          <Typography variant="muted" className="mb-4">
            {error}
          </Typography>
          <Button
            onClick={() => window.location.reload()}
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            Retry
          </Button>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <Typography variant="h2" className="mb-4">
            {title}
          </Typography>
          <Typography variant="muted">
            No products available at the moment.
          </Typography>
        </div>
      </section>
    );
  }

  let filteredProducts = products;
  if (categoryFilter) {
    filteredProducts = products.filter(
      (product) => product.category?.name === categoryFilter
    );
  }
  if (limit) {
    filteredProducts = filteredProducts.slice(0, limit);
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <Typography as="h2" variant="h2" className="text-center mb-12">
          {title}
        </Typography>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts
            .filter((product) => product && product.id) // Filter out undefined products
            .map((product) => (
              <ProductCard key={product.id} product={product} />
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
