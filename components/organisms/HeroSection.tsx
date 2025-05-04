import Image from "next/image";
import { Button } from "@/components/atoms/Button";
import { Typography } from "../atoms/Typography";

interface HeroSectionProps {
  imageSrc: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
}

export function HeroSection({
  imageSrc,
  title,
  subtitle,
  description,
  ctaText,
}: HeroSectionProps) {
  return (
    <section className="w-full bg-gray-100">
      <div className="container mx-auto grid md:grid-cols-2 items-center">
        <div className="relative h-[400px] md:h-[500px]">
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt="Modern furniture with plant"
            fill
            className="object-cover"
          />
        </div>
        <div className="bg-amber-50 p-8 md:p-16 h-full flex flex-col justify-center">
          <Typography variant="small" className="uppercase tracking-wider mb-2">
            {subtitle}
          </Typography>
          <Typography as="h1" variant="h1" className="text-amber-700 mb-4">
            {title}
          </Typography>
          <Typography variant="muted" className="mb-8 max-w-md">
            {description}
          </Typography>
          <div>
            <Button className="bg-amber-700 hover:bg-amber-800 text-white px-8">
              {ctaText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
