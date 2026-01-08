/**
 * IMAGE SYSTEM DOCUMENTATION
 * =========================
 *
 * All images in this app are FULLY DYNAMIC and come from the data layer.
 *
 * FLOW: data.ts → destination-cards.tsx → rendered in browser
 *
 * THREE WAYS TO UPDATE IMAGES:
 */

// 1. EDIT IN CODE (for permanent changes)
// File: lib/data.ts
// Change the 'image' property in the destinations array
// Example:
// {
//   id: 1,
//   title: "Panajachel",
//   image: "https://your-image-url.com/lake.jpg"  // <- Change this
// }

// 2. USE ADMIN PANEL (for runtime changes, saved in browser)
// Navigate to: http://localhost:3000/admin/images
// Paste new image URLs and click "Save Changes"
// Changes persist in localStorage

// 3. USE API/DATABASE (for production)
// Replace localStorage with database calls in:
// - app/admin/images/page.tsx (save endpoint)
// - components/destination-cards.tsx (fetch from API)

/**
 * RECOMMENDED IMAGE SOURCES:
 * - Vercel Blob: https://vercel.com/storage/blob
 * - AWS S3: https://aws.amazon.com/s3/
 * - Cloudinary: https://cloudinary.com/
 * - Unsplash API: https://unsplash.com/api
 * - Direct URLs from any image hosting
 */
