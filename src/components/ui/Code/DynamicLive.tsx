import React from "react";
import { LivePreview, LiveProvider, LiveError } from "react-live";
import { useTheme } from "@zeit-ui/react";
import makeCodeTheme from "./CodeTheme";
import Editor from "./CodeEditor";

export interface Props {
	heading: string;
	code: string;
	scope: {
		[key: string]: any;
	};
}

const DynamicLive: React.FC<Props> = ({ heading, code, scope }) => {
	const theme = useTheme();
	const codeTheme = makeCodeTheme(theme);
	return (
		<LiveProvider code={code} scope={scope} theme={codeTheme} disabled>
			{/* <div className="wrapper">
				<LivePreview />
				<LiveError />
			</div> */}
			<Editor heading={heading} code={code} />
			<style jsx>{`
				.wrapper {
					width: 100%;
					padding: ${theme.layout.pageMargin};
					display: flex;
					flex-direction: column;
					box-sizing: border-box;
				}

				.wrapper > :global(div) {
					width: 100%;
				}
			`}</style>
		</LiveProvider>
	);
};

export default DynamicLive;
