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
          removeConsole: !!(
            process.env.NODE_ENV === 'production'
        ),
        }
    
        if (process.env.NODE_ENV === 'production') {
          compilerConfig = {
            ...compilerConfig,
            // 프러덕션 환경에서는 React Testing Library에서 사용하는 data-testid 속성을 삭제
            reactRemoveProperties: { properties: ['^data-testid$'] },
          }
        }
    
        return compilerConfig

    })(),
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}

module.exports = nextConfig
