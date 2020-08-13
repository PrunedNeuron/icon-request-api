import React, { useContext } from "react";
import {
	Button,
	Link as ZeitLink,
	useTheme,
	Text,
	Tooltip,
	Image
} from "@zeit-ui/react";
import {
	Links,
	ThemeToggleButton,
	HeadingContainer,
	HeaderContainer
} from "./Styles";
import Link from "next/link";
// import Moon from "@zeit-ui/react-icons/moon";
import { Sunny } from "@styled-icons/ionicons-solid/Sunny";
import { Moon } from "@styled-icons/boxicons-solid/Moon";
import ThemeContext from "../theme/ThemeContext";

export default function Header({ toggleTheme }) {
	const theme = useContext(ThemeContext);
	return (
		<>
			<HeaderContainer>
				<ThemeToggleButton>
					<Button
						size="small"
						type="abort"
						icon={
							theme.activeTheme == "dark" ? <Sunny /> : <Moon />
						}
						onClick={theme.toggleTheme}
						auto
					></Button>
				</ThemeToggleButton>
				<HeadingContainer>
					<Text size="1.5rem">
						<Link href="/">
							<a className="plainLink">
								<Text style={{ fontWeight: 300 }}>ayush</Text>
							</a>
						</Link>
					</Text>
				</HeadingContainer>
				<Links>
					<Link href="/">
						<ZeitLink block>Home</ZeitLink>
					</Link>
					<Link href="/blog">
						<ZeitLink block>Blog</ZeitLink>
					</Link>
					<Link href="/contact">
						<ZeitLink block>Contact</ZeitLink>
					</Link>
				</Links>
			</HeaderContainer>
		</>
	);
}
