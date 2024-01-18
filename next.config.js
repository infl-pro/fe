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
};

module.exports = nextConfig;
