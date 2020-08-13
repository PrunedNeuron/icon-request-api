import React from "react";
import { Snippet, Spacer } from "@zeit-ui/react";
import { SnippetContainer } from "./Styles";

export default function KoaTypeScript() {
	return (
		<>
			<SnippetContainer>
				<Snippet width="20rem" text="yarn add -D typescript" />
			</SnippetContainer>
			<Spacer y={1} />
			<SnippetContainer>
				<Snippet width="20rem" text="yarn add koa @koa/router" />
			</SnippetContainer>
		</>
	);
}

