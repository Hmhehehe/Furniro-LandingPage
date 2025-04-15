import Image from "next/image";

interface GalleryImage {
  src: string;
  alt: string;
}

interface SocialGalleryProps {
  title: string;
  hashtag: string;
  images: GalleryImage[];
}

export function SocialGallery({ title, hashtag, images }: SocialGalleryProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-center mb-4">{title}</h2>
        <p className="text-2xl md:text-3xl font-bold text-center mb-12">
          #{hashtag}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {images.map((image, index) => (
            <div key={index} className="aspect-square relative">
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
