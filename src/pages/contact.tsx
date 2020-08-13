import React from "react";
import PageLayout from "../components/Layouts/PageLayout";
import Body from "../components/Body/Body";
import ContactBody from "../components/Body/Contact/ContactBody";

export default function Contact({ toggleTheme }) {
	return (
		<PageLayout toggleTheme={toggleTheme}>
			<ContactBody />
		</PageLayout>
	);
}
