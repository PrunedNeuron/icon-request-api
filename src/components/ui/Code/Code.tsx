import React from "react";
import { CodeContainer, Wrapper } from "./Styles";
import { css } from "@emotion/core";

export default function Code({ children }) {
	return (
		<div>
			<Wrapper>
				<CodeContainer>
					{children}
				</CodeContainer>
			</Wrapper>
		</div>
	);
}
