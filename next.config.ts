import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
// next.config.js
module.exports = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
      "https://iuuliuoqgudrqrjfdsuo.supabase.co"],
  },
};

export default nextConfig;
