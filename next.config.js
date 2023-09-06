/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: true,
	},
	images: {
		domains: ['replicate.delivery'],
	},
};

module.exports = nextConfig;
