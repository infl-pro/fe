import { AppType } from "next/app";
import Document, { DocumentContext, DocumentInitialProps,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
    static async getInitialProps(
        ctx: DocumentContext
    ): Promise<DocumentInitialProps> {
        const sheet = new ServerStyleSheet()
        const originalRenderPage = ctx.renderPage

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: App => {
                        const EnhancedApp: AppType<
                            Record<string, never>
                        > = props => (
                            <>{sheet.collectStyles(<App {...props} />)}</>
                        );
                        return EnhancedApp;
                    },
                });
            const initialProps = await Document.getInitialProps(ctx)

            return {
                ...initialProps,
                styles: [
                    <>
                    {initialProps.styles}
                    {sheet.getStyleElement()}
                    </>
                ]
            }
        } finally {
            sheet.seal()
        }
    }

    // render() {
    //     return (
    //         <Html lang="ko">
    //         <Head>
    //             {this.props.styles}
    //             <meta charSet="utf-8" />
    //             {/* Option */}
    //             <meta name="theme-color" content="#000000" />
    //             <meta
    //                 httpEquiv="Cache-Control"
    //                 content="no-cache, no-store, must-revalidate"
    //             />
    //             <meta httpEquiv="Pragma" content="no-cache" />
    //             <meta httpEquiv="Expires" content="0" />
    //             <base href="/" />
    //         </Head>
    //         <body>
    //             <Main />
    //             <NextScript />
    //         </body>
    //     </Html>
    //     )
    // }
}