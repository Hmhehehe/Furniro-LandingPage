"use client";

import Image from "next/image";
import { Heart, ShoppingCart, Share2, BarChart2 } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Badge } from "../atoms/Badge";
import { cn } from "@/lib/utils";
import type { BaseProps, Product as ProductType } from "@/types";

export interface ProductCardProps extends BaseProps, Omit<ProductType, "id"> {}

export function ProductCard({
  title,
  description,
  price,
  originalPrice,
  imageSrc,
  discount,
  isNew,
  className,
}: ProductCardProps) {
  return (
    <div
      className={cn(
        "group relative bg-gray-100 rounded-lg overflow-hidden",
        className
      )}
    >
      {(discount || isNew) && (
        <div className="absolute top-3 right-3 z-10">
          {discount && <Badge variant="sale">{discount}</Badge>}
          {isNew && <Badge variant="new">New</Badge>}
        </div>
      )}
      <div className="relative h-100 overflow-hidden">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center gap-2">
          <Button
            variant="default"
            size="sm"
            className="bg-white text-gray-800 hover:bg-white/90"
          >
            <ShoppingCart className="h-4 w-4" />
            Add to cart
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-white text-gray-800 hover:bg-white/90"
            >
              <Share2 className="h-4 w-4" />
              <span className="sr-only">Share</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-white text-gray-800 hover:bg-white/90"
            >
              <BarChart2 className="h-4 w-4" />
              <span className="sr-only">Compare</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-white text-gray-800 hover:bg-white/90"
            >
              <Heart className="h-4 w-4" />
              <span className="sr-only">Like</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-semibold">{price}</span>
          {originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              {originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
