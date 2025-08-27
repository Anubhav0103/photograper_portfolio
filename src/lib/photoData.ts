// src/lib/photoData.ts

// Step 1: Define the shape of a single image. This is our ImageType.
export type ImageType = {
  src: string;
  alt: string;
  orientation: 'portrait' | 'landscape';
};

// Step 2: Define the shape of a full journal entry.
export type PhotoEntry = {
  title: string;
  backgroundColor: string;
  imageGroups: ImageType[][]; // This means "an array of arrays of images"
};

// Step 3: Export your data and explicitly tell TypeScript it must follow the structure we defined.
export const photoEntries: PhotoEntry[] = [
  {
    title: 'Cerulean Solitude',
    backgroundColor: '#F0F4F8',
    imageGroups: [
      [{ src: '/images/cerulean-01.jpg', alt: 'A gentle gaze from the edge of light...', orientation: 'landscape' }],
      [
        { src: '/images/cerulean-04.jpg', alt: 'Carving a path through the sea...', orientation: 'portrait' },
        { src: '/images/cerulean-02.jpg', alt: 'The rich, sweet promise of a holiday feast...', orientation: 'landscape' },
      ],
      [{ src: '/images/cerulean-03.jpg', alt: 'The mountain meets its perfect twin...', orientation: 'landscape' }]
    ],
  },
  {
    title: 'Sienna Echoes',
    backgroundColor: '#FAF3E3',
    imageGroups: [
      [
        { src: '/images/sienna-01.jpg', alt: 'The simple, stark geometry of our invisible world.', orientation: 'landscape' },
        { src: '/images/sienna-detail-01.jpg', alt: 'Suburban poetry; a tangled web...', orientation: 'portrait' },
      ],
      [
        { src: '/images/sienna-02.jpg', alt: 'In the neon glow of another world...', orientation: 'landscape' },
        { src: '/images/sienna-texture-01.jpg', alt: 'Texture of a terracotta wall', orientation: 'landscape' },
      ]
    ],
  },
  {
    title: 'Emerald Whispers',
    backgroundColor: '#EEF3F0',
    imageGroups: [
      [{ src: '/images/emerald-01.jpg', alt: 'A dark road winding through a green forest.', orientation: 'landscape' }],
      [
        { src: '/images/emerald-texture-01.jpg', alt: 'A vertical close-up of a fern leaf', orientation: 'portrait' },
        { src: '/images/emerald-02.jpg', alt: 'The quiet hum of life in a sun-drenched field.', orientation: 'landscape' },
      ],
      [{ src: '/images/emerald-04.jpg', alt: 'Cosmic dreams spray-painted on an industrial canvas.', orientation: 'landscape' }]
    ],
  },
  {
    title: 'Monochrome City',
    backgroundColor: '#F5F5F5',
    imageGroups: [
      [
        { src: '/images/mono-01.jpg', alt: 'Pastel geometry against an endless canvas of blue.', orientation: 'landscape' },
        { src: '/images/mono-03.jpg', alt: 'A sky of fire and glass...', orientation: 'portrait' },
      ],
      [
        { src: '/images/mono-04.jpg', alt: 'Striding through the haze of a dream...', orientation: 'landscape' },
        { src: '/images/mono-02.jpg', alt: 'A tranquil sanctuary...', orientation: 'landscape' },
      ]
    ],
  },
  {
    title: 'Golden Hour Portraits',
    backgroundColor: '#FFF8E1',
    imageGroups: [
      [{ src: '/images/golden-01.jpg', alt: "A crystalline scattering of childhood's simple, sweet joys.", orientation: 'landscape' }],
      [
        { src: '/images/golden-02.jpg', alt: 'A vertical portrait with lens flare', orientation: 'portrait' },
        { src: '/images/golden-03.jpg', alt: 'A gentle portrait of a man', orientation: 'landscape' },
      ],
      [{ src: '/images/golden-04.jpg', alt: 'Charting a course on a canvas of possibility...', orientation: 'landscape' }]
    ],
  },
];