// src/app/page.tsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { photoEntries, type ImageType } from '@/lib/photoData';
import { motion } from 'framer-motion';

// ====================================================================
// COMPONENT 1: The Image with Animated Caption
// ====================================================================
const ImageWithCaption: React.FC<{ image: ImageType }> = ({ image }) => {
  const router = useRouter();

  // ***** THIS IS THE CORRECTED PART *****
  // It now correctly adds the image source to the URL when navigating.
  const handleClick = () => {
    router.push(`/payment?src=${encodeURIComponent(image.src)}`);
  };

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden rounded-lg shadow-xl cursor-pointer group"
      onClick={handleClick}
      whileHover="hover"
      onContextMenu={(e) => e.preventDefault()}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
      />
      <motion.div className="absolute inset-0 bg-black" initial={{ opacity: 0 }} variants={{ hover: { opacity: 0.6 } }} transition={{ duration: 0.4, ease: 'easeOut' }} />
      <motion.div className="absolute bottom-0 left-0 p-4 md:p-6 text-white" initial={{ y: '100%' }} variants={{ hover: { y: '0%' } }} transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}>
        <p className="text-lg md:text-xl font-serif">{image.alt}</p>
      </motion.div>
    </motion.div>
  );
};

// ====================================================================
// COMPONENT 2: The Photo Pattern Logic
// ====================================================================
const PhotoPattern: React.FC<{ images: ImageType[] }> = ({ images }) => {
  const animationProps = { initial: { opacity: 0, y: 50 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.8 } };

  if (images.length === 1 && images[0].orientation === 'landscape') {
    return <motion.div className="w-full h-[60vh] mb-8" {...animationProps}><ImageWithCaption image={images[0]} /></motion.div>;
  }

  if (images.length === 2 && images.every(img => img.orientation === 'portrait')) {
    return <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full h-[80vh] mb-8" {...animationProps}><ImageWithCaption image={images[0]} /><ImageWithCaption image={images[1]} /></motion.div>;
  }
  
  if (images.length === 2 && images.every(img => img.orientation === 'landscape')) {
    return <motion.div className="grid grid-rows-2 gap-8 w-full h-[90vh] mb-8" {...animationProps}><ImageWithCaption image={images[0]} /><ImageWithCaption image={images[1]} /></motion.div>;
  }

  if (images.length === 2) {
    const portrait = images.find(img => img.orientation === 'portrait');
    const landscape = images.find(img => img.orientation === 'landscape');
    if (portrait && landscape) {
      return (
        <motion.div className="grid grid-cols-1 md:grid-cols-5 gap-8 w-full h-[80vh] mb-8" {...animationProps}>
          <div className="md:col-span-2"><ImageWithCaption image={portrait} /></div>
          <div className="md:col-span-3"><ImageWithCaption image={landscape} /></div>
        </motion.div>
      );
    }
  }

  return null;
};

// ====================================================================
// The Main Page Component
// ====================================================================
export default function Home() {
  return (
    <main className="w-full bg-white">
      <header className="h-screen flex flex-col items-center justify-center text-center p-8 bg-gray-50">
        <h1 className="text-6xl md:text-9xl font-serif text-gray-800 tracking-tighter">Anubhav Pandey</h1>
        <p className="mt-4 text-lg text-gray-500">The Chromatic Journal</p>
      </header>

      <section className="bg-white w-full px-4 py-24 md:px-8 md:py-32">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="w-full shadow-xl rounded-lg overflow-hidden aspect-[4/5] relative">
            <Image src="/images/anubhav-pandey.png" alt="Portrait of Anubhav Pandey" fill className="object-cover" priority />
          </div>
          <div className="text-left">
            <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-6">The Artist</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Anubhav Pandey is an Indian photographer who captures the soul of his subjects and landscapes. His work is a vibrant tapestry of stories told through color and light, focusing on the authentic, fleeting moments that define our shared human experience. From the bustling streets of Mumbai to the serene landscapes of the Himalayas, his journal is a testament to the beauty he finds everywhere.
            </p>
          </div>
        </div>
      </section>

      <div>
        {photoEntries.map((entry) => (
          <section key={entry.title} className="w-full px-4 py-24 md:px-8" style={{ backgroundColor: entry.backgroundColor }}>
            <div className="max-w-7xl mx-auto">
              <h2 className="text-5xl md:text-7xl font-serif text-gray-800 mb-20 text-center">{entry.title}</h2>
              {entry.imageGroups.map((group, index) => (
                <PhotoPattern key={index} images={group} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <footer className="bg-gray-800 text-white w-full px-4 py-8">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2025 Anubhav Pandey. All Rights Reserved.</p>
          <p className="mt-2 text-gray-400">
            <a href="#" className="hover:text-white mx-2">Instagram</a> &bull;
            <a href="#" className="hover:text-white mx-2">Twitter</a> &bull;
            <a href="#" className="hover:text-white mx-2">Contact</a>
          </p>
        </div>
      </footer>
    </main>
  );
}