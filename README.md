This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## How to add new projects with permanent photos:

You have two very easy options:

Option A: The simplest way (No cloud setup needed)

Whenever you want to add a new project photo or blueprint:

Put the image inside your project's public/images/ folder on your computer (e.g. public/images/new_villa.jpg).
In the Admin panel, set the image path to /images/new_villa.jpg.
Push to GitHub (git add ., git commit -m "add new villa", git push). Vercel updates it permanently in 30 seconds!

Option B: True live upload from any device (Vercel Blob / Cloudinary)

If you want to take a photo on your phone while on a construction site, upload it from /admin, and have it saved permanently in the cloud without touching code:

We can connect Vercel Blob (built into Vercel, 100% free for up to 5GB) or Cloudinary.

Your current live site is running with all certificates, CAD layouts, 3D scenes, and responsive features active.

## Which File Controls the Map & Address Details?

You can change the map, address, and contact details anytime by editing this file:

📂 src/lib/constants.ts

Inside src/lib/constants.ts, look for lines 1–25

How to update in the future:
To change the address: Simply replace the text inside address: in src/lib/constants.ts.
To update the Google Map: Replace the address in mapEmbedUrl: after ?q= with your new location name or coordinates.
Because ContactSection.tsx, page.tsx, and Navbar.tsx read directly from BRAND, updating this one file automatically updates the map and contact details across the entire website.