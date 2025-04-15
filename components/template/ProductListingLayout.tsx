import { ProductGrid } from "../organisms/ProductGrid";
import { Typography } from "../atoms/Typography";
import { Separator } from "../atoms/Separator";

interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  imageSrc: string;
  discount?: string;
  isNew?: boolean;
}

interface ProductListingTemplateProps {
  title: string;
  description?: string;
  products: Product[];
}

export function ProductListingTemplate({
  title,
  description,
  products,
}: ProductListingTemplateProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <Typography as="h1" variant="h1" className="mb-4">
          {title}
        </Typography>

        {description && (
          <Typography variant="lead" className="max-w-2xl mx-auto">
            {description}
          </Typography>
        )}
      </div>

      <Separator className="mb-12" />

      <ProductGrid title="Our Collection" products={products} />
    </div>
  );
}
