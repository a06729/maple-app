/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
            protocol: 'https',
            hostname: 'open.api.nexon.com',
            port: '',
            pathname: '/static/maplestory/Character/**',
            },
            {
                protocol: 'https',
                hostname: 'open.api.nexon.com',
                port: '',
                pathname: '/static/maplestory/ItemIcon/**',
            },
        ],
    },
}
//https://open.api.nexon.com
module.exports = nextConfig
