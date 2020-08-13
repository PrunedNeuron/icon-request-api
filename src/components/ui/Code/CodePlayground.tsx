import React from "react";
import dynamic from "next/dynamic";
import { useTheme, Loading } from "@zeit-ui/react";
import Title from "./Title";
import withDefaults from "../../utils/WithDefaults";

const DynamicLive = dynamic(() => import("./DynamicLive"), {
	ssr: false,
	loading: () => (
		<div style={{ padding: "20pt 0" }}>
			<Loading />
		</div>
	)
});

interface Props {
	title?: /* React.ReactNode | */ string;
	desc?: React.ReactNode | string;
	code: string;
	scope: {
		[key: string]: any;
	};
}

const defaultProps = {
	desc: "",
	code: "",
	bindings: {}
};

export type PlaygroundProps = Props & typeof defaultProps;

const Playground: React.FC<PlaygroundProps> = React.memo(
	({ title: inputTitle, code: inputCode, desc, scope }) => {
		const theme = useTheme();
		const code = inputCode.trim();
		const title = inputTitle || "Code";

		return (
			<>
				<div className="playground">
					<DynamicLive heading={title} code={code} scope={scope} />
					<style jsx>{`
						.playground {
							width: 100%;
							border-radius: ${theme.layout.radius};
							border: 1px solid ${theme.palette.accents_2};
						}
					`}</style>
				</div>
			</>
		);
	}
);

export default withDefaults(Playground, defaultProps);
