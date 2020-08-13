import { NavigationItem, NavigationContainer, Anchor } from "./Styles";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { Row, Col, Spacer } from "@zeit-ui/react";

export default function Navigation() {
	const router = useRouter();
	return (
		<Row justify="center">
			<NavigationContainer>
				<NavigationItem>
					<Link href="/">
						<Anchor active={router.pathname === "/"}>Home</Anchor>
					</Link>
				</NavigationItem>
				<Spacer x={2} />
				<NavigationItem>
					<Link href="/about">
						<Anchor active={router.pathname === "/about"}>
							About
						</Anchor>
					</Link>
				</NavigationItem>
				<Spacer x={2} />
				<NavigationItem>
					<Link href="/blog">
						<Anchor active={router.pathname.includes("/blog")}>
							Blog
						</Anchor>
					</Link>
				</NavigationItem>
				<Spacer x={2} />
				<NavigationItem>
					<Link href="/contact">
						<Anchor active={router.pathname.includes("/contact")}>
							Contact
						</Anchor>
					</Link>
				</NavigationItem>
			</NavigationContainer>
		</Row>
	);
}
