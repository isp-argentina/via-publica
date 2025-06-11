/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
  },
  // Configuración adicional para el proyecto
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;

