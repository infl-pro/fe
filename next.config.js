/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,
    reactStrictMode: true,
    compiler: (() => {
        let compilerConfig = {
            // styledComponents 활성화
            styledComponents: {
                ssr: true,
                displayName: true,
                // preprocess: true,
            },
            removeConsole: !!(process.env.NODE_ENV === 'production'),
        };

        return compilerConfig;
    })(),
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '52.79.222.161',
                port: '8080',
                pathname: '**',
            },
        ],
    },
};

module.exports = nextConfig;
