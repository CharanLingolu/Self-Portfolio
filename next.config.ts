/** @type {import('next').NextConfig} */
const nextConfig = {
  // This hides the "N" build indicator
  devIndicators: {
    buildActivity: false,
    appIsrStatus: false,
  },
};

export default nextConfig;
