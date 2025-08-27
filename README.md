Anubhav Pandey - Fictional Photographer Portfolio
This is a comprehensive, feature-rich fictional portfolio for the photographer Anubhav Pandey. It's built from the ground up using a modern, professional tech stack, focusing on a high-end user experience, beautiful design, and a complete, secure e-commerce flow for selling digital photographs.
The project showcases a dynamic, asymmetrical grid layout, advanced animations, and a full payment-to-delivery pipeline using Razorpay and Mailjet, all without the need for a traditional database.
Key Features
Dynamic & Asymmetrical Grid Layout: The portfolio intelligently arranges photos of different orientations (portrait/landscape) into beautiful, non-linear patterns that adapt to the content.
Interactive Hover Animations: On hover, each image displays a semi-transparent overlay and an elegantly animated caption, powered by Framer Motion.
Secure E-commerce Flow: A complete pipeline for selling digital goods.
Dynamic Payment Page: Clicking any image leads to a beautiful, immersive payment page that dynamically adapts its layout to the photo's orientation.
Secure Payment Processing: Integrates with Razorpay using a secure, server-side API route to create payment orders, keeping secret keys safe.
Automated Email Delivery: Upon successful payment, a backend API route automatically sends the customer a thank you email with the high-resolution photograph attached, using the Mailjet API.
Responsive & Device-Friendly: The entire experience is beautifully designed and fully functional across all devices, from mobile phones to desktops.
Image Protection: Basic protection is in place to deter casual image downloading (right-click is disabled, and Next.js serves optimized WebP images).
Tech Stack
Framework: Next.js (App Router)
Language: TypeScript
Styling: Tailwind CSS
Animation: Framer Motion
Payment Gateway: Razorpay
Email Delivery: Mailjet
Getting Started
To get a local copy up and running, follow these simple steps.
Prerequisites
Node.js (v18.0 or later)
npm or yarn
Installation & Setup
Clone the repository:
code
Sh
git clone https://your-repository-url.com/
cd your-portfolio-name
Install NPM packages:
code
Sh
npm install
Set up your environment variables:
Create a new file named .env.local in the root of your project and add the following keys.
IMPORTANT: Your RAZORPAY_KEY_SECRET and Mailjet keys are secrets. They should never be committed to Git or exposed on the client-side. The NEXT_PUBLIC_ prefix is only for the key that needs to be accessible in the browser.
code
Code
# .env.local

# Razorpay Keys
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx

# Mailjet Keys
MAILJET_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
MAILJET_API_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
MAILJET_FROM_EMAIL=your-verified-sender-email@example.com
Run the development server:
code
Sh
npm run dev
Open http://localhost:3000 with your browser to see the result.
Project Structure
The project follows the standard Next.js App Router structure:
code
Code
.
├── public/
│   └── images/       # All static images are stored here
├── src/
│   ├── app/
│   │   ├── api/        # Server-side API routes
│   │   │   ├── create-order/
│   │   │   └── send-photo/
│   │   ├── payment/    # The dynamic payment page
│   │   ├── thanks/     # The "Thank You" page after purchase
│   │   ├── layout.tsx  # The root layout
│   │   └── page.tsx    # The main portfolio homepage
│   └── lib/
│       └── photoData.ts # The "database" for photo info and captions
├── .env.local          # Environment variables (not committed)
├── next.config.js      # Next.js configuration
└── tailwind.config.js  # Tailwind CSS configuration
How the E-commerce Flow Works
Image Click: A user clicks on an image on the main portfolio page (/).
Navigation: The app navigates to the /payment page, passing the image source as a URL query parameter.
Payment Page: The page displays the selected image and an email input field.
Initiate Payment: The user enters their email and clicks "Pay." The handlePayment function is called.
Create Order (Backend): The payment page makes a POST request to /api/create-order. This secure, server-side route uses the RAZORPAY_KEY_SECRET to create an order with Razorpay and returns the order_id.
Razorpay Modal: The payment page opens the Razorpay checkout modal using the order_id.
Payment Success: The user completes the payment. The handler function (handlePaymentSuccess) is called by Razorpay.
Send Email (Backend): The handlePaymentSuccess function makes a POST request to /api/send-photo, sending the user's email and the image source. This server-side route reads the image file from the disk, uses your Mailjet secret keys, and sends the email with the photo as an attachment.
Redirect: Upon a successful API response, the user is redirected to the /thanks page.
Future Improvements
Implement a CMS: The next logical step is to build the /upload-images feature, allowing the photographer to add new journal entries without touching the code. This would involve:
Secure authentication (e.g., NextAuth.js).
A proper database (e.g., Vercel Postgres, Supabase).
Cloud image storage (e.g., Cloudinary, Vercel Blob, AWS S3).