import { HomeTemplate } from "@/components/template/HomeTemplate";

export default function Home() {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const hero = {
    imageSrc: "/img1.jpg",
    title: "Discover Our New Collection",
    subtitle: "New Arrival",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.",
    ctaText: "BUY NOW",
  };

  const roomInspiration = {
    title: "50+ Beautiful rooms inspiration",
    description:
      "Our designer already made a lot of beautiful prototype of rooms that inspire you",
    ctaText: "Explore More",
    image: {
      src: "/img5.jpg",
      alt: "Room inspiration",
    },
  };

  const socialGallery = {
    title: "Share your setup with",
    hashtag: "FuniroFurniture",
    images: [
      { src: "/room/Img1.jpg", alt: "User furniture" },
      { src: "/room/Img2.jpg", alt: "User furniture" },
      { src: "/room/Img3.jpg", alt: "User furniture" },
      { src: "/room/Img4.jpg", alt: "User furniture" },
      { src: "/room/Img5.jpg", alt: "User furniture" },
      { src: "/room/Img6.jpg", alt: "User furniture" },
      { src: "/room/Img7.jpg", alt: "User furniture" },
      { src: "/room/Img8.jpg", alt: "User furniture" },
    ],
  };

  const footerSections = [
    {
      title: "Links",
      links: [
        { label: "Home", href: "/" },
        { label: "Shop", href: "/shop" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Help",
      links: [
        { label: "Payment Options", href: "/payment" },
        { label: "Returns", href: "/returns" },
        { label: "Privacy Policies", href: "/privacy" },
      ],
    },
  ];

  return (
    <HomeTemplate
      navItems={navItems}
      hero={hero}
      roomInspiration={roomInspiration}
      socialGallery={socialGallery}
      footerSections={footerSections}
      companyInfo={{
        name: "Furniro",
        address: [
          "400 University Drive Suite 200 Coral",
          "Gables,",
          "FL 33134 USA",
        ],
        copyrightText: "2024 furniro. All rights reserved", // Fixed: static text instead of dynamic date
      }}
    />
  );
}
