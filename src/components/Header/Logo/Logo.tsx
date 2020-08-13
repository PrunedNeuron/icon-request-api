import Link from "next/link";
import React from "react";
import { LogoContainer } from "./Styles";

export default function Logo() {
	return (
		<LogoContainer>
			<Link href="/">
				<a className="nav">
					<img src="/signature.png" alt="Logo" />
				</a>
			</Link>
		</LogoContainer>
	);
}
