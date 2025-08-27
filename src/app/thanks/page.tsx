"use client";

import Link from 'next/link';
import { useEffect } from 'react';

// You can keep the confetti function if you like it!
const createConfetti = () => { /* ... confetti code ... */ };

export default function ThanksPage() {
  
  useEffect(() => {
    // createConfetti();
  }, []);

  return (
    <>
      {/* You can keep the confetti style tag if you use it */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-4">
        <div className="p-10 bg-white rounded-lg shadow-2xl max-w-lg">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">Purchase Complete!</h1>
          <p className="text-lg text-gray-600 mb-2">Your photo is on its way.</p>
          <p className="text-gray-600 mb-8">
            We have sent an email containing your high-resolution image. Please check your inbox (and spam folder, just in case).
          </p>
          <Link 
            href="/" 
            className="inline-block bg-gray-800 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-700 transition-colors text-lg"
          >
            Explore More Art
          </Link>
        </div>
      </div>
    </>
  );
}