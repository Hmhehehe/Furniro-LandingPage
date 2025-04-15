# Furniro - Furniture E-commerce Website

A modern furniture e-commerce website built with Next.js, TypeScript, and Tailwind CSS, following Atomic Design principles.

## Features

- Responsive design for all device sizes
- Component-based architecture using Atomic Design
- Built with Next.js App Router
- Styled with Tailwind CSS
- Type-safe with TypeScript

## Installation

1. Clone the repository:

\`\`\`bash
git clone https://github.com/yourusername/furniro.git
cd furniro
\`\`\`

2. Install dependencies:

\`\`\`bash
npm install

# or

yarn install

# or

pnpm install
\`\`\`

3. Run the development server:

\`\`\`bash
npm run dev

# or

yarn dev

# or

pnpm dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

The project follows Atomic Design principles with the following structure:

\`\`\`
/components
/atoms # Basic building blocks
Button.tsx
Input.tsx
Typography.tsx
Badge.tsx
Separator.tsx
/molecules # Combinations of atoms
FormField.tsx
ProductCard.tsx
NewsletterForm.tsx
/organisms # Complex components
Header.tsx
Footer.tsx
ProductGrid.tsx
HeroSection.tsx
/templates # Page layouts
MainLayout.tsx
HomeTemplate.tsx
/app # Next.js App Router pages
page.tsx # Home page
layout.tsx # Root layout
/types # TypeScript type definitions
/lib # Utility functions
\`\`\`

## Atomic Design Implementation

This project strictly follows Atomic Design principles:

1. **Atoms**: Basic building blocks like Button, Input, Typography
2. **Molecules**: Combinations of atoms like ProductCard, FormField
3. **Organisms**: Complex components like Header, Footer, ProductGrid
4. **Templates**: Page layouts like HomeTemplate
5. **Pages**: Actual pages in the app directory

## Props Implementation

- Consistent prop naming conventions
- TypeScript interfaces for type safety
- Shared types in `/types` directory
- Default props using destructuring
- Proper prop drilling with organized prop objects

## Tailwind CSS Implementation

- Consistent use of utility classes
- Custom theme configuration in `tailwind.config.js`
- Responsive design for all screen sizes
- Component variants using class-variance-authority (cva)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
