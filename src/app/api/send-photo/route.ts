import { NextResponse } from 'next/server';
import Mailjet from 'node-mailjet';
import path from 'path';
import fs from 'fs/promises';

// Initialize Mailjet client
const mailjet = new Mailjet({
  apiKey: process.env.MAILJET_API_KEY,
  apiSecret: process.env.MAILJET_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const { email, imageSrc } = await request.json();

    if (!email || !imageSrc) {
      return NextResponse.json({ error: 'Email and image source are required' }, { status: 400 });
    }

    // Construct the full path to the image in the 'public' directory
    const imagePath = path.join(process.cwd(), 'public', imageSrc);
    const imageName = path.basename(imagePath);
    
    // Read the image file from the server's disk
    const imageBuffer = await fs.readFile(imagePath);
    // Convert the image data to a Base64 string for embedding
    const imageBase64 = imageBuffer.toString('base64');

    // Send the email
    const mailjetRequest = mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: process.env.MAILJET_FROM_EMAIL,
            Name: 'Anubhav Pandey Photography',
          },
          To: [
            {
              Email: email,
              Name: 'Valued Collector',
            },
          ],
          Subject: 'Your Photograph from Anubhav Pandey',
          HTMLPart: `
            <h3>Thank You for Your Purchase!</h3>
            <p>We are honored to have our art be a part of your collection. Your purchased photograph is attached to this email.</p>
            <p>If you have any questions, please feel free to contact us.</p>
            <p>Warmly,<br>Anubhav Pandey</p>
          `,
          Attachments: [
            {
              ContentType: 'image/jpeg', // Assuming images are JPEGs
              Filename: imageName,
              Base64Content: imageBase64,
            },
          ],
        },
      ],
    });

    await mailjetRequest;

    return NextResponse.json({ success: true, message: 'Email sent successfully' });

  } catch (error) {
    console.error('Email sending failed:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}