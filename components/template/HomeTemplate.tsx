"use client";

import { Header } from "../organisms/Header";
import { Footer } from "../organisms/Footer";
import { HeroSection } from "../organisms/HeroSection";
import { ProductGrid } from "../organisms/ProductGrid";
import { RoomInspirationSection } from "../organisms/RoomInspirationSection";
import { SocialGallery } from "../organisms/SocialGallery";

// Define types for all the props needed by child components
export interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  imageSrc: string;
  discount?: string;
  isNew?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: Array<{
    label: string;
    href: string;
  }>;
}

export interface SocialImage {
  src: string;
  alt: string;
}

export interface HomeTemplateProps {
  // Navigation
  navItems: NavItem[];

  // Hero section
  hero: {
    imageSrc: string;
    title: string;
    subtitle: string;
    description: string;
    ctaText: string;
  };

  // Product sections
  featuredProducts: Product[];
  productSectionTitle?: string;
  showMoreProductsText?: string;

  // Room inspiration section
  roomInspiration?: {
    title?: string;
    description?: string;
    ctaText?: string;
    image?: {
      src: string;
      alt: string;
    };
  };

  // Social gallery
  socialGallery?: {
    title?: string;
    hashtag: string;
    images: SocialImage[];
  };

  // Footer
  footerSections: FooterSection[];
  companyInfo?: {
    name?: string;
    address?: string[];
    copyrightText?: string;
  };
}

export function HomeTemplate({
  // Navigation
  navItems,

  // Hero section
  hero,

  // Product sections
  featuredProducts,
  productSectionTitle = "Our Products",
  showMoreProductsText = "Show More",

  // Room inspiration section
  roomInspiration,

  // Social gallery
  socialGallery,

  // Footer
  footerSections,
  companyInfo = {
    name: "Furniro",
    address: [
      "400 University Drive Suite 200 Coral",
      "Gables,",
      "FL 33134 USA",
    ],
    copyrightText: `${new Date().getFullYear()} furniro. All rights reserved`,
  },
}: HomeTemplateProps) {
  const handleShowMoreProducts = () => {
    console.log("Show more products clicked");
    // In a real app, you might fetch more products or navigate to a products page
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header navItems={navItems} />

      <main>
        <HeroSection
          imageSrc={hero.imageSrc}
          title={hero.title}
          subtitle={hero.subtitle}
          description={hero.description}
          ctaText={hero.ctaText}
        />

        <ProductGrid
          title={productSectionTitle}
          products={featuredProducts}
          showMoreText={showMoreProductsText}
          onShowMore={handleShowMoreProducts}
        />

        {roomInspiration && (
          <RoomInspirationSection
            title={roomInspiration.title}
            description={roomInspiration.description}
            ctaText={roomInspiration.ctaText}
            imageSrc={roomInspiration.image?.src}
            imageAlt={roomInspiration.image?.alt}
          />
        )}

        {socialGallery && (
          <SocialGallery
            title={socialGallery.title || "Share your setup with"}
            hashtag={socialGallery.hashtag}
            images={socialGallery.images}
          />
        )}
      </main>

      <Footer
        companyName={companyInfo.name}
        address={companyInfo.address}
        sections={footerSections}
        copyrightText={companyInfo.copyrightText}
      />
    </div>
  );
}
