import Image from "next/image";
import { Button } from "@/components/ui/button";

export function RoomInspirationSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="max-w-lg">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              50+ Beautiful rooms inspiration
            </h2>
            <p className="text-gray-600 mb-8">
              Our designer already made a lot of beautiful prototype of rooms
              that inspire you
            </p>
            <Button className="bg-amber-700 hover:bg-amber-800 text-white px-6">
              Explore More
            </Button>
          </div>

          <div className="relative">
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src="/img5.jpg"
                alt="Room inspiration"
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
