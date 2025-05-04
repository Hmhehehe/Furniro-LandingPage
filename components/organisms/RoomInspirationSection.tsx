import Image from "next/image";
import { Button } from "@/components/atoms/Button";
import { Typography } from "../atoms/Typography";

interface RoomInspirationSectionProps {
  title?: string;
  description?: string;
  text?: string;
  ctaText?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export function RoomInspirationSection({
  title = "50+ Beautiful rooms inspiration",
  description = "Our designer already made a lot of beautiful prototype of rooms that inspire you",
  text = "halo",
  ctaText = "Explore More",
  imageSrc = "/img5.jpg",
  imageAlt = "Room inspiration",
}: RoomInspirationSectionProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="max-w-lg">
            <Typography as="h2" variant="h2" className="mb-4">
              {title}
            </Typography>
            <Typography variant="muted" className="mb-8">
              {description}
            </Typography>
            <Button className="bg-amber-700 hover:bg-amber-800 text-white px-6">
              {ctaText}
            </Button>
          </div>

          <div className="relative">
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src={imageSrc || "/placeholder.svg"}
                alt={imageAlt}
                width={600}
                height={500}
                className="object-cover rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-white p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-gray-500">01</span>
                  <span className="text-xs">—</span>
                  <span className="text-xs">Bed Room</span>
                </div>
                <h3 className="text-xl font-medium">Inner Peace</h3>
              </div>
            </div>

            <div className="absolute bottom-4 right-4 flex gap-1">
              <button className="w-2 h-2 rounded-full bg-amber-700"></button>
              <button className="w-2 h-2 rounded-full bg-gray-300"></button>
              <button className="w-2 h-2 rounded-full bg-gray-300"></button>
              <button className="w-2 h-2 rounded-full bg-gray-300"></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
