// src/app/payment/page.tsx
"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// This global declaration helps TypeScript understand that the Razorpay object will be attached to the window
declare global {
  interface Window { Razorpay: any; }
}

const loadRazorpayScript = (src: string) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const imageSrc = searchParams.get('src');
  const priceInPaise = 50 * 100;
  const [isLoading, setIsLoading] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (imageSrc) {
      const img = document.createElement('img');
      img.src = imageSrc;
      img.onload = () => setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
    }
  }, [imageSrc]);

  // ========= ⬇️ CHANGE #1 IS HERE ⬇️ =========
  const handlePaymentSuccess = async (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => {
    console.log('Payment was successful!', response);
    
    if (!imageSrc || !email) return;

    try {
      const emailRes = await fetch('/api/send-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, imageSrc }),
      });

      if (!emailRes.ok) {
        throw new Error('Failed to send email.');
      }

      console.log('Email API call successful');
      router.push('/thanks');

    } catch (error) {
      console.error('Email sending failed:', error);
      alert('Your payment was successful, but we failed to send the email. Please contact support.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    
    setIsLoading(true);

    const scriptLoaded = await loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!scriptLoaded) {
        alert("Razorpay SDK failed to load. Please check your connection.");
        setIsLoading(false);
        return;
    }
    
    const orderRes = await fetch('/api/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: priceInPaise, currency: 'INR' }),
    });

    if (!orderRes.ok) {
        alert("Failed to create order. Please try again.");
        setIsLoading(false);
        return;
    }

    const order = await orderRes.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "Anubhav Pandey Photography",
      description: `License for ${imageSrc?.split('/').pop()}`,
      image: "/images/anubhav-pandey.jpg",
      order_id: order.id,
      handler: handlePaymentSuccess, 
      prefill: {
        name: "Art Lover",
        email: email,
        contact: "9999999999",
      },
      notes: { image_url: imageSrc },
      theme: { color: "#3399cc" },
      modal: { ondismiss: () => setIsLoading(false) }
    };
    
    // ========= ⬇️ CHANGE #2 IS HERE ⬇️ =========
    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };
  
  if (!imageSrc) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">No image selected.</h2>
          <Link href="/" className="text-blue-500 hover:underline">
            Go back to the portfolio
          </Link>
        </div>
      </div>
    );
  }

  const isPortrait = imageSize.height > imageSize.width && imageSize.width > 0;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8 flex flex-col items-center justify-center">
        <div className={`w-full max-w-7xl mx-auto grid grid-cols-1 ${isPortrait ? 'md:grid-cols-2 gap-8' : 'gap-4'} items-center`}>
            
            <div className={`relative w-full ${isPortrait ? 'h-[85vh]' : 'h-[70vh]'} rounded-lg overflow-hidden`} onContextMenu={(e) => e.preventDefault()}>
              {imageSize.width > 0 ? (
                <Image src={imageSrc} alt="Photograph for purchase" fill className="object-contain" sizes="100vw" priority />
              ) : (
                <div className="w-full h-full bg-gray-800 animate-pulse"></div>
              )}
            </div>

            <div className={`bg-gray-800 rounded-lg p-6 md:p-8 flex flex-col justify-center text-center ${isPortrait ? '' : 'mt-4'}`}>
              <h2 className="text-2xl font-serif text-white mb-4 truncate">{imageSrc.split('/').pop()}</h2>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-400 text-sm font-bold mb-2">Enter your email to receive the photo:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
                  required
                />
              </div>

              <div className="bg-gray-700 rounded-lg p-4 mb-6">
                <p className="text-gray-300 text-lg">Total Price</p>
                <p className="text-5xl font-bold text-white">₹50</p>
              </div>

              <button onClick={handlePayment} disabled={isLoading} className="w-full bg-blue-600 text-white font-bold py-4 px-4 rounded-lg text-xl hover:bg-blue-700 transition-transform transform hover:scale-105 disabled:bg-gray-500 disabled:scale-100 disabled:cursor-not-allowed">
                {isLoading ? 'Processing...' : 'Pay Securely with Razorpay'}
              </button>
              <Link href="/" className="block mt-6 text-gray-400 hover:text-white transition-colors">&larr; Back to Gallery</Link>
            </div>
        </div>
    </div>
  );
}
