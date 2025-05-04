import { HomeTemplate } from "@/components/template/HomeTemplate";

export default function Home() {
  // Data that would typically come from an API or CMS
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
    description: "Belanja murah ya di furniro saja!",
    ctaText: "BUY NOW",
  };

  const featuredProducts = [
    {
      id: "1",
      title: "Solid Wood TV Stand",
      description: "Strong & sleek",
      price: "Rp1.399.000",
      originalPrice: "Rp1.800.000",
      imageSrc: "/img8.jpg",
      discount: "-22.3%",
    },
    {
      id: "2",
      title: "Rattan Lounge Chair",
      description: "Relaxed & tropical",
      price: "Rp2.250.000",
      imageSrc: "/img7.jpg",
    },
    {
      id: "3",
      title: "Minimalist Wooden Chair",
      description: "Sleek & clean look",
      price: "Rp679.000",
      originalPrice: "Rp850.000",
      imageSrc: "/img6.jpg",
      discount: "-20.1% OF",
    },
    {
      id: "4",
      title: "Modern Bookshelf",
      description: "Stylish & modern",
      price: "Rp899.000",
      originalPrice: "Rp1.200.000",
      imageSrc: "/img9.jpg",
      isNew: true,
    },
    {
      id: "5",
      title: "Foldable Study Desk",
      description: "Compact & portable",
      price: "Rp519.000",
      imageSrc: "/img10.jpg",
    },
    {
      id: "6",
      title: "Queen Bed Frame",
      description: "Elegant & solid",
      price: "Rp4.500.000",
      imageSrc: "/Img15.jpg",
      isNew: true,
    },
    {
      id: "7",
      title: "Wooden Dining Chair",
      description: "Minimalist & elegant",
      price: "Rp599.000",
      originalPrice: "Rp750.000",
      imageSrc: "/img12.jpg",
      discount: "-20.1%",
    },
    {
      id: "8",
      title: "Minimalist Wall Clock",
      description: "Clean modern design",
      price: "Rp270.000",
      imageSrc: "/img16.jpg",
      isNew: true,
    },
  ];

  const roomInspiration = {
    title: "50+ Beautiful rooms inspiration",
    description:
      "Our designer already made a lot of beautiful prototype of rooms that inspire you",
    text: "halo",
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
      featuredProducts={featuredProducts}
      roomInspiration={roomInspiration}
      socialGallery={socialGallery}
      footerSections={footerSections}
      companyInfo={{
        name: "Furniro",
        address: [
          "Primakara University",
          "Tukad Badung, Renon,",
          "Bali, Indonesia",
        ],
        copyrightText: `${new Date().getFullYear()} furniro. All rights reserved`,
      }}
    />
  );
}
