import Document, { DocumentContext } from "next/document";
import { ServerStyleSheet } from "styled-components";
import { CssBaseline } from "@zeit-ui/react";
import { extractCritical } from "emotion-server";

export default class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) =>
						sheet.collectStyles(<App {...props} />)
				});

			const initialProps = await Document.getInitialProps(ctx);
			const styles = CssBaseline.flush();

			// emotion
			const emotionStyles = extractCritical(initialProps.html);

			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{/* emotion */}
						<style
							data-emotion-css={emotionStyles.ids.join(" ")}
							dangerouslySetInnerHTML={{
								__html: emotionStyles.css
							}}
						/>
						{styles}
						{sheet.getStyleElement()}
					</>
				)
			};
		} finally {
			sheet.seal();
		}
	}
}
