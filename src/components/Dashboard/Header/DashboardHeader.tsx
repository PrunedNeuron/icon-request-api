import React from "react";
import {
	SignOutButton,
	LogoTextContainer,
	LogoText,
	HeaderContainer,
	PillsIcon
} from "./Styles";
import { LogOut } from "@zeit-ui/react-icons";
import { Page, Divider } from "@zeit-ui/react";
import LightText from "../../ui/Text/LightText";
import { Greeting } from "./Styles";
import RegularText from "../../ui/Text/RegularText";

export default function DashboardHeader() {
	const signOutHandler = () => {
		localStorage.clear();
		window.location.replace("/");
	};

	return (
		<Page.Header>
			<HeaderContainer>
				<Greeting>Welcome, Ayush.</Greeting>
				<LogoTextContainer>
					<LogoText>Lithium Dashboard</LogoText>
				</LogoTextContainer>
				<SignOutButton
					type="success"
					iconRight={<LogOut />}
					onClick={signOutHandler}
					shadow
					auto
				>
					Sign out
				</SignOutButton>
			</HeaderContainer>
			<Divider>
				<PillsIcon />
			</Divider>
		</Page.Header>
	);
}
